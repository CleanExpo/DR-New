import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useOfflineStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredValue();
  }, [key]);

  const loadStoredValue = async () => {
    try {
      const item = await AsyncStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error('Error loading stored value:', error);
    } finally {
      setLoading(false);
    }
  };

  const setValue = async (value: T) => {
    try {
      setStoredValue(value);
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error storing value:', error);
    }
  };

  const removeValue = async () => {
    try {
      setStoredValue(initialValue);
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing value:', error);
    }
  };

  return { storedValue, setValue, removeValue, loading };
}

export function useOfflineBookings() {
  return useOfflineStorage('offline_bookings', []);
}

export function useOfflinePhotos() {
  return useOfflineStorage('offline_photos', []);
}
