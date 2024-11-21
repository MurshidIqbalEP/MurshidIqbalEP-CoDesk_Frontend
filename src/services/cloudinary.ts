const presetName = import.meta.env.VITE_PRESET_NAME
const cloudName  = import.meta.env.VITE_CLOUD_NAME

 export const uploadImageToCloudinary = async (file: any) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', presetName	); 
    formData.append('cloud_name', cloudName); 
  
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      return data.secure_url; 
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };
  