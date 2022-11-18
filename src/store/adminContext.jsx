import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/firebase.config";
import useUploadImage from "../hooks/useUploadImage";
import { useAuthContext } from "../store/authContext";
import useFetchCollection from "../hooks/useFetchCollection";

const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const { user } = useAuthContext();
  const { data, getCollection } = useFetchCollection("shop");
  const uniqueShop = data?.filter((unique) => unique?.shopUserUid === user.uid);

  const initialState = {
    shopName: "",
    shopDesc: "",
    shopOpen: "",
    shopClose: "",
    shopCategory: "",
    shopLocation: "",
    veg: false,
  };

  const {
    uploadImage,
    imageAsset,
    isLoading: imageLoad,
    deleteImage,
    setImageAsset,
  } = useUploadImage();

  const initialStateFood = {
    foodName: "",
    foodDesc: "",
    offer: false,
    foodPrice: 0,
    offerFoodPrice: 0,
  };

  const [shopData, setShopData] = useState(initialState);
  const [foodData, setFoodData] = useState(initialStateFood);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShopData({ ...shopData, [name]: value });
  };

  const handleChangeFood = (e) => {
    const { name, value } = e.target;
    setFoodData({ ...foodData, [name]: value });
  };

  const {
    shopName,
    shopDesc,
    shopOpen,
    shopClose,
    shopCategory,
    shopLocation,
    veg,
  } = shopData;

  const { foodName, foodDesc, foodPrice, offerFoodPrice, offer } = foodData;

  //Add Shop Handler
  const addShop = async () => {
    setIsLoading(true);

    if (
      !shopName ||
      !shopCategory ||
      !shopDesc ||
      !shopOpen ||
      !shopClose ||
      !shopLocation ||
      !veg
    ) {
      setIsLoading(false);
      toast.error("Please fill all fields!");
      return;
    }

    const tempData = {
      shopName: shopName,
      shopDesc: shopDesc,
      shopOpen: shopOpen,
      shopClose: shopClose,
      shopCategory: shopCategory,
      shopLocation: shopLocation,
      shopTypeVeg: veg,
      shopUserUid: user.uid,
      createdAt: serverTimestamp(),
      shopImage: imageAsset,
    };

    try {
      await addDoc(collection(db, "shop"), tempData);
      setIsLoading(false);
      setShopData(initialState);
      setImageAsset(null);
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong, Try again!");
    }
  };

  const addFood = async () => {
    setIsLoading(true);

    if (!foodName || !foodDesc || !(offer ? offerFoodPrice : foodPrice)) {
      setIsLoading(false);
      toast.error("Please fill all fields!");
      return;
    }

    if (+offerFoodPrice > +foodPrice) {
      setIsLoading(false);
      toast.error("Offer Price must be lower than regular price.");
      return;
    }

    const tempData = {
      foodName: foodName,
      foodDesc: foodDesc,
      foodPrice: foodPrice,
      offerFoodPrice: offerFoodPrice || null,
      offer: offer,
      shopId: uniqueShop[0]?.id,
      shopUserUid: uniqueShop[0]?.shopUserUid,
      createdAt: serverTimestamp(),
      foodImage: imageAsset,
    };

    try {
      await addDoc(collection(db, "food"), tempData);
      setIsLoading(false);
      setFoodData(initialStateFood);
      setImageAsset(null);
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong, Try again!");
    }
  };

  return (
    <AdminContext.Provider
      value={{
        shopData,
        setShopData,
        handleChange,
        addShop,
        isLoading,
        uploadImage,
        imageAsset,
        imageLoad,
        deleteImage,
        foodData,
        setFoodData,
        handleChangeFood,
        addFood,
        getCollection,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
