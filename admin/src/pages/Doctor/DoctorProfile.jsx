import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useThemeStore } from "@/context/useThems";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } =
    useContext(DoctorContext);

  const backendUrl = "https://doctor-for-u-backend.onrender.com";
  const [isEdit, setIsEdit] = useState(false);
  const { theme } = useThemeStore();

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated Successfully",
        });
        setIsEdit(false);
        getProfileData();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
      });
      console.error(error);
    }
  };

  if (!profileData) return null;

  return (
    <div
      className={`p-6 min-h-screen transition-colors ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <div
        className={`max-w-4xl mx-auto shadow-md rounded-2xl overflow-hidden transition-colors ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Profile Header */}
        <div className="flex flex-col items-center p-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-teal-500 shadow">
            <img
              className="w-full h-full object-cover"
              src={profileData.image}
              alt={`${profileData.name}'s profile`}
            />
          </div>
          <h1 className="mt-4 text-2xl font-semibold">
            {profileData.name || "N/A"}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {profileData.degree} - {profileData.speciality}
          </p>
          <span className="mt-2 bg-teal-600 text-white px-4 py-1 rounded-full text-sm shadow">
            {profileData.experience} Years Experience
          </span>
        </div>

        {/* Profile Details */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 space-y-6">
          {/* About */}
          <div>
            <h2 className="text-lg font-medium">About</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {profileData.about || "No details provided"}
            </p>
          </div>

          {/* Fees */}
          <div>
            <h2 className="text-lg font-medium">Appointment Fee</h2>
            <div className="mt-2 text-gray-600 dark:text-gray-400">
              {isEdit ? (
                <input
                  type="number"
                  className="border rounded-lg px-3 py-2 w-full bg-transparent outline-none focus:ring-2 focus:ring-teal-500"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      fees: e.target.value,
                    }))
                  }
                  value={profileData.fees}
                />
              ) : (
                <span className="font-semibold">${profileData.fees}</span>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <h2 className="text-lg font-medium">Address</h2>
            <div className="mt-2 text-gray-600 dark:text-gray-400 space-y-2">
              {isEdit ? (
                <>
                  <input
                    type="text"
                    placeholder="Line 1"
                    className="border rounded-lg px-3 py-2 w-full bg-transparent outline-none focus:ring-2 focus:ring-teal-500"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    defaultValue={profileData.address?.line1}
                  />
                  <input
                    type="text"
                    placeholder="Line 2"
                    className="border rounded-lg px-3 py-2 w-full bg-transparent outline-none focus:ring-2 focus:ring-teal-500"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    defaultValue={profileData.address?.line2}
                  />
                </>
              ) : (
                <>
                  <p>{profileData.address?.line1 || "N/A"}</p>
                  <p>{profileData.address?.line2 || ""}</p>
                </>
              )}
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 rounded accent-teal-600"
              checked={profileData.available}
              onChange={() =>
                isEdit &&
                setProfileData((prev) => ({
                  ...prev,
                  available: !prev.available,
                }))
              }
            />
            <label className="text-sm">Available</label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            {isEdit ? (
              <button
                onClick={updateProfile}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
