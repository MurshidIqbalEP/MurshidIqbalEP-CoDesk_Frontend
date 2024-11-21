import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { Popconfirm } from "antd";
import {createWorkspace} from "../api/workspace"
import { uploadImageToCloudinary } from "../services/cloudinary";
import { useSelector } from "react-redux";
import { toast } from "sonner";

function CreateSpace() {
  const user = useSelector((state: any) => state.user.user);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [err, setErr] = useState({
    nameErr: "",
    descErr: "",
    imageErr: "",
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview("");
    }
  };

  const handleSubmition = async(e:React.FormEvent) => {
    e.preventDefault()
    let errs = {
      nameErr: "",
      descErr: "",
      imageErr: "",
    }
    let valid = true

    if(!name){
      errs.nameErr="Name needed"
      valid = false
    }
    if(!desc){
      errs.descErr="Description needed"
      valid = false
    }
    if(!imagePreview){
      errs.imageErr="Choose a thumbnail"
      valid = false
    }

    setErr(errs)

    if(valid){
      try {
        // Upload the image to Cloudinary
        const thumbnail = document.querySelector('#thumbnail') as HTMLInputElement;

         if (thumbnail && thumbnail.files) {
                 const file = thumbnail.files[0];
                 const uploadedImageUrl = await uploadImageToCloudinary(file);
                if(uploadedImageUrl){
                  let res =  await createWorkspace(name,desc,uploadedImageUrl,user.id)
                  toast.success(res?.data.message)
                }
           }
        

      } catch (err) {
        console.error('Error during submission:', err);
      }
     
    }

  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900 relative overflow-hidden text-white">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-purple-600/30 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="max-w-lg mx-auto bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6">
            Create a Workspace
          </h1>

          <form onSubmit={handleSubmition}>
            {/* Workspace Name */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="workspaceName"
              >
                Workspace Name
              </label>
              <input
                id="workspaceName"
                type="text"
                value={name}
                placeholder="Enter workspace name"
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:ring focus:ring-purple-500 outline-none"
              />
              {err.nameErr && <p className="text-red-400 text-sm">{err.nameErr}</p>}
            </div>

            {/* Description */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                value={desc}
                placeholder="Describe your workspace"
                onChange={(e) => setDesc(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:ring focus:ring-purple-500 outline-none"
              ></textarea>
              {err.descErr && <p className="text-red-400 text-sm">{err.descErr}</p>}
            </div>

            {/* Thumbnail Upload with Enhanced Preview */}
            <div className="mb-6">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="thumbnail"
              >
                Thumbnail Image
              </label>
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-purple-700 file:text-white hover:file:bg-purple-800"
              />
              {err.imageErr && <p className="text-red-400 text-sm">{err.imageErr}</p>}
              {imagePreview && (
                <div className="mt-4 relative w-full h-48 rounded-lg overflow-hidden border-2 border-purple-500 shadow-lg">
                  <img
                    src={imagePreview}
                    alt="Thumbnail Preview"
                    className="w-full h-full object-cover"
                  />
                  {/* Close Icon */}
                  <Popconfirm
                    title="Delete the thumbnail"
                    description="Are you sure to delete this thumbnail?"
                    onConfirm={() => setImagePreview("")} // Triggered when user confirms
                     overlayClassName="custom-popconfirm"
                  >
                    <button
                      type="button" // Example action when button is clicked
                      className="absolute top-2 right-2 bg-white p-1 rounded-md text-purple-900 hover:text-purple-600 focus:outline-none"
                    >
                      <FaTrashCan size={15} />
                    </button>
                  </Popconfirm>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md focus:outline-none focus:ring focus:ring-purple-500"
              >
                Create Workspace
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateSpace;
