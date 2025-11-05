'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AutomationSequence } from '@/lib/airtable/automation-sequences';

interface AutomationStats {
  totalSequences: number;
  activeSequences: number;
  triggeredToday: number;
  completionRate: number;
}

const AutomationDashboard: React.FC = () => {
  const [sequences, setSequences] = useState<AutomationSequence[]>([]);
  const [stats, setStats] = useState<AutomationStats>({
    totalSequences: 0,
    activeSequences: 0,
    triggeredToday: 12,
    completionRate: 87.5
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAutomationData();
  }, []);

  const loadAutomationData = async () => {
    try {
      const response = await fetch('/api/airtable/automation');
      const data = await response.json();

      if (data.success) {
        setSequences(data.data);
        setStats(prev => ({
          ...prev,
          totalSequences: data.count,
          activeSequences: data.data.filter((s: AutomationSequence) => s.isActive).length
        }));
      }
    } catch (error) {
      console.error('Failed to load automation data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSequence = async (sequenceId: string, isActive: boolean) => {
    try {
      const response = await fetch('/api/airtable/automation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sequenceId,
          updates: { isActive: !isActive }
        })
      });

      if (response.ok) {
        await loadAutomationData();
      }
    } catch (error) {
      console.error('Failed to toggle sequence:', error);
    }
  };

  const getSequenceTypeColor = (trigger: string): string => {
    const typeMap: { [key: string]: string } = {
      'lead_created_emergency': 'destructive',
      'lead_created_commercial': 'default',
      'lead_created_standard': 'secondary',
      'emergency_type_mould': 'outline',
      'lead_status_converted': 'default'
    };
    return typeMap[trigger] || 'secondary';
  };

  const getStepTypeIcon = (type: string): string => {
    const iconMap: { [key: string]: string } = {
      'email': '📧',
      'sms': '📱',
      'task': '📋',
      'delay': '⏰',
      'campaign': '📢'
    };
    return iconMap[type] || '⚙️';
  };

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-centre">
        <h2 className="text-3xl font-bold">Marketing Automation Dashboard</h2>
        <Button onClick={loadAutomationData}>
          Refresh
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">{stats.totalSequences}</div>
            <p className="text-sm text-gray-600">Total Sequences</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">{stats.activeSequences}</div>
            <p className="text-sm text-gray-600">Active Sequences</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-orange-600">{stats.triggeredToday}</div>
            <p className="text-sm text-gray-600">Triggered Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-purple-600">{stats.completionRate}%</div>
            <p className="text-sm text-gray-600">Completion Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Automation Sequences */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sequences.map((sequence) => (
          <Card key={sequence.id} className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-centre justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">
                {sequence.name}
              </CardTitle>
              <div className="flex items-centre gap-2">
                <Badge variant={getSequenceTypeColor(sequence.trigger)}>
                  {sequence.trigger.replace('_', ' ')}
                </Badge>
                <Button
                  variant={sequence.isActive ? "destructive" : "default"}
                  size="sm"
                  onClick={() => toggleSequence(sequence.id, sequence.isActive)}
                >
                  {sequence.isActive ? 'Deactivate' : 'Activate'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-centre gap-2">
                  <span className={`inline-block w-3 h-3 rounded-full ${
                    sequence.isActive ? 'bg-green-500' : 'bg-gray-400'
                  }`}></span>
                  <span className="text-sm text-gray-600">
                    {sequence.isActive ? 'Active' : 'Inactive'} • {sequence.steps.length} steps
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Automation Steps:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {sequence.steps.slice(0, 3).map((step, index) => (
                      <div key={step.id} className="flex items-centre gap-3 p-2 bg-gray-50 rounded">
                        <span className="text-lg">{getStepTypeIcon(step.type)}</span>
                        <div className="flex-1">
                          <div className="text-sm font-medium capitalize">{step.type}</div>
                          <div className="text-xs text-gray-500">
                            {step.delay ? `Delay: ${step.delay}h` : 'Immediate'}
                          </div>
                        </div>
                      </div>
                    ))}
                    {sequence.steps.length > 3 && (
                      <div className="text-xs text-gray-500 text-centre py-2">
                        +{sequence.steps.length - 3} more steps
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sequences.length === 0 && (
        <Card>
          <CardContent className="p-8 text-centre">
            <div className="text-6xl mb-4">🤖</div>
            <h3 className="text-lg font-semibold mb-2">No Automation Sequences Found</h3>
            <p className="text-gray-600">
              Marketing automation sequences will appear here once they're configured.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AutomationDashboard;