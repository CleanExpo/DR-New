'use client'

import { useEffect, useState } from 'react'
import { masterIntegration } from '@/lib/integration/master-integration'

export default function MasterIntegrationProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [isReady, setIsReady] = useState(false)
  const [status, setStatus] = useState<Map<string, boolean>>(new Map())

  useEffect(() => {
    const initializeIntegration = async () => {
      try {
        await masterIntegration.initialize()
        setIsReady(masterIntegration.isReady())
        setStatus(masterIntegration.getStatus())
      } catch (error) {
        console.error('Failed to initialize master integration:', error)
      }
    }

    initializeIntegration()

    // Listen for integration ready event
    const handleIntegrationReady = (event: CustomEvent) => {
      setIsReady(true)
      setStatus(masterIntegration.getStatus())
      console.log('🎉 World-class integration activated!', event.detail)
    }

    window.addEventListener('integration:ready' as any, handleIntegrationReady)

    return () => {
      window.removeEventListener('integration:ready' as any, handleIntegrationReady)
    }
  }, [])

  // Show integration status in development
  if (process.env.NODE_ENV === 'development' && !isReady) {
    return (
      <>
        <div className="fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-2 text-center text-sm">
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            <span>Initializing World-Class Systems...</span>
          </div>
        </div>
        {children}
      </>
    )
  }

  return (
    <>
      {/* Integration Status Indicator (Development Only) */}
      {process.env.NODE_ENV === 'development' && isReady && (
        <div className="fixed bottom-4 right-4 z-[9998]">
          <div className="bg-white rounded-lg shadow-lg p-3 text-xs">
            <div className="font-semibold mb-2 text-green-600">✅ World-Class Systems Active</div>
            <div className="space-y-1">
              {Array.from(status.entries()).map(([service, active]) => (
                <div key={service} className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${active ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="capitalize">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  )
}