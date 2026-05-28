

// import React, { useState } from 'react';
// import signup from '../assets/images/signup.gif';
// import profile from '../assets/images/doctor-img02.png';
// import { Link, useNavigate } from 'react-router-dom';
// import { firestore } from '../firebase';
// import { addDoc, collection, getDocs, query, where } from '@firebase/firestore';
// import { toast } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";

// const Signup = () => {
//   const [url, setUrl] = useState("");  // Stores uploaded image URL
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     photo: "",
//     gender: "",
//     age: "",
//     phone: "",
//     allergy: ""
//   });

//   const usersCollection = collection(firestore, "patients");

//   // Handle text input changes
//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle file upload to Cloudinary
//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "users_photo");

//     try {
//       const response = await fetch(
//         "https://api.cloudinary.com/v1_1/dw4vwx8bd/image/upload",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await response.json();
//       if (data.secure_url) {
//         setUrl(data.secure_url);
//         setFormData((prev) => ({ ...prev, photo: data.secure_url })); // Store URL in form data
//       }
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };

//   // Handle user registration
//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       // Check if email already exists
//       const q = query(usersCollection, where("email", "==", formData.email));
//       const querySnapshot = await getDocs(q);

//       if (!querySnapshot.empty) {
//         toast.info("This email is already registered. Please log in instead.", {
//           position: "top-right",
//           autoClose: 3000, // Closes after 3 seconds
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           theme: "colored",
//         });
        
//         navigate('/login');
//         return;
//       }

//       // Add user to Firestore
//       await addDoc(usersCollection, formData);
//       setFormData({
//         name: "",
//         email: "",
//         password: "",
//         photo: "",
//         gender: "",
//         age: "",
//         phone: "",
//         allergy: ""
//       });

//       toast.success("Registration successful!", {
//         position: "top-right",
//         autoClose: 3000, // Closes after 3 seconds
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "colored",
//       });
      
//       navigate('/login');
//     } catch (error) {
//       console.error("Error registering user:", error);
//     }
//   };

//   return (
//     <section>
//       <div className='mx-auto max-w-[1100px] '>
//         <div className='grid grid-cols-1 lg:grid-cols-2'>
//           {/* Image */}
//           <div className='hidden lg:block bg-primaryColor rounded-l-lg'>
//             <figure className='rounded-l-lg'>
//               <img src={signup} alt="" className='w-full rounded-l-lg' />
//             </figure>
//           </div>

//           {/* Form */}
//           <div className='rounded-l-lg lg:pl-14 '>
//             <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-5'>
//               Create an <span className='text-primaryColor'>Account</span>
//             </h3>

//             <form onSubmit={handleRegister}>

//               {/* Profile Picture Upload */}
//               <div className='flex items-center gap-3'>
//                 <label>
//                   <input type="file" id='customFile' onChange={handleFileChange} style={{ display: 'none' }} />
//                   <img
//                     width={'70px'}
//                     height={'200px'}
//                     className='ml-5 rounded-full'
//                     src={url || profile} // Show uploaded image if available
//                     alt="Profile"
//                   />
//                 </label>
//               </div>

//               {/* Input Fields */}
//               <div className='mb-3 p-3'>
//                 <input type="text" className='form-control'
//                   placeholder='Full Name' name='name' value={formData.name} onChange={handleInputChange} required />
//               </div>
//               <div className='mb-3 p-3'>
//                 <input type="number" className='form-control'
//                   placeholder='Age' name='age' value={formData.age} onChange={handleInputChange} required />
//               </div>
//               <div className='mb-3 p-3'>
//                 <input type="tel" className='form-control'
//                   placeholder='Phone No' name='phone' value={formData.phone} onChange={handleInputChange} required />
//               </div>
//               <div className='mb-3 p-3'>
//                 <input type="text" className='form-control'
//                   placeholder='Any Allergy' name='allergy' value={formData.allergy} onChange={handleInputChange} />
//               </div>
//               <div className='mb-3 p-3'>
//                 <input type="email" className='form-control'
//                   placeholder='Email' name='email' value={formData.email} onChange={handleInputChange} required />
//               </div>

//               <div className='mb-3 p-3'>
//                 <input type="password" className='form-control'
//                   placeholder='Password' name='password' value={formData.password} onChange={handleInputChange} required />
//               </div>

//               {/* Gender Selection */}
//               <div className='mb-3 flex items-center justify-between'>
//                 <label htmlFor="" className='text-headingColor text-[16px] leading-7 font-bold '>
//                   Gender
//                   <select name="gender" value={formData.gender} onChange={handleInputChange} id="" className='font-semibold text-[15px] focus:outline-none'>
//                     <option value="">Select</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </label>
//               </div>

//               {/* Register Button */}
//               <div className='mb-3 p-3'>
//                 <button type='submit' className='rounded-lg form-control bg-primaryColor text-black '>Register</button>
//               </div>

//               {/* Login Redirect */}
//               <p className='text-textColor text-center'>
//                 Already have an account? <Link to={'/login'} className='text-primaryColor'>Login</Link>
//               </p>

//             </form>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import signup from "../assets/images/signup.gif";
import profile from "../assets/images/doctor-img02.png";
import { Link, useNavigate } from "react-router-dom";
import { firestore, auth } from "../firebase"; // Import Firebase Auth
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
    gender: "",
    age: "",
    phone: "",
    allergy: "",
    role: "patient"
  });

  const usersCollection = collection(firestore, "patients");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload to Cloudinary
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "users_photo");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dw4vwx8bd/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        setUrl(data.secure_url);
        setFormData((prev) => ({ ...prev, photo: data.secure_url }));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Register user with Firebase Authentication
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Check if email already exists in Firestore
      const q = query(usersCollection, where("email", "==", formData.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast.info("This email is already registered. Please log in instead.", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/login");
        return;
      }

      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Update user profile with name and photo
      await updateProfile(user, {
        displayName: formData.name,
        photoURL: url,
        role: formData.role
      });

      // Store user data in Firestore
      await addDoc(usersCollection, {
        uid: user.uid,
        name: formData.name,
        email: formData.email,
        photo: url,
        gender: formData.gender,
        age: formData.age,
        phone: formData.phone,
        allergy: formData.allergy,
        role: formData.role,
        createdAt: new Date()
      });

      setFormData({
        name: "",
        email: "",
        password: "",
        photo: "",
        gender: "",
        age: "",
        phone: "",
        allergy: ""
      });

      toast.success("Registration successful!", {
        position: "top-right",
        autoClose: 3000,
      });

      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error(error.message);
    }
  };

  return (
    <section>
      <div className="mx-auto max-w-[1100px]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img src={signup} alt="" className="w-full rounded-l-lg" />
            </figure>
          </div>

          {/* Form */}
          <div className="rounded-l-lg lg:pl-14">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-5">
              Create an <span className="text-primaryColor">Account</span>
            </h3>

            <form onSubmit={handleRegister}>
              {/* Profile Picture Upload */}
              <div className="flex items-center gap-3">
                <label>
                  <input
                    type="file"
                    id="customFile"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  <img
                    width={"70px"}
                    height={"200px"}
                    className="ml-5 rounded-full"
                    src={url || profile}
                    alt="Profile"
                  />
                </label>
              </div>

              {/* Input Fields */}
              <div className="mb-3 p-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3 p-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3 p-3">
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Phone No"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3 p-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3 p-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Gender Selection */}
              <div className="mb-3 flex items-center justify-between">
                <label className="text-headingColor text-[16px] leading-7 font-bold">
                  Gender
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="font-semibold text-[15px] focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>

              {/* Register Button */}
              <div className="mb-3 p-3">
                <button type="submit" className="rounded-lg form-control bg-primaryColor text-black">
                  Register
                </button>
              </div>

              {/* Login Redirect */}
              <p className="text-textColor text-center">
                Already have an account?{" "}
                <Link to={"/login"} className="text-primaryColor">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;

