import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

export default function TrackJobScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
      }
    })();
  }, []);

  const job = {
    id: 'JOB-2024-001',
    status: 'En Route',
    technicianName: 'Phill McGurk',
    eta: '15 minutes',
    serviceType: 'Water Damage Restoration',
    location: {
      latitude: location?.coords.latitude || -27.4698,
      longitude: location?.coords.longitude || 153.0251,
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: job.location.latitude,
            longitude: job.location.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <Marker coordinate={job.location} title="Your Location" pinColor="#1E40AF" />
        </MapView>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.statusCard}>
          <Text style={styles.statusText}>{job.status}</Text>
          <Text style={styles.serviceType}>{job.serviceType}</Text>
          <Text style={styles.etaText}>ETA: {job.eta}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  mapContainer: { height: 300 },
  map: { flex: 1 },
  content: { flex: 1, padding: 16 },
  statusCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16 },
  statusText: { fontSize: 18, fontWeight: '600' },
  serviceType: { fontSize: 16, marginTop: 8 },
  etaText: { fontSize: 14, color: '#10B981', marginTop: 8 },
});
