import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleEmergencyPress = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
    navigation.navigate('EmergencyBooking' as never);
  };

  const services = [
    { id: '1', name: 'Water Damage', icon: 'water', color: '#3B82F6' },
    { id: '2', name: 'Fire Damage', icon: 'flame', color: '#EF4444' },
    { id: '3', name: 'Mould Remediation', icon: 'bug', color: '#10B981' },
    { id: '4', name: 'Storm Damage', icon: 'thunderstorm', color: '#8B5CF6' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DR Brisbane</Text>
        <Text style={styles.subtitle}>24/7 Emergency Restoration</Text>
      </View>

      <TouchableOpacity
        style={styles.emergencyButton}
        onPress={handleEmergencyPress}
        activeOpacity={0.8}
      >
        <Ionicons name="warning" size={32} color="#fff" />
        <View style={styles.emergencyTextContainer}>
          <Text style={styles.emergencyTitle}>Emergency Service</Text>
          <Text style={styles.emergencySubtitle}>60-minute response time</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="camera" size={32} color="#1E40AF" />
            <Text style={styles.actionText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate('TrackJob' as never)}
          >
            <Ionicons name="location" size={32} color="#1E40AF" />
            <Text style={styles.actionText}>Track Job</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="call" size={32} color="#1E40AF" />
            <Text style={styles.actionText}>Call Now</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate('Services' as never)}
          >
            <Ionicons name="list" size={32} color="#1E40AF" />
            <Text style={styles.actionText}>Services</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.servicesSection}>
        <Text style={styles.sectionTitle}>Our Services</Text>
        {services.map((service) => (
          <TouchableOpacity key={service.id} style={styles.serviceCard}>
            <View style={[styles.serviceIcon, { backgroundColor: service.color }]}>
              <Ionicons name={service.icon as any} size={24} color="#fff" />
            </View>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceDescription}>
                Professional restoration by IICRC Master Restorer
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="shield-checkmark" size={24} color="#1E40AF" />
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>IICRC Master Restorer</Text>
          <Text style={styles.infoText}>
            Phill McGurk - One of few Master Restorers in Queensland
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 24,
    backgroundColor: '#1E40AF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#E5E7EB',
    marginTop: 4,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC2626',
    marginHorizontal: 16,
    marginTop: -32,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  emergencyTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  emergencySubtitle: {
    fontSize: 12,
    color: '#FEE2E2',
    marginTop: 2,
  },
  quickActions: {
    padding: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  actionCard: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: 16,
  },
  actionText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
  servicesSection: {
    padding: 16,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceInfo: {
    flex: 1,
    marginLeft: 16,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  serviceDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E40AF',
  },
  infoText: {
    fontSize: 12,
    color: '#3B82F6',
    marginTop: 2,
  },
});
