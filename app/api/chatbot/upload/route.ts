// API Route for file uploads and damage assessment
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { ImageAnalysis } from '@/lib/chatbot/types';

// Mock image analysis function (in production, would use TensorFlow or Azure Vision API)
async function analyzeImage(imagePath: string): Promise<ImageAnalysis> {
  // This would integrate with computer vision APIs
  // For now, returning mock analysis based on random conditions
  const severity = ['minor', 'moderate', 'severe', 'catastrophic'][Math.floor(Math.random() * 4)] as any;
  const damageTypes = ['water-damage', 'structural', 'mold', 'fire-damage'];
  const selectedTypes = damageTypes.slice(0, Math.floor(Math.random() * 3) + 1);

  return {
    damageType: selectedTypes,
    severity,
    affectedArea: Math.floor(Math.random() * 100) + 10,
    estimatedCost: severity === 'minor' ? 2000 :
                   severity === 'moderate' ? 5000 :
                   severity === 'severe' ? 15000 : 50000,
    recommendations: [
      'Immediate water extraction required',
      'Professional dehumidification needed',
      'Mold prevention treatment recommended',
      'Structural assessment advised'
    ].slice(0, severity === 'catastrophic' ? 4 : severity === 'severe' ? 3 : 2),
    insuranceRelevant: severity !== 'minor'
  };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const conversationId = formData.get('conversationId') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${conversationId}_${Date.now()}_${file.name}`;
    const uploadPath = path.join(process.cwd(), 'public', 'uploads', filename);

    // Save file
    await writeFile(uploadPath, buffer);

    // Analyze image if it's an image file
    let analysis: ImageAnalysis | undefined;
    if (file.type.startsWith('image/')) {
      analysis = await analyzeImage(uploadPath);
    }

    // Return response
    return NextResponse.json({
      id: `file_${Date.now()}`,
      url: `/uploads/${filename}`,
      name: file.name,
      size: file.size,
      type: file.type,
      analysis,
      estimatedCost: analysis?.estimatedCost ? {
        min: Math.floor(analysis.estimatedCost * 0.8),
        max: Math.floor(analysis.estimatedCost * 1.2)
      } : undefined
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}