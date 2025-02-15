import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../../../frontend/src/context/AppContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useThemeStore } from "@/context/useThems";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } =
    useContext(DoctorContext);

  const backendUrl = "http://localhost:4000";
  const [isEdit, setIsEdit] = useState(false);
  const { theme } = useThemeStore();

  // const { backendUrl } = useContext(AppContext);

  console.log("profileData", profileData);
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
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        Swal.fire({
          title: "Profile Updated Successfully ",
        });
        setIsEdit(false);
        getProfileData();
      }
    } catch (error) {
      Swal.fire({
        title: "Title Something went wrong ",
      });
      console.log(error);
    }
  };

  return (
    profileData && (
      <div
        className={`p-6 min-h-screen ${
          theme === "dark" ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div
          className={`max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden ${
            theme === "dark"
              ? "border-white bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          <div className="flex flex-col items-center p-6 ">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary">
              <img
                className="w-full h-full object-cover"
                src={profileData.image}
                alt={`${profileData.name}'s profile`}
              />
            </div>
            <h1 className="mt-4 text-2xl font-semibold text-gray-800">
              {profileData.name}
            </h1>
            <p className="text-gray-600 text-sm">
              {profileData.degree} - {profileData.speciality}
            </p>
            <button className="mt-2 bg-primary text-white px-4 py-1 rounded-full">
              {profileData.experience} Years Experience
            </button>
          </div>

          <div className="p-6 border-t">
            <div>
              <h2 className="text-lg font-medium text-gray-800">About</h2>
              <p className="mt-2 text-gray-600">{profileData.about}</p>
            </div>

            <div className="mt-4">
              <h2 className="text-lg font-medium text-gray-800">
                Appointment Fee
              </h2>
              <p className="mt-2 text-gray-600">
                {isEdit ? (
                  <input
                    type="number"
                    className="border rounded px-2 py-1 w-full"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                    value={profileData.fees}
                  />
                ) : (
                  <span className="text-gray-700">${profileData.fees}</span>
                )}
              </p>
            </div>

            <div className="mt-4">
              <h2 className="text-lg font-medium text-gray-800">Address</h2>
              <div className="mt-2 text-gray-600">
                {isEdit ? (
                  <>
                    <input
                      type="text"
                      placeholder="Line 1"
                      className="border rounded px-2 py-1 w-full mt-2"
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
                      className="border rounded px-2 py-1 w-full mt-2"
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
                    <p>{profileData.address?.line1}</p>
                    <p>{profileData.address?.line2}</p>
                  </>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={profileData.available}
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
              />
              <label className="text-gray-800">Available</label>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              {isEdit ? (
                <button
                  onClick={updateProfile}
                  className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
