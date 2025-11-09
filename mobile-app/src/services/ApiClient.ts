import axios, { AxiosInstance, AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://disasterrecovery.com.au/api';

class ApiClient {
  private client: AxiosInstance;
  private offlineQueue: Array<{ method: string; url: string; data: any }> = [];

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (!error.response) {
          await this.queueOfflineRequest(error.config as any);
        }
        return Promise.reject(error);
      }
    );
  }

  private async queueOfflineRequest(config: any) {
    this.offlineQueue.push({
      method: config.method,
      url: config.url,
      data: config.data,
    });
    await AsyncStorage.setItem('offline_queue', JSON.stringify(this.offlineQueue));
  }

  async syncOfflineQueue() {
    const queueData = await AsyncStorage.getItem('offline_queue');
    if (!queueData) return;

    const queue = JSON.parse(queueData);
    for (const request of queue) {
      try {
        await this.client.request(request);
      } catch (error) {
        console.error('Failed to sync request:', error);
      }
    }

    this.offlineQueue = [];
    await AsyncStorage.removeItem('offline_queue');
  }

  async getServices() {
    const response = await this.client.get('/services');
    return response.data;
  }

  async getLocations() {
    const response = await this.client.get('/locations');
    return response.data;
  }

  async createBooking(bookingData: any) {
    const response = await this.client.post('/bookings', bookingData);
    return response.data;
  }

  async getJobStatus(jobId: string) {
    const response = await this.client.get(`/jobs/${jobId}`);
    return response.data;
  }

  async uploadPhoto(photo: string, jobId: string) {
    const formData = new FormData();
    formData.append('photo', {
      uri: photo,
      type: 'image/jpeg',
      name: 'damage-photo.jpg',
    } as any);
    formData.append('jobId', jobId);

    const response = await this.client.post('/photos/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }
}

export default new ApiClient();
