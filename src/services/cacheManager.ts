import AsyncStorage from '@react-native-async-storage/async-storage';

import { CACHE_EXPIRATION_TIME } from '@/constants';

export async function getCache(key: string) {
  try {
    const cachedData = await AsyncStorage.getItem(key);
    const cachedTime = await AsyncStorage.getItem(`${key}_cache_time`);
    if (cachedData && cachedTime) {
      const currentTime = Date.now();
      if (currentTime - parseInt(cachedTime) < CACHE_EXPIRATION_TIME) {
        return JSON.parse(cachedData);
      }
    }
  } catch (error) {
    console.error(`Erro ao obter cache para ${key}:`, error);
  }
  return null;
};

export async function setCache(key: string, data: {}) {
  try {
    const currentTime = Date.now();
    await AsyncStorage.setItem(key, JSON.stringify(data));
    await AsyncStorage.setItem(`${key}_cache_time`, currentTime.toString());
  } catch (error) {
    console.error(`Erro ao salvar cache para ${key}:`, error);
  }
};

export async function clearCache(key: string) {
  try {
    await AsyncStorage.removeItem(key);
    await AsyncStorage.removeItem(`${key}_cache_time`);
  } catch (error) {
    console.error(`Erro ao limpar cache para ${key}:`, error);
  }
};
