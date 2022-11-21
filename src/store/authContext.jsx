import { createContext, useState, useContext } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import useUploadImage from "../hooks/useUploadImage";
import useFetchUser from "../hooks/useFetchUser";

const UserAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    isLoggedIn: false,
  };

  const getLocalStorageData = () => {
    const result = localStorage.getItem("coinsmap");
    const res = result ? JSON.parse(result) : initialState;
    return res;
  };

  const [user, setUser] = useState(getLocalStorageData());
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [edit, setEdit] = useState(false);

  const { name, email, password } = user;
  const navigate = useNavigate();

  const {
    userData,
    getProductById,
    loading: fetchLoading,
  } = useFetchUser("users", user.uid);
  const { uploadImage, imageAsset, isLoading, deleteImage, upload, setUpload } =
    useUploadImage();

  //Update Profile
  const onProfileSave = async () => {
    setLoading(true);
    try {
      const uniqueData = {
        name: user.name || userData.name,
        uid: userData.uid,
        photoURL: imageAsset || userData.photoURL,
        email: userData.email,
        createdAt: userData.createdAt,
        editedAt: serverTimestamp(),
        bio: bio || userData.bio,
      };

      await setDoc(doc(db, "users", userData.uid), uniqueData);
      getProductById();
      setLoading(false);
      setEdit(false);
    } catch (error) {
      setLoading(false);

      toast.error("Something went wrong");
    }
  };

  //Register new User
  const register = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !password) {
      setLoading(false);
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uniqueUser = newUser.user;

      const tempData = {
        name: name,
        uid: uniqueUser.uid,
        photoURL: uniqueUser.photoURL || null,
        email: email,
        isLoggedIn: true,
      };

      const uniqueData = {
        name: name,
        uid: uniqueUser.uid,
        photoURL: uniqueUser.photoURL || null,
        email: email,
        createdAt: serverTimestamp(),
      };

      localStorage.setItem("coinsmap", JSON.stringify(tempData));
      await setDoc(doc(db, "users", uniqueUser.uid), uniqueData);
      navigate("/");
      setLoading(false);
      setUser(tempData);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  //Login with Email & Pass
  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setLoading(false);
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const newUser = await signInWithEmailAndPassword(auth, email, password);
      const uniqueUser = newUser.user;

      const tempData = {
        name: uniqueUser.displayName || "",
        uid: uniqueUser.uid,
        photoURL: uniqueUser.photoURL || null,
        email: email,
        isLoggedIn: true,
      };

      localStorage.setItem("coinsmap", JSON.stringify(tempData));
      navigate("/");
      setLoading(false);
      setUser(tempData);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  //Login & SignUp with Google
  const googleLogin = async () => {
    setGoogleLoading(true);

    const provider = new GoogleAuthProvider();

    try {
      const newUser = await signInWithPopup(auth, provider);
      const uniqueUser = newUser.user;

      const tempData = {
        name: uniqueUser.displayName,
        uid: uniqueUser.uid,
        photoURL: uniqueUser.photoURL || null,
        email: uniqueUser.email,
        isLoggedIn: true,
      };

      const uniqueData = {
        name: uniqueUser.displayName,
        uid: uniqueUser.uid,
        photoURL: uniqueUser.photoURL || null,
        email: uniqueUser.email,
        createdAt: serverTimestamp(),
      };

      localStorage.setItem("coinsmap", JSON.stringify(tempData));
      await setDoc(doc(db, "users", uniqueUser.uid), uniqueData);
      navigate("/");
      setGoogleLoading(false);
      setUser(tempData);
    } catch (error) {
      setGoogleLoading(false);
      toast.error(error.message);
    }
  };

  //Logout User
  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("coinsmap");
      navigate("/");
      setUser(initialState);
    } catch (error) {
      toast.error("Something went wrong, Try again!");
    }
  };

  return (
    <UserAuthContext.Provider
      value={{
        register,
        login,
        googleLogin,
        logout,
        user,
        setUser,
        loading,
        googleLoading,
        uploadImage,
        imageAsset,
        isLoading,
        deleteImage,
        upload,
        setUpload,
        bio,
        setBio,
        onProfileSave,
        edit,
        setEdit,
        userData,
        fetchLoading,
        initialState,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(UserAuthContext);
