

import React, { useState, useEffect } from "react";
import { firestore, auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Devportel() {
  const [hospitals, setHospitals] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    logo: null,
    role: "admin",
  });

  useEffect(() => {
    const fetchHospitals = async () => {
      const querySnapshot = await getDocs(collection(firestore, "patients"));
      const hospitalList = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((hosp) => hosp.role === "admin");
      setHospitals(hospitalList);
    };
    fetchHospitals();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const uploadToCloudinary = async (file) => {
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "users_photo");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dw4vwx8bd/image/upload",
      { method: "POST", body: uploadData }
    );

    const data = await response.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password && formData.phone) {
      try {
        let logoUrl = "";
        if (formData.logo) {
          logoUrl = await uploadToCloudinary(formData.logo);
        }

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        const user = userCredential.user;

        await updateProfile(user, { displayName: formData.name, photoURL: logoUrl });

        const newAdmin = {
          uid: user.uid,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          logo: logoUrl,
          role: formData.role,
          createdAt: new Date(),
        };

        await addDoc(collection(firestore, "patients"), newAdmin);

        setHospitals([...hospitals, newAdmin]); // Update UI immediately

        // **Clear the form fields and hide the form**
        setFormData({ name: "", email: "", password: "", phone: "", logo: null, role: "admin" });
        setFormVisible(false);

        toast.success("Admin registered successfully!", { position: "top-right", autoClose: 3000 });
      } catch (error) {
        console.error("Error registering admin:", error);
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Admin Registration</h2>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 w-full hover:bg-blue-600"
        onClick={() => setFormVisible(!formVisible)}
      >
        {formVisible ? "Cancel" : "Add Admin"}
      </button>

      {formVisible && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow-md">
          <input
            type="text"
            name="name"
            placeholder="Hospital Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mb-2 border rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mb-2 border rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mb-2 border rounded-md"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mb-2 border rounded-md"
          />
          <input
            type="file"
            name="logo"
            onChange={handleChange}
            className="w-full px-3 py-2 mb-2"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md w-full hover:bg-green-600"
          >
            Register
          </button>
        </form>
      )}

      <h3 className="text-xl font-bold mt-6 text-gray-700">Registered Hospitals</h3>
      <ul className="mt-3">
        {hospitals.length > 0 ? (
          hospitals.map((hospital) => (
            <li key={hospital.id} className="bg-white p-3 rounded-md shadow-md my-2 flex items-center">
              <img
                src={hospital.logo || "https://via.placeholder.com/50"}
                alt="Logo"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold text-gray-700">{hospital.name}</p>
                <p className="text-gray-600">{hospital.email}</p>
                <p className="text-gray-600">{hospital.phone}</p>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-600 mt-2">No registered hospitals yet.</p>
        )}
      </ul>
    </div>
  );
}

export default Devportel;
