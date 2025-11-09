import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

export default function ProfileScreen() {
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  const checkBiometricAvailability = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    setBiometricAvailable(compatible && enrolled);
  };

  const toggleBiometric = async () => {
    if (!biometricAvailable) {
      Alert.alert('Not Available', 'Biometric authentication is not available on this device');
      return;
    }

    if (!biometricEnabled) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to enable biometric login',
      });
      
      if (result.success) {
        await SecureStore.setItemAsync('biometric_enabled', 'true');
        setBiometricEnabled(true);
        Alert.alert('Success', 'Biometric authentication enabled');
      }
    } else {
      await SecureStore.deleteItemAsync('biometric_enabled');
      setBiometricEnabled(false);
      Alert.alert('Disabled', 'Biometric authentication disabled');
    }
  };

  const menuItems = [
    { id: '1', title: 'Account Details', icon: 'person-outline', action: () => {} },
    { id: '2', title: 'Booking History', icon: 'time-outline', action: () => {} },
    { id: '3', title: 'Payment Methods', icon: 'card-outline', action: () => {} },
    { id: '4', title: 'Notifications', icon: 'notifications-outline', action: () => {} },
    { id: '5', title: 'Help & Support', icon: 'help-circle-outline', action: () => {} },
    { id: '6', title: 'About', icon: 'information-circle-outline', action: () => {} },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={48} color="#1E40AF" />
        </View>
        <Text style={styles.name}>Guest User</Text>
        <Text style={styles.email}>guest@example.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact</Text>
        <View style={styles.contactCard}>
          <View style={styles.contactItem}>
            <Ionicons name="call" size={20} color="#1E40AF" />
            <Text style={styles.contactText}>1300 309 361</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="mail" size={20} color="#1E40AF" />
            <Text style={styles.contactText}>admin@disasterrecovery.com.au</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <TouchableOpacity style={styles.menuItem} onPress={toggleBiometric}>
          <Ionicons name="finger-print" size={24} color="#1E40AF" />
          <Text style={styles.menuText}>Biometric Login</Text>
          <View style={[styles.toggle, biometricEnabled && styles.toggleActive]} />
        </TouchableOpacity>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem} onPress={item.action}>
            <Ionicons name={item.icon as any} size={24} color="#1E40AF" />
            <Text style={styles.menuText}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    alignItems: 'center',
    padding: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 24,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  name: { fontSize: 24, fontWeight: '600', color: '#111827' },
  email: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  section: { padding: 16, marginTop: 12 },
  sectionTitle: { fontSize: 12, fontWeight: '600', color: '#6B7280', marginBottom: 12, textTransform: 'uppercase' },
  contactCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16 },
  contactItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  contactText: { fontSize: 14, color: '#111827', marginLeft: 12 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuText: { flex: 1, fontSize: 16, color: '#111827', marginLeft: 12 },
  toggle: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#E5E7EB' },
  toggleActive: { backgroundColor: '#10B981' },
  versionContainer: { alignItems: 'center', padding: 24 },
  versionText: { fontSize: 12, color: '#9CA3AF' },
});
