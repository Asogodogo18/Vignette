import axios from "axios";

export default axios.create({
    baseURL: "http://192.168.1.44/vignette/",
    headers: {
      "Content-type": "multipart/form-data"
    }
  });