'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResponseTeam {
  id: string;
  name: string;
  status: 'available' | 'responding' | 'on-site';
  location: string;
  eta?: number;
  specialty: string;
}

interface ActiveIncident {
  id: string;
  type: string;
  location: string;
  status: 'new' | 'responding' | 'in-progress' | 'completed';
  time: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  team?: string;
}

export default function EmergencyTracker() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [responseTeams, setResponseTeams] = useState<ResponseTeam[]>([
    { id: '1', name: 'Alpha Team', status: 'available', location: 'Brisbane CBD', specialty: 'Water Damage' },
    { id: '2', name: 'Bravo Team', status: 'responding', location: 'Ipswich', eta: 15, specialty: 'Fire Restoration' },
    { id: '3', name: 'Charlie Team', status: 'on-site', location: 'Logan', specialty: 'Mould Remediation' },
    { id: '4', name: 'Delta Team', status: 'available', location: 'Wacol HQ', specialty: 'Multi-Service' },
  ]);

  const [activeIncidents, setActiveIncidents] = useState<ActiveIncident[]>([
    { id: '1', type: 'Flood Emergency', location: 'Spring Hill', status: 'responding', time: '14:23', severity: 'high', team: 'Alpha Team' },
    { id: '2', type: 'Fire Damage', location: 'Ipswich Central', status: 'in-progress', time: '13:45', severity: 'critical', team: 'Bravo Team' },
    { id: '3', type: 'Storm Damage', location: 'Logan Central', status: 'in-progress', time: '12:30', severity: 'medium', team: 'Charlie Team' },
  ]);

  const [showLiveUpdate, setShowLiveUpdate] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Simulate live updates
    const updateTimer = setInterval(() => {
      setShowLiveUpdate(true);
      setTimeout(() => setShowLiveUpdate(false), 3000);

      // Simulate team status changes
      setResponseTeams(prev => prev.map(team => {
        if (Math.random() > 0.8) {
          const statuses: ResponseTeam['status'][] = ['available', 'responding', 'on-site'];
          const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
          return { ...team, status: newStatus, eta: newStatus === 'responding' ? Math.floor(Math.random() * 30) + 10 : undefined };
        }
        return team;
      }));
    }, 15000);

    return () => {
      clearInterval(timer);
      clearInterval(updateTimer);
    };
  }, []);

  const getSeverityColor = (severity: ActiveIncident['severity']) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
    }
  };

  const getStatusColor = (status: ResponseTeam['status']) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'responding': return 'bg-yellow-500';
      case 'on-site': return 'bg-blue-500';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Scanning Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent"
        animate={{ y: [-100, 1000] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-red-500/20 border border-red-500/50 rounded-full px-4 py-2 mb-4">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-red-400 font-semibold text-sm">LIVE RESPONSE TRACKER</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Real-Time Emergency Operations
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Track our response teams in real-time as they respond to emergencies across Brisbane, Ipswich, and Logan
          </p>
        </motion.div>

        {/* Live Time Display */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-blue-500/20 border border-blue-500/50 rounded-lg px-6 py-3">
            <svg className="w-5 h-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className="text-blue-400 font-mono text-lg">
              {currentTime.toLocaleTimeString('en-AU', { timeZone: 'Australia/Brisbane' })} AEST
            </span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Response Teams Status */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Response Teams</h3>
              <AnimatePresence>
                {showLiveUpdate && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="bg-green-500 text-white text-xs px-2 py-1 rounded-full"
                  >
                    UPDATED
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-4">
              {responseTeams.map((team) => (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 rounded-xl p-4 border border-white/10"
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(team.status)} animate-pulse`} />
                      <span className="text-white font-semibold">{team.name}</span>
                    </div>
                    <span className="text-sm text-gray-400">{team.specialty}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">
                      <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {team.location}
                    </span>
                    {team.eta && (
                      <span className="text-yellow-400 font-semibold">
                        ETA: {team.eta} min
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      team.status === 'available' ? 'bg-green-500/20 text-green-400' :
                      team.status === 'responding' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {team.status.toUpperCase()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Active Incidents */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Active Incidents</h3>
              <span className="bg-red-500/20 text-red-400 text-sm px-3 py-1 rounded-full font-semibold">
                {activeIncidents.length} ACTIVE
              </span>
            </div>

            <div className="space-y-4">
              {activeIncidents.map((incident, index) => (
                <motion.div
                  key={incident.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 rounded-xl p-4 border border-white/10 relative overflow-hidden"
                >
                  {/* Severity Indicator */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${getSeverityColor(incident.severity)}`} />

                  <div className="pl-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-semibold">{incident.type}</h4>
                      <span className="text-xs text-gray-400">{incident.time}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{incident.location}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Assigned: {incident.team || 'Pending'}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          incident.status === 'new' ? 'bg-red-500/20 text-red-400' :
                          incident.status === 'responding' ? 'bg-yellow-500/20 text-yellow-400' :
                          incident.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {incident.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Emergency Contact Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/50 rounded-2xl p-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-1">Need Emergency Assistance?</h3>
              <p className="text-gray-300">Our teams are standing by 24/7 to respond immediately</p>
            </div>
            <motion.a
              href="tel:1300309361"
              className="bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold px-8 py-4 rounded-xl flex items-center gap-3 shadow-2xl hover:shadow-red-500/25 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>
                <span className="block text-xs opacity-90">Call Now</span>
                <span className="block text-lg">1300 309 361</span>
              </span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}