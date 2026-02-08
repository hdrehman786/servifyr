import axios from "axios"

export const RegisterApi = async (obj) => {
    const res = await axios.post("/api/auth/register", obj);
    return res;

}


export const LoginApi = async (obj) => {
    const res = await axios.post("/api/auth/login", obj);
    return res;
};


export const uploadImage = async (formData) => {
  const response = await axios.post(
    "/api/profile/uploadpicture",
    formData
  );
  return response.data.file.secure_url;
};


