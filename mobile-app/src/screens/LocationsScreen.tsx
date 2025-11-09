import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

export default function LocationsScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  const serviceAreas = [
    { id: '1', name: 'Hamilton', postcode: '4007', type: 'High Net Worth' },
    { id: '2', name: 'Ascot', postcode: '4007', type: 'High Net Worth' },
    { id: '3', name: 'New Farm', postcode: '4005', type: 'High Net Worth' },
    { id: '4', name: 'Toowong', postcode: '4066', type: 'High Net Worth' },
    { id: '5', name: 'Brisbane CBD', postcode: '4000', type: 'Commercial' },
    { id: '6', name: 'Fortitude Valley', postcode: '4006', type: 'Commercial' },
    { id: '7', name: 'Ipswich', postcode: '4305', type: 'Residential' },
    { id: '8', name: 'Logan', postcode: '4114', type: 'Residential' },
  ];

  const initialRegion = {
    latitude: location?.coords.latitude || -27.4698,
    longitude: location?.coords.longitude || 153.0251,
    latitudeDelta: 0.3,
    longitudeDelta: 0.3,
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Service Areas</Text>
        <Text style={styles.subtitle}>Brisbane, Ipswich & Logan</Text>
      </View>

      <View style={styles.mapContainer}>
        <MapView style={styles.map} initialRegion={initialRegion}>
          {location && (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Your Location"
              pinColor="#1E40AF"
            />
          )}
        </MapView>
      </View>

      <ScrollView style={styles.areasContainer}>
        <Text style={styles.sectionTitle}>Coverage Areas</Text>
        {serviceAreas.map((area) => (
          <TouchableOpacity key={area.id} style={styles.areaCard}>
            <View style={styles.areaIcon}>
              <Ionicons 
                name={area.type === 'Commercial' ? 'business' : 'home'} 
                size={24} 
                color="#1E40AF" 
              />
            </View>
            <View style={styles.areaInfo}>
              <Text style={styles.areaName}>{area.name}</Text>
              <Text style={styles.areaDetails}>
                {area.postcode} • {area.type}
              </Text>
            </View>
            <View style={styles.responseContainer}>
              <Ionicons name="time" size={16} color="#10B981" />
              <Text style={styles.responseText}>60 min</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
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
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  mapContainer: {
    height: 250,
    backgroundColor: '#E5E7EB',
  },
  map: {
    flex: 1,
  },
  areasContainer: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  areaCard: {
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
  areaIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  areaInfo: {
    flex: 1,
    marginLeft: 16,
  },
  areaName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  areaDetails: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  responseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  responseText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
    marginLeft: 4,
  },
});
