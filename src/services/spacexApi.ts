import axios from 'axios';
import { Launch } from '@/types/spacex';

const SPACEX_API_BASE = 'https://api.spacexdata.com/v4';

export const spacexApi = axios.create({
  baseURL: SPACEX_API_BASE,
  timeout: 10000,
});

export const fetchLaunches = async (): Promise<Launch[]> => {
  try {
    const response = await spacexApi.get('/launches');
    return response.data;
  } catch (error) {
    console.error('Error fetching SpaceX launches:', error);
    throw new Error('Failed to fetch missions from SpaceX API');
  }
};