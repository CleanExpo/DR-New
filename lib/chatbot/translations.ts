// Multi-language support for chatbot
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const translations = {
  en: {
    translation: {
      greeting: "Hello! I'm here to help with your disaster recovery needs. How can I assist you today?",
      emergency: "I understand this is an emergency. Please call 1300 309 361 immediately for fastest response.",
      typing: "Agent is typing...",
      sendMessage: "Send message",
      uploadPhoto: "Upload photos",
      voiceInput: "Speak your message",
      bookService: "Book Service",
      getQuote: "Get Quote",
      callNow: "Call Now",
      chatWithAgent: "Chat with Agent",
      endChat: "End Chat",
      rateExperience: "Rate your experience",
      emergencyDetected: "Emergency situation detected",
      connectingAgent: "Connecting you to a specialist...",
      agentJoined: "{{name}} has joined the conversation",
      agentLeft: "Agent has left the conversation",
      connectionLost: "Connection lost. Trying to reconnect...",
      fileUploadError: "Error uploading file. Please try again.",
      voiceNotSupported: "Voice input not supported on this device",
      locationRequest: "Share your location for faster service",
      weatherAlert: "Weather Alert: {{alert}}",
      insuranceAssist: "I can help with your insurance claim",
      damageAssessment: "Analyzing damage from photos...",
      quoteGenerated: "Quote #{{id}} generated",
      appointmentConfirmed: "Appointment confirmed for {{date}}",
      feedbackThanks: "Thank you for your feedback",
      serviceAreas: "We service Brisbane, Ipswich, and Logan",
      responseTime: "Average response time: 1 hour",
      availableServices: {
        water: "Water Damage Restoration",
        fire: "Fire & Smoke Damage",
        mould: "Mould Remediation",
        biohazard: "Biohazard Cleaning",
        storm: "Storm Recovery"
      },
      emotionalResponses: {
        anxious: "I understand this is stressful. We're here to help.",
        distressed: "I can see this is very difficult for you. Let's get you immediate help.",
        frustrated: "I apologize for any frustration. Let me resolve this quickly.",
        satisfied: "Great! Is there anything else I can help with?",
        grateful: "We appreciate your trust in us."
      }
    }
  },
  zh: {
    translation: {
      greeting: "您好！我是来帮助您处理灾难恢复需求的。今天我能为您做些什么？",
      emergency: "我理解这是紧急情况。请立即致电 1300 309 361 以获得最快响应。",
      typing: "客服正在输入...",
      sendMessage: "发送消息",
      uploadPhoto: "上传照片",
      voiceInput: "语音输入",
      bookService: "预约服务",
      getQuote: "获取报价",
      callNow: "立即致电",
      chatWithAgent: "与客服聊天",
      endChat: "结束聊天",
      rateExperience: "评价您的体验",
      emergencyDetected: "检测到紧急情况",
      connectingAgent: "正在为您连接专家...",
      agentJoined: "{{name}} 已加入对话",
      agentLeft: "客服已离开对话",
      connectionLost: "连接丢失。正在尝试重新连接...",
      fileUploadError: "文件上传错误。请重试。",
      voiceNotSupported: "此设备不支持语音输入",
      locationRequest: "分享您的位置以获得更快的服务",
      weatherAlert: "天气警报：{{alert}}",
      insuranceAssist: "我可以帮助您处理保险索赔",
      damageAssessment: "正在从照片分析损坏...",
      quoteGenerated: "报价 #{{id}} 已生成",
      appointmentConfirmed: "预约已确认：{{date}}",
      feedbackThanks: "感谢您的反馈",
      serviceAreas: "我们服务布里斯班、伊普斯威奇和洛根",
      responseTime: "平均响应时间：1小时",
      availableServices: {
        water: "水损修复",
        fire: "火灾和烟雾损坏",
        mould: "霉菌修复",
        biohazard: "生物危害清理",
        storm: "风暴恢复"
      },
      emotionalResponses: {
        anxious: "我理解这很有压力。我们在这里帮助您。",
        distressed: "我看得出这对您来说非常困难。让我们立即为您提供帮助。",
        frustrated: "对于任何挫折，我深表歉意。让我快速解决这个问题。",
        satisfied: "太好了！还有什么我可以帮助的吗？",
        grateful: "感谢您对我们的信任。"
      }
    }
  },
  ar: {
    translation: {
      greeting: "مرحباً! أنا هنا للمساعدة في احتياجات استعادة الكوارث. كيف يمكنني مساعدتك اليوم؟",
      emergency: "أفهم أن هذه حالة طارئة. يرجى الاتصال بـ 1300 309 361 فوراً للحصول على أسرع استجابة.",
      typing: "الوكيل يكتب...",
      sendMessage: "إرسال رسالة",
      uploadPhoto: "تحميل الصور",
      voiceInput: "التحدث برسالتك",
      bookService: "حجز خدمة",
      getQuote: "الحصول على عرض سعر",
      callNow: "اتصل الآن",
      chatWithAgent: "الدردشة مع وكيل",
      endChat: "إنهاء الدردشة",
      rateExperience: "قيم تجربتك",
      emergencyDetected: "تم اكتشاف حالة طارئة",
      connectingAgent: "يتم توصيلك بأخصائي...",
      agentJoined: "{{name}} انضم إلى المحادثة",
      agentLeft: "غادر الوكيل المحادثة",
      connectionLost: "فقد الاتصال. محاولة إعادة الاتصال...",
      fileUploadError: "خطأ في تحميل الملف. يرجى المحاولة مرة أخرى.",
      voiceNotSupported: "الإدخال الصوتي غير مدعوم على هذا الجهاز",
      locationRequest: "شارك موقعك للحصول على خدمة أسرع",
      weatherAlert: "تنبيه الطقس: {{alert}}",
      insuranceAssist: "يمكنني المساعدة في مطالبة التأمين الخاصة بك",
      damageAssessment: "تحليل الضرر من الصور...",
      quoteGenerated: "تم إنشاء عرض السعر #{{id}}",
      appointmentConfirmed: "تم تأكيد الموعد في {{date}}",
      feedbackThanks: "شكراً لملاحظاتك",
      serviceAreas: "نخدم بريسبان وإيبسويتش ولوغان",
      responseTime: "متوسط وقت الاستجابة: ساعة واحدة",
      availableServices: {
        water: "استعادة أضرار المياه",
        fire: "أضرار الحريق والدخان",
        mould: "معالجة العفن",
        biohazard: "تنظيف المخاطر البيولوجية",
        storm: "التعافي من العاصفة"
      },
      emotionalResponses: {
        anxious: "أفهم أن هذا مرهق. نحن هنا للمساعدة.",
        distressed: "أرى أن هذا صعب جداً عليك. دعنا نحصل على مساعدة فورية لك.",
        frustrated: "أعتذر عن أي إحباط. دعني أحل هذا بسرعة.",
        satisfied: "رائع! هل هناك أي شيء آخر يمكنني المساعدة فيه؟",
        grateful: "نقدر ثقتك بنا."
      }
    }
  }
};

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources: translations,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;