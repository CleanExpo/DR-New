// Advanced AI Chatbot Engine
import {
  ChatMessage,
  MessageMetadata,
  EmotionalState,
  UrgencyLevel,
  SentimentAnalysis,
  Entity,
  Action,
  ServiceType,
  ChatLanguage,
  ConversationContext,
  DamageAssessment,
  ImageAnalysis
} from './types';

// Emergency keywords for immediate detection
const EMERGENCY_KEYWORDS = {
  en: ['emergency', 'urgent', 'help', 'flooding', 'fire', 'smoke', 'sewage', 'danger', 'immediate', 'asap', 'now', 'critical'],
  zh: ['紧急', '帮助', '火灾', '水灾', '危险', '立即', '现在'],
  ar: ['طوارئ', 'عاجل', 'مساعدة', 'حريق', 'فيضان', 'خطر', 'فوري']
};

// Service type detection patterns
const SERVICE_PATTERNS: Record<ServiceType, RegExp[]> = {
  'water-damage': [/flood|water damage|leak|burst pipe|wet|soaked|water/i],
  'fire-damage': [/fire|smoke|burn|soot|ash|char/i],
  'mould-remediation': [/mold|mould|fungus|mildew|spores/i],
  'biohazard': [/biohazard|contamination|hazardous|toxic|chemical/i],
  'storm-recovery': [/storm|hurricane|cyclone|tornado|wind damage|hail/i],
  'general': [/.*/]
};

export class ChatbotEngine {
  private conversationHistory: Map<string, ChatMessage[]> = new Map();
  private contextStore: Map<string, ConversationContext> = new Map();

  /**
   * Process incoming message with full AI capabilities
   */
  async processMessage(
    message: string,
    conversationId: string,
    language: ChatLanguage = 'en',
    attachments?: any[]
  ): Promise<{
    response: string;
    metadata: MessageMetadata;
    suggestedActions?: Action[];
    requiresEscalation: boolean;
  }> {
    // Get or create conversation context
    const context = this.getOrCreateContext(conversationId);

    // Detect emergency status
    const isEmergency = this.detectEmergency(message, language);

    // Analyze sentiment and emotional state
    const sentiment = await this.analyzeSentiment(message);

    // Extract entities and intent
    const { intent, entities } = await this.extractIntentAndEntities(message, context);

    // Detect service type
    const serviceType = this.detectServiceType(message);

    // Calculate urgency level
    const urgency = this.calculateUrgency(message, sentiment, isEmergency);

    // Process any attachments (images for damage assessment)
    let imageAnalysis: ImageAnalysis | undefined;
    if (attachments?.length) {
      imageAnalysis = await this.analyzeImages(attachments);
    }

    // Update context with extracted information
    this.updateContext(conversationId, {
      serviceType,
      urgency,
      emotionalJourney: [...(context.emotionalJourney || []), sentiment.emotion]
    });

    // Generate AI response
    const response = await this.generateResponse(
      message,
      context,
      intent,
      entities,
      sentiment,
      imageAnalysis
    );

    // Determine if escalation is needed
    const requiresEscalation = this.shouldEscalate(
      urgency,
      sentiment,
      context,
      isEmergency
    );

    // Generate suggested actions
    const suggestedActions = this.generateActions(
      intent,
      serviceType,
      urgency,
      context
    );

    // Build metadata
    const metadata: MessageMetadata = {
      intent,
      entities,
      sentiment,
      urgency,
      suggestedActions,
      confidence: 0.95
    };

    // Store message in history
    this.storeMessage(conversationId, {
      id: this.generateId(),
      conversationId,
      role: 'assistant',
      type: 'text',
      content: response,
      metadata,
      timestamp: new Date(),
      language,
      emotionalState: sentiment.emotion
    });

    return {
      response,
      metadata,
      suggestedActions,
      requiresEscalation
    };
  }

  /**
   * Detect emergency keywords in message
   */
  private detectEmergency(message: string, language: ChatLanguage): boolean {
    const keywords = EMERGENCY_KEYWORDS[language];
    const lowerMessage = message.toLowerCase();
    return keywords.some(keyword => lowerMessage.includes(keyword.toLowerCase()));
  }

  /**
   * Analyze sentiment using AI
   */
  private async analyzeSentiment(message: string): Promise<SentimentAnalysis> {
    try {
      // Use API route for server-side OpenAI calls
      if (typeof window !== 'undefined') {
        const response = await fetch('/api/chatbot/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'sentiment',
            message
          })
        });

        if (response.ok) {
          const result = await response.json();
          return {
            score: result.score || 0,
            magnitude: result.magnitude || 1,
            emotion: result.emotion || 'neutral'
          };
        }
      }

      // Fallback sentiment analysis without API
      const hasEmergencyKeywords = EMERGENCY_KEYWORDS.en.some(k =>
        message.toLowerCase().includes(k)
      );

      if (hasEmergencyKeywords) {
        return { score: -0.5, magnitude: 8, emotion: 'distressed' };
      }

      return { score: 0, magnitude: 1, emotion: 'neutral' };
    } catch (error) {
      console.error('Sentiment analysis error:', error);
      return { score: 0, magnitude: 1, emotion: 'neutral' };
    }
  }

  /**
   * Extract intent and entities using NLP
   */
  private async extractIntentAndEntities(
    message: string,
    context: ConversationContext
  ): Promise<{ intent: string; entities: Entity[] }> {
    try {
      // Use API route for server-side OpenAI calls
      if (typeof window !== 'undefined') {
        const response = await fetch('/api/chatbot/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'intent',
            message,
            context
          })
        });

        if (response.ok) {
          const result = await response.json();
          return {
            intent: result.intent || 'general_inquiry',
            entities: result.entities || []
          };
        }
      }

      // Fallback intent detection
      let intent = 'general_inquiry';
      const entities: Entity[] = [];

      const lowerMessage = message.toLowerCase();
      if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent')) {
        intent = 'emergency_help';
      } else if (lowerMessage.includes('quote') || lowerMessage.includes('cost')) {
        intent = 'get_quote';
      } else if (lowerMessage.includes('book') || lowerMessage.includes('schedule')) {
        intent = 'book_appointment';
      } else if (lowerMessage.includes('damage')) {
        intent = 'report_damage';
      }

      return { intent, entities };
    } catch (error) {
      console.error('Intent extraction error:', error);
      return { intent: 'general_inquiry', entities: [] };
    }
  }

  /**
   * Detect service type from message
   */
  private detectServiceType(message: string): ServiceType {
    for (const [service, patterns] of Object.entries(SERVICE_PATTERNS)) {
      if (patterns.some(pattern => pattern.test(message))) {
        return service as ServiceType;
      }
    }
    return 'general';
  }

  /**
   * Calculate urgency level
   */
  private calculateUrgency(
    message: string,
    sentiment: SentimentAnalysis,
    isEmergency: boolean
  ): UrgencyLevel {
    if (isEmergency) {
      return {
        level: 'critical',
        reason: 'Emergency keywords detected',
        suggestedResponseTime: 0
      };
    }

    if (sentiment.emotion === 'distressed' && sentiment.magnitude > 7) {
      return {
        level: 'high',
        reason: 'Customer is highly distressed',
        suggestedResponseTime: 60
      };
    }

    if (message.toLowerCase().includes('today') || message.toLowerCase().includes('now')) {
      return {
        level: 'high',
        reason: 'Immediate service requested',
        suggestedResponseTime: 300
      };
    }

    if (sentiment.emotion === 'frustrated') {
      return {
        level: 'medium',
        reason: 'Customer frustration detected',
        suggestedResponseTime: 600
      };
    }

    return {
      level: 'low',
      reason: 'Standard inquiry',
      suggestedResponseTime: 1800
    };
  }

  /**
   * Analyze uploaded images for damage assessment
   */
  private async analyzeImages(attachments: any[]): Promise<ImageAnalysis> {
    // This would integrate with computer vision APIs
    // For now, returning mock analysis
    return {
      damageType: ['water-damage', 'structural'],
      severity: 'moderate',
      affectedArea: 25,
      estimatedCost: 5000,
      recommendations: [
        'Immediate water extraction needed',
        'Dehumidification required',
        'Possible mold prevention treatment'
      ],
      insuranceRelevant: true
    };
  }

  /**
   * Generate AI-powered response
   */
  private async generateResponse(
    message: string,
    context: ConversationContext,
    intent: string,
    entities: Entity[],
    sentiment: SentimentAnalysis,
    imageAnalysis?: ImageAnalysis
  ): Promise<string> {
    const systemPrompt = this.buildSystemPrompt(context, sentiment);

    try {
      // Use API route for server-side OpenAI calls
      if (typeof window !== 'undefined') {
        const response = await fetch('/api/chatbot/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message,
            systemPrompt,
            intent,
            entities,
            sentiment,
            imageAnalysis
          })
        });

        if (response.ok) {
          const result = await response.json();
          return result.response || this.getFallbackResponse(intent, context);
        }
      }

      // Use fallback response if API is not available
      return this.getFallbackResponse(intent, context);
    } catch (error) {
      console.error('Response generation error:', error);
      return this.getFallbackResponse(intent, context);
    }
  }

  /**
   * Build system prompt based on context
   */
  private buildSystemPrompt(
    context: ConversationContext,
    sentiment: SentimentAnalysis
  ): string {
    const emotionalTone = this.getEmotionalTone(sentiment.emotion);

    return `You are a highly empathetic and knowledgeable disaster recovery specialist for Disaster Recovery Brisbane.
      Current context: ${JSON.stringify(context)}
      Customer emotional state: ${sentiment.emotion}

      Guidelines:
      - ${emotionalTone}
      - Provide clear, actionable advice
      - Show genuine concern for their situation
      - Mention our 24/7 emergency line: 1300 309 361 when appropriate
      - Be professional yet compassionate
      - Keep responses concise but thorough
      - If discussing costs, provide ranges
      - Always prioritize safety

      Service capabilities:
      - Water damage restoration
      - Fire and smoke damage
      - Mould remediation
      - Biohazard cleaning
      - Storm recovery
      - Insurance assistance
      - 1-hour emergency response in Brisbane, Ipswich, Logan`;
  }

  /**
   * Get appropriate emotional tone
   */
  private getEmotionalTone(emotion: EmotionalState): string {
    const tones: Record<EmotionalState, string> = {
      neutral: 'Be professional and helpful',
      anxious: 'Be calming and reassuring, acknowledge their concerns',
      distressed: 'Show immediate empathy, prioritize emotional support',
      frustrated: 'Be patient and solution-focused, apologize if appropriate',
      satisfied: 'Be positive and maintain their satisfaction',
      grateful: 'Express appreciation for their trust'
    };
    return tones[emotion];
  }

  /**
   * Determine if escalation is needed
   */
  private shouldEscalate(
    urgency: UrgencyLevel,
    sentiment: SentimentAnalysis,
    context: ConversationContext,
    isEmergency: boolean
  ): boolean {
    if (isEmergency || urgency.level === 'critical') return true;
    if (sentiment.emotion === 'distressed' && sentiment.magnitude > 8) return true;
    if (context.customerInfo?.customerType === 'vip') return true;
    if (sentiment.emotion === 'frustrated' && sentiment.magnitude > 7) return true;
    return false;
  }

  /**
   * Generate suggested actions
   */
  private generateActions(
    intent: string,
    serviceType: ServiceType,
    urgency: UrgencyLevel,
    context: ConversationContext
  ): Action[] {
    const actions: Action[] = [];

    if (intent === 'request_service' || urgency.level === 'critical') {
      actions.push({
        type: 'call',
        label: 'Call Emergency Line',
        data: { phone: '1300309361' }
      });
    }

    if (intent === 'get_quote') {
      actions.push({
        type: 'quote',
        label: 'Get Instant Quote',
        data: { serviceType }
      });
    }

    if (intent === 'book_appointment') {
      actions.push({
        type: 'book',
        label: 'Schedule Service',
        data: { serviceType, urgency: urgency.level }
      });
    }

    if (serviceType !== 'general') {
      actions.push({
        type: 'upload',
        label: 'Upload Damage Photos',
        data: { purpose: 'assessment' }
      });
    }

    return actions;
  }

  /**
   * Get fallback response
   */
  private getFallbackResponse(intent: string, context: ConversationContext): string {
    const responses: Record<string, string> = {
      request_service: "I understand you need our services urgently. Our team is available 24/7. Would you like me to arrange immediate assistance? You can also call us directly at 1300 309 361.",
      get_quote: "I'd be happy to help you get a quote. Could you tell me more about the type of damage and the affected area?",
      book_appointment: "I can help schedule a service appointment for you. What type of service do you need, and when would be convenient for you?",
      report_damage: "I'm sorry to hear about the damage. Can you describe what happened? If possible, uploading photos would help us assess the situation better.",
      emergency_help: "This sounds like an emergency situation. Please call our 24/7 emergency line immediately at 1300 309 361 for fastest response.",
      general_inquiry: "Thank you for contacting Disaster Recovery Brisbane. How can I assist you today with our restoration services?"
    };

    return responses[intent] || responses.general_inquiry;
  }

  // Helper methods
  private getOrCreateContext(conversationId: string): ConversationContext {
    if (!this.contextStore.has(conversationId)) {
      this.contextStore.set(conversationId, {});
    }
    return this.contextStore.get(conversationId)!;
  }

  private updateContext(conversationId: string, updates: Partial<ConversationContext>) {
    const current = this.getOrCreateContext(conversationId);
    this.contextStore.set(conversationId, { ...current, ...updates });
  }

  private storeMessage(conversationId: string, message: ChatMessage) {
    const history = this.conversationHistory.get(conversationId) || [];
    history.push(message);
    this.conversationHistory.set(conversationId, history);
  }

  private generateId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}