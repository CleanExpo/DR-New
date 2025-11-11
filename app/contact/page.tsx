"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, Send, AlertCircle } from "lucide-react"
import { Footer } from "@/components/footer"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Have questions? Need emergency assistance? Our IICRC Master Restorer team is ready to help 24/7/365.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <a
                href="tel:+611300309361"
                className="inline-flex items-center justify-center h-10 rounded-md px-8 py-6 bg-white text-blue-600 hover:bg-gray-100 font-semibold text-lg"
              >
                <Phone className="mr-2 h-5 w-5" />
                Emergency: +61 1300 309 361
              </a>
            </div>
            <p className="text-sm text-blue-200 pt-4">
              Available 24/7/365 • 60-minute response in Brisbane CBD
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Emergency Contact */}
              <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-red-100 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-red-600" />
                    </div>
                    <CardTitle className="text-xl">Emergency Response</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-3">Call immediately for emergency assistance</p>
                  <a 
                    href="tel:+611300309361" 
                    className="text-3xl font-bold text-red-600 hover:text-red-700 transition-colors block mb-2"
                  >
                    +61 1300 309 361
                  </a>
                  <p className="text-sm text-gray-500">Available 24/7/365</p>
                  <p className="text-sm text-gray-500 mt-2">60-min response Brisbane CBD</p>
                </CardContent>
              </Card>

              {/* General Inquiries */}
              <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">General Inquiries</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-3">Email us for non-emergency questions</p>
                  <a 
                    href="mailto:contact@disasterrecovery.com.au" 
                    className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors block mb-2 break-all"
                  >
                    contact@disasterrecovery.com.au
                  </a>
                  <p className="text-sm text-gray-500">Response within 2 hours</p>
                  <p className="text-sm text-gray-500 mt-2">Monday - Friday: 8AM - 5PM</p>
                </CardContent>
              </Card>

              {/* Service Area */}
              <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">Service Area</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-3">Primary coverage areas</p>
                  <p className="font-semibold text-gray-900 mb-2">Brisbane • Ipswich • Logan</p>
                  <p className="text-sm text-gray-500">60 min response in Brisbane CBD</p>
                  <p className="text-sm text-gray-500 mt-2">90 min response metro-wide</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl font-bold mb-2">Send us a Message</CardTitle>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible. For emergencies, please call 1300 309 361 immediately.
                </p>
              </CardHeader>
              <CardContent>
                {submitted && (
                  <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mb-6">
                    <p className="font-semibold">Thank you! Your message has been sent successfully.</p>
                    <p className="text-sm mt-1">We'll respond within 2 hours during business hours.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="07 1234 5678"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a subject</option>
                        <option value="Water Damage">Water Damage Recovery</option>
                        <option value="Fire Damage">Fire Damage Restoration</option>
                        <option value="Storm Damage">Storm Damage</option>
                        <option value="Mould Remediation">Mould Remediation</option>
                        <option value="Sewage Backup">Sewage Backup</option>
                        <option value="Insurance Help">Insurance Claim Assistance</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Please describe your situation, location, and any immediate concerns..."
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-900">
                        <strong>Emergency?</strong> Don't wait for a response. Call <a href="tel:+611300309361" className="font-semibold underline">1300 309 361</a> immediately for 24/7 emergency assistance.
                      </p>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-6"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="h-8 w-8 text-blue-600" />
                  <CardTitle className="text-2xl">Business Hours</CardTitle>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="font-bold text-gray-900 mb-2 text-lg">Emergency Services</p>
                    <p className="text-gray-700 mb-2">24 hours a day, 7 days a week, 365 days a year</p>
                    <p className="text-blue-600 font-semibold">Always Available</p>
                    <p className="text-sm text-gray-600 mt-2">60-minute response in Brisbane CBD</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-2 text-lg">Office Hours (Non-Emergency)</p>
                    <p className="text-gray-700 mb-2">Monday - Friday: 8:00 AM - 5:00 PM</p>
                    <p className="text-gray-700 mb-2">Saturday - Sunday: On-call for emergencies</p>
                    <p className="text-sm text-gray-600 mt-2">Email responses within 2 hours during business hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Coverage */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Service Coverage & Response Times</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our guaranteed response times across Brisbane, Ipswich, and Logan
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">Brisbane CBD & Inner Suburbs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-gray-900 mb-2">60 Minutes</p>
                  <p className="text-sm font-semibold text-gray-500 mb-3">Response Time</p>
                  <p className="text-gray-700 mb-2">
                    <strong>Coverage:</strong> Full city coverage with priority dispatch
                  </p>
                  <p className="text-sm text-gray-600">
                    Hamilton, Ascot, New Farm, Toowong, Paddington, Bulimba, Brisbane CBD, West End, Fortitude Valley, Milton
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">Greater Brisbane & Ipswich</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-gray-900 mb-2">90 Minutes</p>
                  <p className="text-sm font-semibold text-gray-500 mb-3">Response Time</p>
                  <p className="text-gray-700 mb-2">
                    <strong>Coverage:</strong> All Brisbane suburbs and Ipswich region
                  </p>
                  <p className="text-sm text-gray-600">
                    Chermside, Carindale, Mt Gravatt, Indooroopilly, Ipswich CBD, Springfield Central, Karalee, Brookwater
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">Logan & Surrounding Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-gray-900 mb-2">90 Minutes</p>
                  <p className="text-sm font-semibold text-gray-500 mb-3">Response Time</p>
                  <p className="text-gray-700 mb-2">
                    <strong>Coverage:</strong> Logan area and surrounding regions
                  </p>
                  <p className="text-sm text-gray-600">
                    Logan Central, Springwood, Shailer Park, Browns Plains, Woodridge, Loganholme, Beenleigh, Eagleby
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-red-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              Emergency? Don't Wait - Call Now!
            </h2>
            <p className="text-xl text-red-100">
              For water damage, fire, storm, or mould emergencies, every minute counts. Our Master Restorer team responds within 60 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+611300309361"
                className="inline-flex items-center justify-center h-10 rounded-md px-8 py-6 bg-white text-red-600 hover:bg-gray-100 font-semibold text-lg"
              >
                <Phone className="mr-2 h-5 w-5" />
                Emergency: 1300 309 361
              </a>
            </div>
            <p className="text-sm text-red-200 pt-4">
              Available 24/7/365 • 60-minute response Brisbane CBD • 90-minute response metro-wide
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
