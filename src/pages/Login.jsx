

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signup from '../assets/images/loginp.gif';
import { auth, firestore } from "../firebase"; 
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore"; 
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [role, setRole] = useState(null); // ✅ Initialize as null
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // ✅ Effect to check if the user is already logged in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const storedRole = localStorage.getItem("role");
                if (storedRole) {
                    setRole(storedRole);
                }
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (role) {
            switch (role) {
                case "superadmin":
                    navigate('/superadmin');
                    break;
                case "admin":
                    navigate('/admin');
                    break;
                default:
                    navigate('/doctors');
                    break;
            }
        }
    }, [role, navigate]); // Ensure `navigate` is included in the dependency array
    

    // ✅ Function to fetch user details from Firestore
    const fetchUserDetails = async (uid) => {
        try {
            const patientsRef = collection(firestore, "patients");
            const q = query(patientsRef, where("uid", "==", uid));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                localStorage.setItem("role", userData.role); // ✅ Store role in localStorage
                setRole(userData.role); // ✅ Update state
                
                console.log("User role:", userData.role);
            } else {
                console.log("No user found with this UID in Firestore.");
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    // ✅ Handle login function
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;
            console.log("User logged in:", user);

            toast.success("Login Successful!", { position: "top-right", autoClose: 3000 });

            // Store user details in localStorage
            localStorage.setItem("email", user.email);
            localStorage.setItem("userid", user.uid);

            // Fetch role from Firestore and update state
            await fetchUserDetails(user.uid);

            // ✅ Clear form after login
            setFormData({ email: "", password: "" });

        } catch (error) {
            console.error("Login Error:", error.message);
            let errorMessage = "Login failed. Please try again.";

            if (error.code === "auth/user-not-found") {
                errorMessage = "Email not registered. Please sign up.";
                navigate('/register');
            } else if (error.code === "auth/wrong-password") {
                errorMessage = "Incorrect password. Try again.";
            } else if (error.code === "auth/invalid-email") {
                errorMessage = "Invalid email format.";
            }

            toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='px-5 lg:px-0'>
            <div className='w-full max-w-[1100px] mx-auto rounded-lg md:p-10'>
                <div className='grid grid-cols-1 lg:grid-cols-2'>

                    {/* Left Side - Image */}
                    <div className='hidden lg:block bg-primaryColor rounded-l-lg m-5'>
                        <figure className='rounded-l-lg'>
                            <img src={signup} alt="Signup" className='w-full rounded-l-lg' />
                        </figure>
                    </div>

                    {/* Login Form */}
                    <form className='py-4 md:py-0 m-5' onSubmit={handleLogin}>
                        <h3 className='text-[22px] leading-9 font-bold mb-5'>
                            Hello! <span className='text-primaryColor'>Welcome</span>
                        </h3>
                        <div className='mb-5'>
                            <input
                                type="email"
                                className='form-control'
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                placeholder='Enter Your Email'
                                name='email'
                                value={formData.email || ""}
                                required
                            />
                        </div>
                        <div className='mb-5'>
                            <input
                                type="password"
                                className='form-control'
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                                placeholder='Enter Your Password'
                                name='password'
                                value={formData.password || ""}
                                required
                            />
                        </div>

                        <div className='mb-3'>
                            <button
                                type='submit'
                                className='rounded-lg form-control bg-primaryColor text-black'
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </div>

                        <p className='text-textColor text-center'>
                            Don&apos;t have an account? <Link to={'/register'} className='text-primaryColor'>Register</Link>
                        </p>
                    </form>

                </div>
            </div>
        </section>
    );
};

export default Login;
