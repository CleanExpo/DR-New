# AI Image Generation Framework - Implementation Plan

## Overview

Integrate a two-phase AI image generation workflow into the Disaster Recovery platform to create brand-consistent visual assets for service requests, property documentation, and marketing materials.

**Framework Components:**
- **Phase 1**: Context Analyzer - Multimodal LLM analyzes company Google Drive to extract design language
- **Phase 2**: Context-Aware Generator - Image generation model creates brand-consistent assets using extracted context

---

## Architecture Integration

### New Directory Structure

```
apps/web/
├── lib/
│   ├── ai/
│   │   ├── context-analyzer.ts       # Phase 1: Visual context extraction
│   │   ├── image-generator.ts        # Phase 2: Brand-aware generation
│   │   ├── google-drive-client.ts    # Google Drive API integration
│   │   └── prompt-templates.ts       # LLM prompt engineering
│   └── storage/
│       └── image-storage.ts          # Generated image persistence
├── app/
│   └── api/
│       └── ai/
│           ├── analyze-context/route.ts      # POST /api/ai/analyze-context
│           ├── generate-image/route.ts       # POST /api/ai/generate-image
│           └── refresh-context/route.ts      # POST /api/ai/refresh-context
└── components/
    └── ai/
        ├── ContextAnalyzer.tsx       # UI for triggering context analysis
        ├── ImageGenerator.tsx        # UI for generating images
        └── GeneratedImageGallery.tsx # Display generated assets
```

### Database Schema Extensions

**New Tables (apps/database/prisma/schema.prisma):**

```prisma
model BrandContext {
  id                String   @id @default(cuid())
  tenantId          String
  tenant            Tenant   @relation(fields: [tenantId], references: [id])

  // Context from Phase 1 Analysis
  usageContext      Json     // How images are used (headers, cards, backgrounds)
  visualSignature   Json     // Design patterns (gradients, shapes, filters)
  subjectSemantics  Json     // Common subjects (people, buildings, tools)
  brandEmotion      Json     // Emotional tone (professional, urgent, calm)

  // Metadata
  analyzedAt        DateTime @default(now())
  sourceFolder      String   // Google Drive folder ID
  imageCount        Int      // Number of images analyzed

  @@index([tenantId])
}

model GeneratedImage {
  id                String   @id @default(cuid())
  tenantId          String
  tenant            Tenant   @relation(fields: [tenantId], references: [id])

  // Generation Details
  prompt            String   @db.Text
  contextId         String?
  context           BrandContext? @relation(fields: [contextId], references: [id])

  // Image Data
  imageUrl          String   // Cloudinary/S3 URL
  thumbnailUrl      String?
  width             Int
  height            Int
  format            String   // webp, png, jpg

  // Usage Tracking
  usedFor           String?  // "service_request", "marketing", "documentation"
  usedInId          String?  // Reference to ServiceRequest, etc.

  // API Tracking
  model             String   // "dall-e-3", "midjourney-v6", "stable-diffusion-xl"
  costUSD           Decimal  @db.Decimal(10, 4)
  generatedAt       DateTime @default(now())

  @@index([tenantId])
  @@index([contextId])
}

model AIUsageLog {
  id                String   @id @default(cuid())
  tenantId          String
  tenant            Tenant   @relation(fields: [tenantId], references: [id])

  operation         String   // "context_analysis", "image_generation"
  model             String
  tokensUsed        Int?
  costUSD           Decimal  @db.Decimal(10, 4)
  success           Boolean
  errorMessage      String?  @db.Text

  createdAt         DateTime @default(now())

  @@index([tenantId, createdAt])
}
```

---

## Phase 1: Context Analyzer Implementation

### File: `apps/web/lib/ai/context-analyzer.ts`

```typescript
import { GoogleDriveClient } from './google-drive-client';
import { OpenAI } from 'openai';
import { prisma } from '@/lib/database';

interface AnalysisResult {
  usageContext: {
    headerImages: string[];
    cardBackgrounds: string[];
    iconography: string[];
    fullBleedImages: string[];
  };
  visualSignature: {
    colorPalette: string[];
    commonFilters: string[];
    compositionPatterns: string[];
    textOverlayStyle: string;
  };
  subjectSemantics: {
    primarySubjects: string[];
    secondaryElements: string[];
    avoidedTopics: string[];
  };
  brandEmotion: {
    tone: string; // "professional", "urgent", "reassuring"
    adjectives: string[];
  };
}

export class ContextAnalyzer {
  private openai: OpenAI;
  private driveClient: GoogleDriveClient;

  constructor(tenantId: string) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.driveClient = new GoogleDriveClient(tenantId);
  }

  async analyzeCompanyAssets(folderId: string): Promise<AnalysisResult> {
    // 1. Fetch images from Google Drive
    const images = await this.driveClient.getImagesFromFolder(folderId);

    // 2. Prepare multimodal prompt
    const prompt = this.buildAnalysisPrompt();

    // 3. Analyze images with GPT-4 Vision
    const response = await this.openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "system",
          content: prompt
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze these ${images.length} images from our company's visual assets.`
            },
            ...images.slice(0, 10).map(img => ({ // Limit to 10 images per API call
              type: "image_url" as const,
              image_url: { url: img.url }
            }))
          ]
        }
      ],
      max_tokens: 2000,
    });

    // 4. Parse structured response
    const analysis = JSON.parse(response.choices[0].message.content!);

    // 5. Store in database
    await prisma.brandContext.create({
      data: {
        tenantId: this.driveClient.tenantId,
        usageContext: analysis.usageContext,
        visualSignature: analysis.visualSignature,
        subjectSemantics: analysis.subjectSemantics,
        brandEmotion: analysis.brandEmotion,
        sourceFolder: folderId,
        imageCount: images.length,
      }
    });

    // 6. Log usage
    await this.logUsage('context_analysis', response.usage);

    return analysis;
  }

  private buildAnalysisPrompt(): string {
    return `You are a brand design analyst. Analyze the provided images and extract:

1. **Usage Context**: How are images used?
   - Header/hero images
   - Card backgrounds
   - Icons/small graphics
   - Full-bleed backgrounds

2. **Visual Signature**: What are the design patterns?
   - Color palette (hex codes)
   - Common filters (blur, overlay, gradient)
   - Composition rules (rule of thirds, centered, etc.)
   - Text overlay style (if any)

3. **Subject Semantics**: What subjects appear?
   - Primary subjects (people, buildings, tools, nature)
   - Secondary elements
   - Topics to avoid

4. **Brand Emotion**: What feeling do images convey?
   - Overall tone (professional, urgent, reassuring, etc.)
   - Descriptive adjectives

Return response as JSON matching this structure:
{
  "usageContext": { ... },
  "visualSignature": { ... },
  "subjectSemantics": { ... },
  "brandEmotion": { ... }
}`;
  }

  private async logUsage(operation: string, usage: any): Promise<void> {
    await prisma.aIUsageLog.create({
      data: {
        tenantId: this.driveClient.tenantId,
        operation,
        model: 'gpt-4-vision-preview',
        tokensUsed: usage.total_tokens,
        costUSD: this.calculateCost(usage.total_tokens),
        success: true,
      }
    });
  }

  private calculateCost(tokens: number): number {
    // GPT-4 Vision pricing: ~$0.01 per 1K tokens (adjust based on actual pricing)
    return (tokens / 1000) * 0.01;
  }
}
```

---

## Phase 2: Context-Aware Generator Implementation

### File: `apps/web/lib/ai/image-generator.ts`

```typescript
import { OpenAI } from 'openai';
import { prisma } from '@/lib/database';
import { uploadToCloudinary } from '@/lib/storage/image-storage';

interface GenerationRequest {
  description: string;  // User's request (e.g., "water damage in a modern kitchen")
  usageType: 'header' | 'card' | 'icon' | 'background';
  dimensions?: { width: number; height: number };
}

interface GenerationResult {
  imageUrl: string;
  thumbnailUrl: string;
  cost: number;
}

export class ImageGenerator {
  private openai: OpenAI;
  private tenantId: string;

  constructor(tenantId: string) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.tenantId = tenantId;
  }

  async generateBrandConsistentImage(
    request: GenerationRequest
  ): Promise<GenerationResult> {
    // 1. Fetch latest brand context
    const context = await prisma.brandContext.findFirst({
      where: { tenantId: this.tenantId },
      orderBy: { analyzedAt: 'desc' }
    });

    if (!context) {
      throw new Error('No brand context found. Please run context analysis first.');
    }

    // 2. Build context-enriched prompt
    const enhancedPrompt = this.buildEnhancedPrompt(request, context);

    // 3. Generate image with DALL-E 3
    const response = await this.openai.images.generate({
      model: "dall-e-3",
      prompt: enhancedPrompt,
      size: this.mapDimensions(request.dimensions),
      quality: "hd",
      n: 1,
    });

    // 4. Download and re-upload to our storage
    const generatedUrl = response.data[0].url!;
    const { url, thumbnailUrl } = await uploadToCloudinary(
      generatedUrl,
      this.tenantId
    );

    // 5. Store in database
    await prisma.generatedImage.create({
      data: {
        tenantId: this.tenantId,
        prompt: enhancedPrompt,
        contextId: context.id,
        imageUrl: url,
        thumbnailUrl,
        width: request.dimensions?.width || 1024,
        height: request.dimensions?.height || 1024,
        format: 'webp',
        model: 'dall-e-3',
        costUSD: 0.04, // DALL-E 3 HD pricing
        usedFor: request.usageType,
      }
    });

    // 6. Log usage
    await this.logUsage('image_generation', 'dall-e-3', 0.04);

    return {
      imageUrl: url,
      thumbnailUrl,
      cost: 0.04
    };
  }

  private buildEnhancedPrompt(
    request: GenerationRequest,
    context: any
  ): string {
    const signature = context.visualSignature as any;
    const emotion = context.brandEmotion as any;
    const subjects = context.subjectSemantics as any;

    return `Create a ${request.usageType} image: ${request.description}

BRAND CONTEXT:
- Color palette: ${signature.colorPalette?.join(', ')}
- Visual style: ${signature.compositionPatterns?.join(', ')}
- Tone: ${emotion.tone} - ${emotion.adjectives?.join(', ')}
- Common subjects: ${subjects.primarySubjects?.join(', ')}
- Avoid: ${subjects.avoidedTopics?.join(', ')}

Style requirements:
${this.getStyleRequirements(request.usageType, signature)}

Generate a photorealistic, professional image that matches this brand identity.`;
  }

  private getStyleRequirements(usageType: string, signature: any): string {
    switch (usageType) {
      case 'header':
        return `- Wide composition suitable for hero banner
- Subtle overlay gradient if text will be placed on top
- High contrast and visual interest`;
      case 'card':
        return `- Balanced composition for 16:9 card
- Clear focal point
- Leave space for text overlay`;
      case 'icon':
        return `- Simple, recognizable subject
- Minimal background
- High clarity for small sizes`;
      case 'background':
        return `- Subtle, non-distracting
- Apply blur: ${signature.commonFilters?.includes('blur') ? 'yes' : 'no'}
- Maintain brand color palette`;
      default:
        return '';
    }
  }

  private mapDimensions(dims?: { width: number; height: number }): "1024x1024" | "1792x1024" | "1024x1792" {
    if (!dims) return "1024x1024";

    const aspectRatio = dims.width / dims.height;
    if (aspectRatio > 1.5) return "1792x1024"; // Wide
    if (aspectRatio < 0.7) return "1024x1792"; // Tall
    return "1024x1024"; // Square
  }

  private async logUsage(operation: string, model: string, cost: number): Promise<void> {
    await prisma.aIUsageLog.create({
      data: {
        tenantId: this.tenantId,
        operation,
        model,
        costUSD: cost,
        success: true,
      }
    });
  }
}
```

---

## API Routes

### File: `apps/web/app/api/ai/analyze-context/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ContextAnalyzer } from '@/lib/ai/context-analyzer';

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate
    const session = await getServerSession(authOptions);
    if (!session?.user?.tenantId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse request
    const { googleDriveFolderId } = await req.json();

    // 3. Run analysis
    const analyzer = new ContextAnalyzer(session.user.tenantId);
    const result = await analyzer.analyzeCompanyAssets(googleDriveFolderId);

    return NextResponse.json({
      success: true,
      context: result,
      message: 'Brand context analyzed successfully'
    });

  } catch (error: any) {
    console.error('Context analysis error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

### File: `apps/web/app/api/ai/generate-image/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next/auth';
import { authOptions } from '@/lib/auth';
import { ImageGenerator } from '@/lib/ai/image-generator';

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate
    const session = await getServerSession(authOptions);
    if (!session?.user?.tenantId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse request
    const { description, usageType, dimensions } = await req.json();

    // 3. Generate image
    const generator = new ImageGenerator(session.user.tenantId);
    const result = await generator.generateBrandConsistentImage({
      description,
      usageType,
      dimensions
    });

    return NextResponse.json({
      success: true,
      ...result
    });

  } catch (error: any) {
    console.error('Image generation error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

---

## UI Components

### File: `apps/web/components/ai/ImageGenerator.tsx`

```tsx
'use client';

import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

export function ImageGenerator() {
  const [description, setDescription] = useState('');
  const [usageType, setUsageType] = useState<'header' | 'card' | 'icon' | 'background'>('card');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [cost, setCost] = useState<number>(0);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description,
          usageType,
          dimensions: getDimensions(usageType)
        })
      });

      const data = await response.json();
      setGeneratedImage(data.imageUrl);
      setCost(data.cost);
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-portal-card rounded-xl p-6 border border-portal-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-3 rounded-lg">
          <Sparkles className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">AI Image Generator</h2>
          <p className="text-sm text-portal-muted">
            Create brand-consistent images using AI
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Describe the image
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Water damage in a modern kitchen with professionals inspecting"
            className="w-full px-4 py-3 border border-portal-border rounded-lg focus:ring-2 focus:ring-nrpg-teal"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Usage Type</label>
          <select
            value={usageType}
            onChange={(e) => setUsageType(e.target.value as any)}
            className="w-full px-4 py-3 border border-portal-border rounded-lg"
          >
            <option value="header">Header/Hero Image</option>
            <option value="card">Card Background</option>
            <option value="icon">Icon/Small Graphic</option>
            <option value="background">Full Background</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !description}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium
                     hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Image ($0.04)
            </>
          )}
        </button>

        {generatedImage && (
          <div className="mt-6 space-y-3">
            <img
              src={generatedImage}
              alt="Generated"
              className="w-full rounded-lg shadow-lg"
            />
            <p className="text-sm text-portal-muted text-center">
              Cost: ${cost.toFixed(2)} • Click to download
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function getDimensions(type: string) {
  switch (type) {
    case 'header': return { width: 1792, height: 1024 };
    case 'card': return { width: 1024, height: 1024 };
    case 'icon': return { width: 512, height: 512 };
    case 'background': return { width: 1920, height: 1080 };
    default: return { width: 1024, height: 1024 };
  }
}
```

---

## Google Drive Integration

### File: `apps/web/lib/ai/google-drive-client.ts`

```typescript
import { google } from 'googleapis';
import { prisma } from '@/lib/database';

export class GoogleDriveClient {
  public tenantId: string;
  private drive: any;

  constructor(tenantId: string) {
    this.tenantId = tenantId;
    this.drive = google.drive({
      version: 'v3',
      auth: this.getAuth()
    });
  }

  private getAuth() {
    // Use service account or OAuth2 depending on setup
    return new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!),
      scopes: ['https://www.googleapis.com/auth/drive.readonly']
    });
  }

  async getImagesFromFolder(folderId: string) {
    const response = await this.drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/'`,
      fields: 'files(id, name, mimeType, webContentLink)',
      pageSize: 50
    });

    return response.data.files.map((file: any) => ({
      id: file.id,
      name: file.name,
      url: file.webContentLink
    }));
  }
}
```

---

## Environment Variables

Add to `.env`:

```bash
# OpenAI API
OPENAI_API_KEY=sk-...

# Google Drive API
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}

# Cloudinary (for image storage)
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

---

## Cost Management & Budgets

### File: `apps/web/lib/ai/budget-tracker.ts`

```typescript
import { prisma } from '@/lib/database';

export async function checkBudget(tenantId: string, operation: 'analyze' | 'generate'): Promise<boolean> {
  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM

  const usage = await prisma.aIUsageLog.aggregate({
    where: {
      tenantId,
      createdAt: {
        gte: new Date(`${currentMonth}-01`)
      }
    },
    _sum: {
      costUSD: true
    }
  });

  const monthlyBudget = 100; // $100/month default
  const currentSpend = usage._sum.costUSD?.toNumber() || 0;

  return currentSpend < monthlyBudget;
}
```

---

## Testing Strategy

### Unit Tests

```typescript
// apps/web/__tests__/lib/ai/context-analyzer.test.ts
describe('ContextAnalyzer', () => {
  it('analyzes images and extracts brand context', async () => {
    const analyzer = new ContextAnalyzer('tenant-123');
    const result = await analyzer.analyzeCompanyAssets('folder-id');

    expect(result.usageContext).toBeDefined();
    expect(result.visualSignature.colorPalette).toBeInstanceOf(Array);
  });

  it('handles API errors gracefully', async () => {
    // Mock OpenAI error
    // Assert proper error handling
  });
});
```

### Integration Tests

Test the full flow:
1. Upload images to test Google Drive folder
2. Trigger context analysis via API
3. Verify BrandContext record created
4. Generate test image with context
5. Verify GeneratedImage record created
6. Check cost tracking in AIUsageLog

---

## Security Considerations

1. **API Key Protection**: Store OpenAI/Google credentials in encrypted env vars
2. **Rate Limiting**: Implement rate limiting on generation endpoints (max 10/hour per tenant)
3. **Budget Enforcement**: Block requests if monthly budget exceeded
4. **Input Validation**: Sanitize all user descriptions to prevent prompt injection
5. **Access Control**: Ensure only authenticated users from correct tenant can generate

---

## Rollout Plan

### Phase 1: Foundation (Week 1)
- [ ] Add database schema (BrandContext, GeneratedImage, AIUsageLog)
- [ ] Implement Google Drive client
- [ ] Set up OpenAI integration
- [ ] Create context analyzer logic
- [ ] Add API routes for context analysis

### Phase 2: Image Generation (Week 2)
- [ ] Implement image generator with context enrichment
- [ ] Add Cloudinary storage integration
- [ ] Create generation API route
- [ ] Build UI components
- [ ] Implement budget tracking

### Phase 3: Testing & UAT (Week 3)
- [ ] Unit tests for all AI modules
- [ ] Integration tests for full workflow
- [ ] Admin dashboard for usage monitoring
- [ ] Senior PM acceptance testing
- [ ] Cost analysis and optimization

### Phase 4: Production (Week 4)
- [ ] Deploy to staging
- [ ] Monitor API costs for 1 week
- [ ] Production deployment with feature flag
- [ ] Gradual rollout to tenants
- [ ] Documentation and training materials

---

## Success Metrics

- [ ] Context analysis completes in <30 seconds
- [ ] Generated images match brand style (80%+ user approval)
- [ ] Average generation cost <$0.10 per image (including storage)
- [ ] Monthly AI spend <$100 per tenant
- [ ] Zero security incidents (API key leaks, unauthorized access)
- [ ] 90%+ uptime on AI endpoints

---

## Future Enhancements

1. **Multi-Model Support**: Add Midjourney, Stable Diffusion as alternatives to DALL-E
2. **Style Transfer**: Allow uploading reference images for specific style matching
3. **Batch Generation**: Generate multiple variations in one request
4. **A/B Testing**: Generate 2-3 options and let users choose
5. **Fine-Tuning**: Train custom models on tenant's brand assets
6. **Video Generation**: Extend to AI video using RunwayML/Pika
7. **Real-Time Preview**: Show generation progress with intermediate steps

---

**Total Implementation Time**: 3-4 weeks
**Estimated Monthly Operating Cost**: $50-150 per tenant (depending on usage)
**Team Required**: 1 Senior Developer, 1 AI Engineer (consultant), 1 Designer for testing
