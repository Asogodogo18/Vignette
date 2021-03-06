import axios from "axios";

export default axios.create({
  baseURL: "http://197.155.143.74:1112/vignette/",
  // headers: {
  //   "Content-Type": "multipart/form-data",
  // },
});

export const storeDataObject = (storage_key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    storage.set(storage_key, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const storeData = (storage_key, value) => {
  try {
    storage.set(storage_key, value);
  } catch (e) {
    // saving error
  }
};

export const getDataObject = (storage_key) => {
  try {
    const jsonValue = storage.getString(storage_key);
    if (!jsonValue) return false;
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export const removeValue = (storage_key) => {
  try {
    storage.delete(storage_key);
  } catch (e) {
    // remove error
  }
};
