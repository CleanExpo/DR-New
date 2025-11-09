import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function EmergencyBookingScreen() {
  const [selectedService, setSelectedService] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const services = [
    { id: 'water', name: 'Water Damage', icon: 'water', color: '#3B82F6' },
    { id: 'fire', name: 'Fire Damage', icon: 'flame', color: '#EF4444' },
    { id: 'mould', name: 'Mould', icon: 'bug', color: '#10B981' },
    { id: 'storm', name: 'Storm Damage', icon: 'thunderstorm', color: '#8B5CF6' },
  ];

  const handleTakePhoto = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Camera permission is required to take photos');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setPhotos([...photos, result.assets[0].uri]);
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    }
  };

  const handleSubmit = () => {
    if (!selectedService) {
      Alert.alert('Service Required', 'Please select a service type');
      return;
    }

    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    Alert.alert(
      'Booking Submitted',
      'Our team will contact you within 60 minutes',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.alertBanner}>
        <Ionicons name="warning" size={20} color="#fff" />
        <Text style={styles.alertText}>Emergency Response: 60 minutes</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Service Type</Text>
        <View style={styles.servicesGrid}>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={[
                styles.serviceOption,
                selectedService === service.id && styles.serviceOptionSelected,
              ]}
              onPress={() => {
                setSelectedService(service.id);
                if (Platform.OS !== 'web') {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
              }}
            >
              <View style={[styles.serviceIconSmall, { backgroundColor: service.color }]}>
                <Ionicons name={service.icon as any} size={24} color="#fff" />
              </View>
              <Text style={styles.serviceOptionText}>{service.name}</Text>
              {selectedService === service.id && (
                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add Photos (Optional)</Text>
        <View style={styles.photosContainer}>
          {photos.map((photo, index) => (
            <View key={index} style={styles.photoThumbnail}>
              <Text style={styles.photoText}>Photo {index + 1}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.addPhotoButton} onPress={handleTakePhoto}>
            <Ionicons name="camera" size={32} color="#1E40AF" />
            <Text style={styles.addPhotoText}>Take Photo</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Notes</Text>
        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={4}
          placeholder="Describe the emergency situation..."
          value={notes}
          onChangeText={setNotes}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Emergency Request</Text>
        <Ionicons name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>

      <View style={styles.contactInfo}>
        <Ionicons name="call" size={20} color="#1E40AF" />
        <Text style={styles.contactText}>Or call: 1300 309 361</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DC2626',
    padding: 12,
  },
  alertText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
  section: {
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  servicesGrid: {
    gap: 12,
  },
  serviceOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  serviceOptionSelected: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  serviceIconSmall: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  serviceOptionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  photoThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoText: {
    fontSize: 12,
    color: '#6B7280',
  },
  addPhotoButton: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#1E40AF',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoText: {
    fontSize: 10,
    color: '#1E40AF',
    marginTop: 4,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#111827',
    textAlignVertical: 'top',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DC2626',
    marginHorizontal: 16,
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginRight: 8,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginBottom: 24,
  },
  contactText: {
    fontSize: 14,
    color: '#1E40AF',
    marginLeft: 8,
    fontWeight: '500',
  },
});
