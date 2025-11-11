"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

export function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqs = [
    {
      question: "Why pay $2,750 when I can call contractors directly?",
      answer:
        "Because the wrong contractor voids your insurance claim. The right contractor at the right time saves you thousands and protects your coverage. We guarantee both.",
    },
    {
      question: "What if I'm not satisfied with the contractor?",
      answer:
        "We monitor every job. If there's an issue, we fix it immediately or assign a new contractor. Your satisfaction is guaranteed.",
    },
    {
      question: "Do you work with my insurance company?",
      answer:
        "We work with all major Australian insurers and handle all coordination. Our procedures are pre-approved to protect your claim.",
    },
    {
      question: "Is this available 24/7?",
      answer:
        "Yes. Disasters don't wait for business hours. Our AI assistant responds instantly, and human support is available within minutes.",
    },
    {
      question: "What areas do you cover?",
      answer: "Nationwide coverage with local contractors in every major city and regional area across Australia.",
    },
    {
      question: "What if the contractor makes the damage worse?",
      answer:
        "All our contractors are certified, insured, and bonded. If anything goes wrong, we take full responsibility and make it right.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Common Questions, Clear Answers</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <Card key={index} className="mb-4 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-foreground pr-4">{faq.question}</h3>
                  {openFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>

                {openFAQ === index && (
                  <div className="px-6 pb-6 animate-slide-up">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
