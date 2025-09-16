// Chatbot Service
// Provides intelligent chat functionality

export interface ChatbotConfig {
  enabled: boolean
  model: string
  maxTokens: number
  temperature: number
  debugMode: boolean
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
  metadata?: any
}

class ChatbotService {
  private config: ChatbotConfig = {
    enabled: true,
    model: 'gpt-3.5-turbo',
    maxTokens: 1000,
    temperature: 0.7,
    debugMode: process.env.NODE_ENV === 'development'
  }

  private conversations: Map<string, ChatMessage[]> = new Map()

  public async sendMessage(conversationId: string, message: string): Promise<ChatMessage> {
    if (!this.config.enabled) {
      throw new Error('Chatbot service is disabled')
    }

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}_user`,
      role: 'user',
      content: message,
      timestamp: Date.now()
    }

    // Add user message to conversation
    this.addMessageToConversation(conversationId, userMessage)

    // Generate response
    const response = await this.generateResponse(conversationId, message)

    const assistantMessage: ChatMessage = {
      id: `msg_${Date.now()}_assistant`,
      role: 'assistant',
      content: response,
      timestamp: Date.now()
    }

    // Add assistant message to conversation
    this.addMessageToConversation(conversationId, assistantMessage)

    return assistantMessage
  }

  private addMessageToConversation(conversationId: string, message: ChatMessage): void {
    const conversation = this.conversations.get(conversationId) || []
    conversation.push(message)
    this.conversations.set(conversationId, conversation)
  }

  private async generateResponse(conversationId: string, message: string): Promise<string> {
    // Mock response generation for now
    // In production, this would call OpenAI API or similar

    if (this.config.debugMode) {
      console.log('🤖 Generating response for:', message)
    }

    // Simple rule-based responses for emergency services
    if (message.toLowerCase().includes('emergency') || message.toLowerCase().includes('urgent')) {
      return "I understand this is urgent. Please call our emergency hotline at 1300 309 361 immediately for immediate assistance. Our team is available 24/7 for emergency disasters."
    }

    if (message.toLowerCase().includes('water damage')) {
      return "We specialize in water damage restoration for Brisbane, Ipswich, and Logan. Our certified technicians can respond within 1 hour. Would you like me to connect you with our emergency response team?"
    }

    if (message.toLowerCase().includes('fire damage') || message.toLowerCase().includes('smoke')) {
      return "Fire and smoke damage requires immediate professional attention. We provide comprehensive fire damage restoration services. Our team can assess and begin restoration work quickly. Call 1300 309 361 for urgent assistance."
    }

    if (message.toLowerCase().includes('mold') || message.toLowerCase().includes('mould')) {
      return "Mould remediation is crucial for health and safety. We offer professional mould removal and prevention services across Brisbane. Our IICRC certified technicians can safely remove mould and prevent future growth."
    }

    // Default response
    return "Thank you for contacting Disaster Recovery Brisbane. How can I help you with your disaster recovery needs today? For immediate emergencies, please call 1300 309 361."
  }

  public getConversation(conversationId: string): ChatMessage[] {
    return this.conversations.get(conversationId) || []
  }

  public clearConversation(conversationId: string): void {
    this.conversations.delete(conversationId)
  }

  public updateConfig(config: Partial<ChatbotConfig>): void {
    this.config = { ...this.config, ...config }
  }

  public getConfig(): ChatbotConfig {
    return { ...this.config }
  }

  public isEnabled(): boolean {
    return this.config.enabled
  }
}

export const chatbotService = new ChatbotService()
export default chatbotService