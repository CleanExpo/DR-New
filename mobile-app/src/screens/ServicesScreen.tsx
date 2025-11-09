import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ServicesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'water', name: 'Water' },
    { id: 'fire', name: 'Fire' },
    { id: 'mould', name: 'Mould' },
    { id: 'storm', name: 'Storm' },
  ];

  const services = [
    {
      id: '1',
      name: 'Water Damage Restoration',
      category: 'water',
      icon: 'water',
      color: '#3B82F6',
      description: 'Emergency water extraction and drying',
      responseTime: '60 minutes',
    },
    {
      id: '2',
      name: 'Fire Damage Restoration',
      category: 'fire',
      icon: 'flame',
      color: '#EF4444',
      description: 'Smoke and fire damage cleanup',
      responseTime: '60 minutes',
    },
    {
      id: '3',
      name: 'Mould Remediation',
      category: 'mould',
      icon: 'bug',
      color: '#10B981',
      description: 'Professional mould removal and prevention',
      responseTime: '24 hours',
    },
    {
      id: '4',
      name: 'Storm Damage Restoration',
      category: 'storm',
      icon: 'thunderstorm',
      color: '#8B5CF6',
      description: 'Emergency storm and wind damage repair',
      responseTime: '60 minutes',
    },
  ];

  const filteredServices =
    selectedCategory === 'all'
      ? services
      : services.filter((s) => s.category === selectedCategory);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Services</Text>
        <Text style={styles.subtitle}>Professional restoration services</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryChip,
              selectedCategory === category.id && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.servicesContainer}>
        {filteredServices.map((service) => (
          <TouchableOpacity key={service.id} style={styles.serviceCard}>
            <View style={[styles.serviceIconContainer, { backgroundColor: service.color }]}>
              <Ionicons name={service.icon as any} size={32} color="#fff" />
            </View>
            <View style={styles.serviceContent}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceDescription}>{service.description}</Text>
              <View style={styles.serviceFooter}>
                <View style={styles.responseTimeContainer}>
                  <Ionicons name="time-outline" size={14} color="#6B7280" />
                  <Text style={styles.responseTime}>{service.responseTime} response</Text>
                </View>
                <TouchableOpacity style={styles.bookButton}>
                  <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
              </View>
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
  categoriesScroll: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#1E40AF',
  },
  categoryText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
  },
  servicesContainer: {
    flex: 1,
    padding: 16,
  },
  serviceCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  serviceIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceContent: {
    flex: 1,
    marginLeft: 16,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  serviceDescription: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  serviceFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  responseTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  responseTime: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  bookButton: {
    backgroundColor: '#1E40AF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  bookButtonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
});
