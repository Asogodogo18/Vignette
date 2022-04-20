import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default axios.create({
  baseURL: "http://192.168.1.44/vignette/",
  headers: {
    "Content-type": "multipart/form-data",
  },
});

export const storeDataObject = async (storage_key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storage_key, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const storeData = async (storage_key, value) => {
  try {
    await AsyncStorage.setItem(storage_key, value);
  } catch (e) {
    // saving error
  }
};

export const getDataObject = async (storage_key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(storage_key);
    if (!jsonValue) return false;
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export const removeValue = async (storage_key) => {
  try {
    await AsyncStorage.removeItem(storage_key);
  } catch (e) {
    // remove error
  }
};
