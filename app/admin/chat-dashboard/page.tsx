'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  Users,
  MessageSquare,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Phone,
  Globe,
  Star,
  Activity,
  Zap,
  Target,
  DollarSign,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Settings
} from 'lucide-react';

// Mock data for dashboard
const conversationData = [
  { time: '00:00', active: 12, completed: 8, escalated: 2 },
  { time: '04:00', active: 8, completed: 5, escalated: 1 },
  { time: '08:00', active: 25, completed: 18, escalated: 4 },
  { time: '12:00', active: 45, completed: 35, escalated: 6 },
  { time: '16:00', active: 38, completed: 28, escalated: 5 },
  { time: '20:00', active: 22, completed: 15, escalated: 3 }
];

const languageData = [
  { name: 'English', value: 75, color: '#3b82f6' },
  { name: 'Mandarin', value: 15, color: '#10b981' },
  { name: 'Arabic', value: 10, color: '#f59e0b' }
];

const serviceTypeData = [
  { service: 'Water Damage', count: 45, revenue: 125000 },
  { service: 'Fire Damage', count: 28, revenue: 95000 },
  { service: 'Mould', count: 22, revenue: 45000 },
  { service: 'Storm', count: 18, revenue: 62000 },
  { service: 'Biohazard', count: 12, revenue: 38000 }
];

const activeConversations = [
  {
    id: 'conv_001',
    customer: 'John Smith',
    status: 'active',
    urgency: 'high',
    language: 'en',
    duration: '5:23',
    agent: null,
    lastMessage: 'My basement is flooding right now!',
    sentiment: 'distressed'
  },
  {
    id: 'conv_002',
    customer: 'Sarah Chen',
    status: 'agent_handoff',
    urgency: 'medium',
    language: 'zh',
    duration: '12:45',
    agent: 'Mike Johnson',
    lastMessage: 'Need quote for water damage restoration',
    sentiment: 'neutral'
  },
  {
    id: 'conv_003',
    customer: 'Ahmed Hassan',
    status: 'active',
    urgency: 'low',
    language: 'ar',
    duration: '3:12',
    agent: null,
    lastMessage: 'What are your service areas?',
    sentiment: 'satisfied'
  }
];

export default function ChatDashboard() {
  const [refreshInterval, setRefreshInterval] = useState('30');
  const [selectedTimeRange, setSelectedTimeRange] = useState('today');
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);

  // Auto-refresh
  useEffect(() => {
    const interval = setInterval(() => {
      handleRefresh();
    }, parseInt(refreshInterval) * 1000);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleJoinConversation = (conversationId: string) => {
    // Open chat interface for agent
    window.open(`/admin/chat/${conversationId}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Chat Dashboard</h1>
            <p className="text-gray-500 mt-1">
              Real-time monitoring and management of customer conversations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
            <Select value={refreshInterval} onValueChange={setRefreshInterval}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 seconds</SelectItem>
                <SelectItem value="30">30 seconds</SelectItem>
                <SelectItem value="60">1 minute</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">
                Active Chats
              </CardTitle>
              <MessageSquare className="w-4 h-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>12% from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">
                Avg Response Time
              </CardTitle>
              <Clock className="w-4 h-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2s</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <CheckCircle className="w-3 h-3" />
              <span>Within target</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">
                Escalation Rate
              </CardTitle>
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.5%</div>
            <div className="flex items-center gap-1 text-xs text-yellow-600 mt-1">
              <Activity className="w-3 h-3" />
              <span>3 pending</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">
                Satisfaction
              </CardTitle>
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>0.2 improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">
                Conversion Rate
              </CardTitle>
              <Target className="w-4 h-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32%</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <DollarSign className="w-3 h-3" />
              <span>$45K revenue</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="conversations">Active Conversations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Conversation Volume Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Conversation Volume</CardTitle>
                <CardDescription>Hourly breakdown of chat activity</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={conversationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="active"
                      stroke="#3b82f6"
                      name="Active"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="completed"
                      stroke="#10b981"
                      name="Completed"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="escalated"
                      stroke="#f59e0b"
                      name="Escalated"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Language Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Language Distribution</CardTitle>
                <CardDescription>Conversations by language</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={languageData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {languageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Service Type Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Service Inquiries</CardTitle>
                <CardDescription>Top services discussed in chats</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={serviceTypeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="service" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#3b82f6" name="Conversations" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Real-time Activity Feed */}
            <Card>
              <CardHeader>
                <CardTitle>Activity Feed</CardTitle>
                <CardDescription>Latest conversation events</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[250px]">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">New conversation started</p>
                        <p className="text-xs text-gray-500">John Smith - Water damage inquiry</p>
                        <p className="text-xs text-gray-400">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Escalation requested</p>
                        <p className="text-xs text-gray-500">Sarah Chen - Complex insurance case</p>
                        <p className="text-xs text-gray-400">5 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Quote generated</p>
                        <p className="text-xs text-gray-500">$5,500 - Fire damage restoration</p>
                        <p className="text-xs text-gray-400">8 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Appointment scheduled</p>
                        <p className="text-xs text-gray-500">Tomorrow 9:00 AM - Mould inspection</p>
                        <p className="text-xs text-gray-400">12 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Positive feedback received</p>
                        <p className="text-xs text-gray-500">5-star rating from Mike Wilson</p>
                        <p className="text-xs text-gray-400">15 minutes ago</p>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversations" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Active Conversations</CardTitle>
                  <CardDescription>
                    Monitor and join ongoing customer chats
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default">38 Active</Badge>
                  <Badge variant="secondary">12 Queued</Badge>
                  <Badge variant="destructive">3 Urgent</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Urgency</TableHead>
                    <TableHead>Language</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Last Message</TableHead>
                    <TableHead>Sentiment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeConversations.map((conv) => (
                    <TableRow key={conv.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>
                              {conv.customer.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {conv.customer}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          conv.status === 'agent_handoff' ? 'default' :
                          conv.status === 'active' ? 'secondary' : 'outline'
                        }>
                          {conv.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          conv.urgency === 'high' ? 'destructive' :
                          conv.urgency === 'medium' ? 'default' : 'secondary'
                        }>
                          {conv.urgency}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          {conv.language.toUpperCase()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {conv.duration}
                        </div>
                      </TableCell>
                      <TableCell>
                        {conv.agent || '-'}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {conv.lastMessage}
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          conv.sentiment === 'distressed' ? 'destructive' :
                          conv.sentiment === 'frustrated' ? 'default' :
                          conv.sentiment === 'satisfied' ? 'secondary' : 'outline'
                        }>
                          {conv.sentiment}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          onClick={() => handleJoinConversation(conv.id)}
                        >
                          Join
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Intent Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Top Customer Intents</CardTitle>
                <CardDescription>Most common conversation topics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { intent: 'Request Service', count: 156, percent: 35 },
                    { intent: 'Get Quote', count: 98, percent: 22 },
                    { intent: 'Emergency Help', count: 67, percent: 15 },
                    { intent: 'Insurance Question', count: 54, percent: 12 },
                    { intent: 'Check Status', count: 45, percent: 10 },
                    { intent: 'General Inquiry', count: 27, percent: 6 }
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{item.intent}</span>
                        <span className="text-sm text-gray-500">{item.count}</span>
                      </div>
                      <Progress value={item.percent} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Conversion Funnel */}
            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
                <CardDescription>Chat to booking conversion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                    <span className="font-medium">Chat Started</span>
                    <span className="font-bold">450</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-100 rounded" style={{ width: '85%' }}>
                    <span className="font-medium">Engaged</span>
                    <span className="font-bold">383</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-200 rounded" style={{ width: '60%' }}>
                    <span className="font-medium">Quote Requested</span>
                    <span className="font-bold">270</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-300 rounded" style={{ width: '40%' }}>
                    <span className="font-medium">Appointment Booked</span>
                    <span className="font-bold">180</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-400 text-white rounded" style={{ width: '32%' }}>
                    <span className="font-medium">Converted</span>
                    <span className="font-bold">144</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="agents" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Agent Performance</CardTitle>
              <CardDescription>Real-time agent metrics and availability</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Active Chats</TableHead>
                    <TableHead>Completed Today</TableHead>
                    <TableHead>Avg Response</TableHead>
                    <TableHead>Satisfaction</TableHead>
                    <TableHead>Specialization</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>MJ</AvatarFallback>
                        </Avatar>
                        Mike Johnson
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default" className="bg-green-500">Available</Badge>
                    </TableCell>
                    <TableCell>3/5</TableCell>
                    <TableCell>28</TableCell>
                    <TableCell>45s</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        4.9
                      </div>
                    </TableCell>
                    <TableCell>Water Damage</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        Sarah Chen
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default" className="bg-yellow-500">Busy</Badge>
                    </TableCell>
                    <TableCell>5/5</TableCell>
                    <TableCell>32</TableCell>
                    <TableCell>38s</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        4.8
                      </div>
                    </TableCell>
                    <TableCell>Insurance Claims</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>AH</AvatarFallback>
                        </Avatar>
                        Ahmed Hassan
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">Break</Badge>
                    </TableCell>
                    <TableCell>0/5</TableCell>
                    <TableCell>18</TableCell>
                    <TableCell>52s</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        4.7
                      </div>
                    </TableCell>
                    <TableCell>Fire Damage</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}