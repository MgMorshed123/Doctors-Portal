import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { AdminContext } from "../../context/AdminContext";
import Swal from "sweetalert2";
import axios from "axios";
import { useThemeStore } from "@/context/useThems";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, atoken } = useContext(AdminContext);
  console.log(atoken);

  const { theme } = useThemeStore();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      // if (!docImg) {
      //   return Swal.fire({
      //     title: "Image not Selected",
      //     icon: "error",
      //   });
      // }

      const formData = new FormData();

      // formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience); // Fixed typo
      formData.append("fees", Number(fees)); // Fixed typo
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: {
            atoken: atoken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        Swal.fire({
          title: data.message,
          icon: "success",
        });
      }

      console.log("formdata", data);
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );

      Swal.fire({
        title: error.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className={`m-5 w-full  ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div
        className={` ${
          theme === "dark"
            ? "bg-black text-white border-white rounded"
            : "bg-white text-black"
        } px-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll`}
      >
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Uploaded"
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            // ID IMP ,WITHOUT IT CAN NOT UPLOAD
            id="doc-img"
            hidden
          />
          <p>
            Upload Doctor <br /> Picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1   flex flex-col gap-1">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border rounded px-3 py-2"
                type="text"
                name=""
                id=""
                placeholder="Name"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded px-3 py-2"
                type="email"
                name=""
                id=""
                placeholder="email"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password </p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border rounded px-3 py-2"
                type="password"
                name=""
                id=""
                placeholder="Password"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p> Experience </p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border rounded px-3 py-2"
              >
                <option value="1 Year"> 1 Year</option>
                <option value="2 Year"> 2 Year</option>
                <option value="3 Year"> 3 Year</option>
                <option value="4 Year"> 4 Year</option>
                <option value="5 Year"> 5 Year</option>
                <option value="6 Year"> 6 Year</option>
                <option value="7 Year"> 7 Year</option>
                <option value="8 Year"> 8 Year</option>
                <option value="9 Year"> 9 Year</option>
                <option value="10 Year"> 10 Year</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Fees </p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className="border rounded px-3 py-2"
                type="number"
                name=""
                id=""
                placeholder="fees"
                required
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality </p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="border rounded px-3 py-2"
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Education </p>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className="border rounded px-3 py-2"
                type="text"
                name=""
                id=""
                placeholder="Education"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Address </p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className="border rounded px-3 py-2"
                type="text"
                name=""
                id=""
                placeholder="Address 1"
                required
              />

              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="border rounded px-3 py-2"
                type="text"
                name=""
                id=""
                placeholder="Address 2"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <p className="mt-4 mb-2">About Doctor </p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full px-4 pt-2 border text-gray-400 rounded "
            name=""
            type="text"
            placeholder="Write About Doctor"
            rows={5}
            id=""
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-primary px-10 mt-4 py-3 rounded-full"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
