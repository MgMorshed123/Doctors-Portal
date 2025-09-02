import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import axios from "axios";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { userData, setUserData, loadUserProfileData, token, backendUrl } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address || {}));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      if (image) formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        Swal.fire({ title: data.message, icon: "success" });
        loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        Swal.fire({ title: "Error", icon: "error" });
      }
    } catch (error) {
      Swal.fire({ title: "Error", icon: "error" });
    }
  };

  return userData ? (
    <div className="max-w-lg mx-auto py-8 space-y-6 animate-fade-in">
      {/* Profile Picture */}
      {isEdit ? (
        <label htmlFor="image" className="cursor-pointer">
          <div className="relative inline-block">
            <img
              className="w-36 rounded-full shadow-md opacity-75 hover:opacity-100 transition-opacity duration-300"
              src={image ? URL.createObjectURL(image) : userData.image}
              alt="Profile"
            />
            <img
              className="w-10 absolute bottom-0 right-0 bg-white rounded-full p-1 shadow"
              src={assets.upload_icon}
              alt="Upload"
            />
          </div>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </label>
      ) : (
        <img
          className="w-36 rounded-full shadow-lg"
          src={userData.image}
          alt="Profile"
        />
      )}

      {/* Name */}
      {isEdit ? (
        <input
          className="text-3xl font-semibold bg-transparent border-b border-secondary-light dark:border-secondary-dark focus:outline-none focus:border-primary-light dark:focus:border-primary-dark transition-all"
          type="text"
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
          value={userData.name || ""}
        />
      ) : (
        <p className="text-3xl font-semibold">{userData.name}</p>
      )}

      <hr className="border-secondary-light dark:border-secondary-dark" />

      {/* Contact Information */}
      <div>
        <p className="text-lg font-medium underline mt-4">
          Contact Information
        </p>
        <div className="grid grid-cols-1 gap-4 mt-4 text-sm">
          <div className="flex justify-between">
            <p className="font-medium">Email:</p>
            <p className="text-primary-light dark:text-primary-dark">
              {userData.email}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                className="bg-transparent border-b border-secondary-light dark:border-secondary-dark focus:outline-none focus:border-primary-light dark:focus:border-primary-dark"
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                value={userData.phone || ""}
              />
            ) : (
              <p className="text-primary-light dark:text-primary-dark">
                {userData.phone}
              </p>
            )}
          </div>

          <div className="flex justify-between">
            <p className="font-medium">Address:</p>
            {isEdit ? (
              <div className="flex flex-col">
                <input
                  className="bg-transparent border-b border-secondary-light dark:border-secondary-dark focus:outline-none focus:border-primary-light dark:focus:border-primary-dark"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={userData.address?.line1 || ""}
                  type="text"
                />
                <input
                  className="bg-transparent border-b border-secondary-light dark:border-secondary-dark focus:outline-none focus:border-primary-light dark:focus:border-primary-dark mt-2"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  value={userData.address?.line2 || ""}
                  type="text"
                />
              </div>
            ) : (
              <p className="text-right text-secondary-light dark:text-secondary-dark">
                {userData.address?.line1}
                <br />
                {userData.address?.line2}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div>
        <p className="text-lg font-medium underline mt-4">Basic Information</p>
        <div className="grid grid-cols-1 gap-4 mt-4 text-sm">
          <div className="flex justify-between">
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                className="bg-transparent border-b border-secondary-light dark:border-secondary-dark focus:outline-none focus:border-primary-light dark:focus:border-primary-dark"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userData.gender || ""}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p className="text-secondary-light dark:text-secondary-dark">
                {userData.gender}
              </p>
            )}
          </div>

          <div className="flex justify-between">
            <p className="font-medium">Birthday:</p>
            {isEdit ? (
              <input
                className="bg-transparent border-b border-secondary-light dark:border-secondary-dark focus:outline-none focus:border-primary-light dark:focus:border-primary-dark"
                type="date"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                value={userData.dob || ""}
              />
            ) : (
              <p className="text-secondary-light dark:text-secondary-dark">
                {userData.dob}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 text-center">
        {isEdit ? (
          <button
            className="bg-primary-light dark:bg-primary-dark text-white px-8 py-2 rounded-full hover:bg-accent-light dark:hover:bg-accent-dark transition-all duration-300"
            onClick={updateUserProfileData}
          >
            Save
          </button>
        ) : (
          <button
            className="border border-primary-light dark:border-primary-dark px-8 py-2 rounded-full hover:bg-primary-light dark:hover:bg-primary-dark hover:text-white transition-all duration-300"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  ) : null;
};

export default MyProfile;
