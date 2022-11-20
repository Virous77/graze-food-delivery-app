import React, { useState } from "react";
import "../../styles/EditProfile.css";
import { IoClose } from "react-icons/io5";
import { BsCamera } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { useAuthContext } from "../../store/authContext";

const EditProfile = ({ setShowEdit }) => {
  const [actives, setActive] = useState(false);
  const [focus, setFocus] = useState(false);

  const {
    user,
    setUser,
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
    loading,
    userData,
  } = useAuthContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="editProfileBar">
      <div className="close">
        <IoClose
          className="closeIcon"
          onMouseEnter={() => {
            setTimeout(() => {
              setActive(true);
            }, 1000);
          }}
          onMouseLeave={() => setActive(false)}
          onClick={() => setShowEdit(false)}
        />
        <p>Edit Profile</p>
        <div className={!actives ? "hide" : "showHover"}>cancel</div>
      </div>

      <div className="userProfileData">
        {edit ? (
          <div className="userInpus">
            {userData.photoURL ? (
              <div className="changeImage">
                {!upload ? (
                  <div className="deleteBar">
                    <img
                      src={imageAsset ? imageAsset : userData.photoURL}
                      alt=""
                    />

                    {imageAsset && (
                      <FaTrash onClick={deleteImage} className="deleteIcon" />
                    )}
                  </div>
                ) : (
                  <div className="camera">
                    {!isLoading ? (
                      <div>
                        <input type="file" onChange={uploadImage} />
                        <BsCamera className="cameraIcon" />
                      </div>
                    ) : (
                      <span>Loading...</span>
                    )}
                  </div>
                )}

                <p onClick={() => setUpload(true)}>Change</p>
              </div>
            ) : (
              <input type="file" />
            )}
          </div>
        ) : (
          <img src={userData.photoURL} alt="" />
        )}

        {edit ? (
          <div className="userInput">
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          </div>
        ) : (
          <p>{user.name}</p>
        )}

        {edit ? (
          <div className="userInput">
            <input
              type="text"
              placeholder="Bio"
              value={focus ? bio : userData?.bio}
              onChange={(e) => setBio(e.target.value)}
              onFocus={() => setFocus(true)}
            />
          </div>
        ) : (
          <p className={userData.bio ? "yesBio" : "userOpacity"}>
            {userData.bio || "Set your bio"}
          </p>
        )}

        <div className="editButton">
          {!edit && <span onClick={() => setEdit(true)}>Edit</span>}
          {edit && (
            <span onClick={onProfileSave}>
              {loading ? "Processing..." : "Save"}
            </span>
          )}

          {edit && (
            <span
              onClick={() => {
                setEdit(false);
                setUpload(false);
              }}
            >
              Cancel
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
