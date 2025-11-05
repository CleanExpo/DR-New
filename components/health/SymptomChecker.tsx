'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  AlertTriangle,
  Brain,
  Eye,
  Heart,
  Wind,
  Droplets,
  Activity,
  ThermometerSun,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  FileText,
  Phone
} from 'lucide-react'

interface SymptomCategory {
  name: string
  icon: React.ElementType
  symptoms: string[]
}

interface RiskAssessment {
  level: 'low' | 'moderate' | 'high' | 'critical'
  percentage: number
  message: string
  recommendations: string[]
}

const SymptomChecker: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(new Set())
  const [showResults, setShowResults] = useState(false)
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessment | null>(null)

  const symptomCategories: SymptomCategory[] = [
    {
      name: 'Respiratory',
      icon: Wind,
      symptoms: [
        'Persistent cough',
        'Shortness of breath',
        'Wheezing',
        'Sinus congestion',
        'Throat irritation',
        'Chest tightness',
        'Frequent respiratory infections',
        'Asthma exacerbation'
      ]
    },
    {
      name: 'Neurological',
      icon: Brain,
      symptoms: [
        'Chronic headaches',
        'Dizziness/vertigo',
        'Memory problems',
        'Difficulty concentrating',
        'Brain fog',
        'Mood changes',
        'Anxiety/depression',
        'Numbness/tingling'
      ]
    },
    {
      name: 'Systemic',
      icon: Activity,
      symptoms: [
        'Chronic fatigue',
        'Joint pain',
        'Muscle aches',
        'Fever/chills',
        'Night sweats',
        'Weight changes',
        'Swollen lymph nodes',
        'General malaise'
      ]
    },
    {
      name: 'Dermatological',
      icon: ThermometerSun,
      symptoms: [
        'Skin rashes',
        'Itching',
        'Hives',
        'Eczema flare-ups',
        'Dry/irritated skin',
        'Hair loss',
        'Nail changes',
        'Skin sensitivity'
      ]
    },
    {
      name: 'Ocular',
      icon: Eye,
      symptoms: [
        'Eye irritation',
        'Blurred vision',
        'Light sensitivity',
        'Watery eyes',
        'Red/bloodshot eyes',
        'Eye fatigue',
        'Burning sensation',
        'Vision changes'
      ]
    },
    {
      name: 'Gastrointestinal',
      icon: Droplets,
      symptoms: [
        'Nausea',
        'Abdominal pain',
        'Diarrhea',
        'Constipation',
        'Bloating',
        'Loss of appetite',
        'Food sensitivities',
        'Digestive issues'
      ]
    }
  ]

  const handleSymptomToggle = (symptom: string) => {
    const newSelection = new Set(selectedSymptoms)
    if (newSelection.has(symptom)) {
      newSelection.delete(symptom)
    } else {
      newSelection.add(symptom)
    }
    setSelectedSymptoms(newSelection)
  }

  const calculateRiskAssessment = (): RiskAssessment => {
    const totalSymptoms = selectedSymptoms.size
    const categories = new Set<string>()

    symptomCategories.forEach(category => {
      category.symptoms.forEach(symptom => {
        if (selectedSymptoms.has(symptom)) {
          categories.add(category.name)
        }
      })
    })

    const categoryCount = categories.size

    // Risk calculation logic
    if (totalSymptoms === 0) {
      return {
        level: 'low',
        percentage: 0,
        message: 'No symptoms selected',
        recommendations: ['Continue monitoring your health']
      }
    }

    if (totalSymptoms >= 15 || categoryCount >= 4) {
      return {
        level: 'critical',
        percentage: 90,
        message: 'Critical environmental health risk detected',
        recommendations: [
          'Immediate professional environmental testing required',
          'Consult with healthcare provider urgently',
          'Consider temporary relocation if symptoms are severe',
          'Document all symptoms for medical consultation'
        ]
      }
    }

    if (totalSymptoms >= 10 || categoryCount >= 3) {
      return {
        level: 'high',
        percentage: 70,
        message: 'High probability of environmental health issues',
        recommendations: [
          'Schedule comprehensive environmental testing',
          'Consult with environmental medicine specialist',
          'Begin symptom diary with location tracking',
          'Check for visible water damage or mould'
        ]
      }
    }

    if (totalSymptoms >= 5 || categoryCount >= 2) {
      return {
        level: 'moderate',
        percentage: 45,
        message: 'Moderate environmental health concerns',
        recommendations: [
          'Consider professional air quality testing',
          'Monitor symptom patterns and triggers',
          'Improve ventilation in living/working spaces',
          'Discuss symptoms with your doctor'
        ]
      }
    }

    return {
      level: 'low',
      percentage: 20,
      message: 'Low environmental risk, continue monitoring',
      recommendations: [
        'Track if symptoms worsen or persist',
        'Maintain good indoor air quality practices',
        'Consider basic air quality monitoring',
        'Stay aware of environmental changes'
      ]
    }
  }

  const analyzeSymptoms = () => {
    const assessment = calculateRiskAssessment()
    setRiskAssessment(assessment)
    setShowResults(true)
  }

  const resetChecker = () => {
    setSelectedSymptoms(new Set())
    setShowResults(false)
    setRiskAssessment(null)
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200'
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      default: return 'text-green-600 bg-green-50 border-green-200'
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'critical': return <AlertTriangle className="h-6 w-6" />
      case 'high': return <AlertCircle className="h-6 w-6" />
      case 'moderate': return <Activity className="h-6 w-6" />
      default: return <CheckCircle className="h-6 w-6" />
    }
  }

  if (showResults && riskAssessment) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Environmental Health Risk Assessment</CardTitle>
          <CardDescription>
            Based on your selected symptoms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className={`p-6 rounded-lg border-2 ${getRiskColor(riskAssessment.level)}`}>
            <div className="flex items-centre justify-between mb-4">
              <div className="flex items-centre">
                {getRiskIcon(riskAssessment.level)}
                <span className="ml-3 text-xl font-semibold capitalize">
                  {riskAssessment.level} Risk Level
                </span>
              </div>
              <span className="text-2xl font-bold">{riskAssessment.percentage}%</span>
            </div>

            <Progress value={riskAssessment.percentage} className="mb-4 h-3" />

            <p className="text-lg mb-4">{riskAssessment.message}</p>

            <div className="space-y-3">
              <p className="font-semibold">Recommended Actions:</p>
              {riskAssessment.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start">
                  <ChevronRight className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Important Notice</AlertTitle>
            <AlertDescription>
              This assessment is for informational purposes only and should not replace
              professional medical advice. Always consult with qualified healthcare providers
              and environmental specialists for proper diagnosis and treatment.
            </AlertDescription>
          </Alert>

          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-orange-600 hover:bg-orange-700"
              onClick={() => window.location.href = 'tel:1300-DISASTER'}
            >
              <Phone className="mr-2 h-5 w-5" />
              Call for Testing
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.print()}
            >
              <FileText className="mr-2 h-5 w-5" />
              Print Report
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={resetChecker}
            >
              Start Over
            </Button>
          </div>

          <div className="pt-6 border-t">
            <h3 className="font-semibold mb-3">Selected Symptoms ({selectedSymptoms.size}):</h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(selectedSymptoms).map((symptom, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {symptom}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Environmental Symptom Checker</CardTitle>
        <CardDescription>
          Select all symptoms you or your family members have been experiencing.
          This tool helps identify potential environmental health hazards in your building.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {symptomCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-3">
            <div className="flex items-centre mb-3">
              <category.icon className="h-5 w-5 text-orange-600 mr-2" />
              <h3 className="font-semibold text-lg">{category.name} Symptoms</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              {category.symptoms.map((symptom, symptomIndex) => (
                <div key={symptomIndex} className="flex items-centre space-x-2">
                  <Checkbox
                    id={`${category.name}-${symptomIndex}`}
                    checked={selectedSymptoms.has(symptom)}
                    onCheckedChange={() => handleSymptomToggle(symptom)}
                  />
                  <Label
                    htmlFor={`${category.name}-${symptomIndex}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {symptom}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-6 border-t">
          <div className="flex items-centre justify-between mb-4">
            <span className="text-sm text-gray-600">
              {selectedSymptoms.size} symptom{selectedSymptoms.size !== 1 ? 's' : ''} selected
            </span>
            {selectedSymptoms.size > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedSymptoms(new Set())}
              >
                Clear All
              </Button>
            )}
          </div>

          <Button
            size="lg"
            className="w-full bg-orange-600 hover:bg-orange-700"
            disabled={selectedSymptoms.size === 0}
            onClick={analyzeSymptoms}
          >
            analyse Symptoms
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Privacy Notice</AlertTitle>
          <AlertDescription>
            Your symptom data is processed locally and is not stored or transmitted.
            This tool provides general guidance only.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}

export default SymptomChecker