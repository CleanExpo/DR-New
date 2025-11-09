'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  AlertTriangle,
  Home,
  Building,
  Droplets,
  Wind,
  Calendar,
  Clock,
  Users,
  Heart,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  FileText,
  Phone,
  BarChart
} from 'lucide-react'

interface QuizQuestion {
  id: string
  question: string
  category: string
  icon: React.ElementType
  options: {
    value: string
    label: string
    points: number
  }[]
  helpText?: string
}

interface QuizResult {
  score: number
  maxScore: number
  riskLevel: 'low' | 'moderate' | 'high' | 'critical'
  category: string
  title: string
  description: string
  recommendations: string[]
  urgency: string
}

const HealthQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null)

  const questions: QuizQuestion[] = [
    {
      id: 'location',
      question: 'What type of building are you experiencing symptoms in?',
      category: 'Environment',
      icon: Building,
      options: [
        { value: 'home', label: 'Residential home', points: 2 },
        { value: 'apartment', label: 'Apartment/Unit', points: 3 },
        { value: 'office', label: 'Office building', points: 4 },
        { value: 'school', label: 'School/Educational facility', points: 3 },
        { value: 'multiple', label: 'Multiple locations', points: 5 }
      ]
    },
    {
      id: 'water_damage',
      question: 'Has the building experienced water damage or leaks?',
      category: 'Water History',
      icon: Droplets,
      options: [
        { value: 'never', label: 'Never/Not aware of any', points: 0 },
        { value: 'minor', label: 'Minor leak (fixed quickly)', points: 2 },
        { value: 'major', label: 'Major leak or flooding', points: 5 },
        { value: 'recurring', label: 'Recurring water issues', points: 6 },
        { value: 'unknown', label: 'Unknown/Unsure', points: 3 }
      ],
      helpText: 'Water damage is the primary cause of mould growth and indoor air quality issues'
    },
    {
      id: 'visible_mould',
      question: 'Do you see or smell mould in the building?',
      category: 'Mould Presence',
      icon: AlertTriangle,
      options: [
        { value: 'none', label: 'No visible mould or odor', points: 0 },
        { value: 'smell', label: 'Musty smell but no visible mould', points: 4 },
        { value: 'small', label: 'Small visible patches (<1 sq ft)', points: 5 },
        { value: 'large', label: 'Large areas of visible mould', points: 8 },
        { value: 'both', label: 'Both smell and visible mould', points: 9 }
      ]
    },
    {
      id: 'symptom_timing',
      question: 'When do your symptoms occur or worsen?',
      category: 'Symptom Pattern',
      icon: Clock,
      options: [
        { value: 'constant', label: 'Constant, regardless of location', points: 2 },
        { value: 'building', label: 'Only in specific building', points: 6 },
        { value: 'improve', label: 'Improve when away from building', points: 7 },
        { value: 'seasonal', label: 'Seasonal pattern', points: 3 },
        { value: 'recent', label: 'Started after recent event', points: 5 }
      ],
      helpText: 'Symptoms that improve when away from a building strongly suggest environmental causes'
    },
    {
      id: 'duration',
      question: 'How long have you been experiencing symptoms?',
      category: 'Duration',
      icon: Calendar,
      options: [
        { value: 'weeks', label: 'Less than 1 month', points: 2 },
        { value: 'months', label: '1-6 months', points: 4 },
        { value: 'year', label: '6-12 months', points: 6 },
        { value: 'years', label: 'More than 1 year', points: 8 },
        { value: 'intermittent', label: 'On and off for years', points: 7 }
      ]
    },
    {
      id: 'affected_people',
      question: 'Are others in the building experiencing similar symptoms?',
      category: 'Affected Population',
      icon: Users,
      options: [
        { value: 'just_me', label: 'Just me', points: 2 },
        { value: 'family', label: 'Family members/roommates', points: 5 },
        { value: 'many', label: 'Many people in building', points: 8 },
        { value: 'pets', label: 'Even pets are affected', points: 7 },
        { value: 'unknown', label: 'Not sure', points: 3 }
      ]
    },
    {
      id: 'ventilation',
      question: 'How would you describe the building\'s ventilation?',
      category: 'Air Quality',
      icon: Wind,
      options: [
        { value: 'excellent', label: 'Excellent - fresh air, good flow', points: 0 },
        { value: 'good', label: 'Good - adequate ventilation', points: 1 },
        { value: 'poor', label: 'Poor - stuffy, stale air', points: 4 },
        { value: 'terrible', label: 'Very poor - no air movement', points: 6 },
        { value: 'chemical', label: 'Chemical odors present', points: 7 }
      ]
    },
    {
      id: 'health_impact',
      question: 'How severely are symptoms impacting your daily life?',
      category: 'Impact',
      icon: Heart,
      options: [
        { value: 'minimal', label: 'Minimal - minor inconvenience', points: 1 },
        { value: 'moderate', label: 'Moderate - affecting productivity', points: 3 },
        { value: 'significant', label: 'Significant - missing work/school', points: 5 },
        { value: 'severe', label: 'Severe - considering relocation', points: 7 },
        { value: 'critical', label: 'Critical - emergency medical care needed', points: 10 }
      ]
    },
    {
      id: 'previous_testing',
      question: 'Has the building been tested for environmental hazards?',
      category: 'Testing History',
      icon: BarChart,
      options: [
        { value: 'never', label: 'Never tested', points: 4 },
        { value: 'basic', label: 'Basic testing done', points: 2 },
        { value: 'comprehensive', label: 'Comprehensive testing completed', points: 0 },
        { value: 'issues_found', label: 'Testing found issues (not fixed)', points: 8 },
        { value: 'unknown', label: 'Don\'t know', points: 3 }
      ]
    },
    {
      id: 'remediation',
      question: 'Have any remediation efforts been attempted?',
      category: 'Remediation',
      icon: CheckCircle,
      options: [
        { value: 'none', label: 'No remediation attempted', points: 5 },
        { value: 'diy', label: 'DIY cleaning attempted', points: 6 },
        { value: 'professional', label: 'Professional remediation done', points: 1 },
        { value: 'failed', label: 'Remediation failed/symptoms persist', points: 9 },
        { value: 'partial', label: 'Partial remediation only', points: 4 }
      ]
    }
  ]

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value })
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResults()
    }
  }

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateResults = () => {
    let totalScore = 0
    const maxPossibleScore = questions.reduce((max, q) => {
      return max + Math.max(...q.options.map(o => o.points))
    }, 0)

    questions.forEach(question => {
      const answer = answers[question.id]
      if (answer) {
        const option = question.options.find(o => o.value === answer)
        if (option) {
          totalScore += option.points
        }
      }
    })

    const percentage = (totalScore / maxPossibleScore) * 100
    let riskLevel: QuizResult['riskLevel']
    let category: string
    let title: string
    let description: string
    let recommendations: string[]
    let urgency: string

    if (percentage >= 70) {
      riskLevel = 'critical'
      category = 'Critical Environmental Hazard'
      title = 'Immediate Action Required'
      description = 'Your responses indicate severe environmental health hazards that require immediate professional intervention.'
      recommendations = [
        'Evacuate if experiencing severe symptoms',
        'Schedule emergency environmental testing within 24-48 hours',
        'Document all symptoms and seek medical attention',
        'Contact insurance company about potential claim',
        'Consider temporary relocation until remediation complete'
      ]
      urgency = 'URGENT: Contact us immediately for emergency response'
    } else if (percentage >= 50) {
      riskLevel = 'high'
      category = 'High Environmental Risk'
      title = 'Professional Testing Strongly Recommended'
      description = 'Your building likely has significant environmental health hazards requiring professional assessment.'
      recommendations = [
        'Schedule comprehensive environmental testing this week',
        'Begin documenting symptoms and patterns',
        'Consult with environmental medicine specialist',
        'Improve ventilation immediately if possible',
        'Avoid affected areas when feasible'
      ]
      urgency = 'Schedule professional testing within 3-5 days'
    } else if (percentage >= 30) {
      riskLevel = 'moderate'
      category = 'Moderate Environmental Concerns'
      title = 'Further Investigation Recommended'
      description = 'Your responses suggest potential environmental issues that warrant professional evaluation.'
      recommendations = [
        'Schedule air quality testing',
        'Inspect for hidden water damage',
        'Monitor symptom patterns',
        'Improve building ventilation',
        'Consider HEPA air purification'
      ]
      urgency = 'Professional assessment recommended within 2 weeks'
    } else {
      riskLevel = 'low'
      category = 'Low Environmental Risk'
      title = 'Continue Monitoring'
      description = 'Your responses indicate minimal environmental health risks, but continued awareness is important.'
      recommendations = [
        'Maintain good ventilation practices',
        'Address any water leaks immediately',
        'Monitor for changes in symptoms',
        'Consider basic air quality monitoring',
        'Annual environmental health check recommended'
      ]
      urgency = 'No immediate action required'
    }

    setQuizResult({
      score: totalScore,
      maxScore: maxPossibleScore,
      riskLevel,
      category,
      title,
      description,
      recommendations,
      urgency
    })
    setShowResults(true)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setQuizResult(null)
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-700'
      case 'high': return 'bg-orange-600'
      case 'moderate': return 'bg-yellow-600'
      default: return 'bg-green-600'
    }
  }

  const getRiskBgColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-50 border-red-200'
      case 'high': return 'bg-orange-50 border-orange-200'
      case 'moderate': return 'bg-yellow-50 border-yellow-200'
      default: return 'bg-green-50 border-green-200'
    }
  }

  if (showResults && quizResult) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Building Health Assessment Results</CardTitle>
          <CardDescription>
            Your personalized environmental risk assessment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className={`p-6 rounded-lg border-2 ${getRiskBgColor(quizResult.riskLevel)}`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`px-4 py-2 rounded-full text-white font-semibold ${getRiskColor(quizResult.riskLevel)}`}>
                  {quizResult.category}
                </span>
                <span className="text-2xl font-bold">
                  {Math.round((quizResult.score / quizResult.maxScore) * 100)}% Risk Score
                </span>
              </div>

              <Progress
                value={(quizResult.score / quizResult.maxScore) * 100}
                className="h-4"
              />

              <div>
                <h3 className="text-xl font-semibold mb-2">{quizResult.title}</h3>
                <p className="text-gray-700">{quizResult.description}</p>
              </div>

              <Alert className={`${getRiskBgColor(quizResult.riskLevel)} border-2`}>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Action Required</AlertTitle>
                <AlertDescription className="font-semibold">
                  {quizResult.urgency}
                </AlertDescription>
              </Alert>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Recommended Actions:</h3>
            <ol className="space-y-2">
              {quizResult.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <span className="font-semibold mr-2">{index + 1}.</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap gap-4">
            {(quizResult.riskLevel === 'critical' || quizResult.riskLevel === 'high') && (
              <Button
                size="lg"
                className="bg-red-700 hover:bg-red-800"
                onClick={() => window.location.href = 'tel:1300-DISASTER'}
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Emergency Response
              </Button>
            )}
            <Button
              size="lg"
              variant={quizResult.riskLevel === 'critical' ? 'outline' : 'default'}
              className={quizResult.riskLevel !== 'critical' ? 'bg-orange-600 hover:bg-orange-700' : ''}
            >
              Schedule Assessment
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.print()}
            >
              <FileText className="mr-2 h-5 w-5" />
              Print Results
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={resetQuiz}
            >
              Retake Quiz
            </Button>
          </div>

          <div className="pt-6 border-t">
            <h3 className="font-semibold mb-3">Your Responses:</h3>
            <div className="space-y-2 text-sm">
              {questions.map((q, index) => {
                const answer = answers[q.id]
                const option = q.options.find(o => o.value === answer)
                return (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-600">{q.question}</span>
                    <span className="font-medium">{option?.label || 'Not answered'}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Building Health Assessment Quiz</CardTitle>
        <CardDescription>
          Answer these questions to assess potential environmental health hazards in your building
        </CardDescription>
        <Progress value={progress} className="mt-4" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <currentQ.icon className="h-6 w-6 text-orange-600 mr-3" />
            <span className="text-sm font-medium text-gray-500">
              Question {currentQuestion + 1} of {questions.length} - {currentQ.category}
            </span>
          </div>

          <h3 className="text-xl font-semibold">{currentQ.question}</h3>

          {currentQ.helpText && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{currentQ.helpText}</AlertDescription>
            </Alert>
          )}

          <RadioGroup
            value={answers[currentQ.id] || ''}
            onValueChange={handleAnswer}
            className="space-y-3"
          >
            {currentQ.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label
                  htmlFor={option.value}
                  className="flex-1 cursor-pointer py-2"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <Button
            onClick={nextQuestion}
            disabled={!answers[currentQ.id]}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default HealthQuiz