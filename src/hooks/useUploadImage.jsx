import { useState } from "react";
import {
  uploadBytesResumable,
  getDownloadURL,
  ref,
  deleteObject,
} from "firebase/storage";
import { storage } from "../firebase/firebase.config";
import { toast } from "react-toastify";

const useUploadImage = () => {
  const [imageAsset, setImageAsset] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [upload, setUpload] = useState(false);

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        toast.error("Something went wrong. Try again!");
        setTimeout(() => {
          toast.dismiss();
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageAsset(downloadUrl);
          setUpload(false);
          setIsLoading(false);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deletRef = ref(storage, imageAsset);

    deleteObject(deletRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
    });
  };

  return {
    uploadImage,
    imageAsset,
    isLoading,
    deleteImage,
    upload,
    setUpload,
    setImageAsset,
  };
};

export default useUploadImage;
