import axios from "axios";
export default async podaci => {
  const formData = new FormData();
  formData.append("file", podaci);
  formData.append("upload_preset", "emsbshr7");
  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dq9cwwrml/image/upload",
      formData
    );
    return response.data.url;
  } catch (error) {
    console.log(error, "error");
  }
};
