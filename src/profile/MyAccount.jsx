import React, { useEffect, useState } from "react";
import userimg from "../assets/images/avatar-icon.png";
import { useNavigate } from "react-router-dom";
import MyBooking from "./MyBooking";
import { firestore } from "../firebase";
import { collection, query, where, getDocs, doc, updateDoc, documentId } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkout from "../components/Checkout";

const MyAccount = () => {
  const [user, setUser] = useState(null);
  const [pid, setPid] = useState();
  const [profileImg, setProfileImg] = useState(userimg);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (userEmail) {
        try {
          const q = query(collection(firestore, "patients"), where("email", "==", userEmail));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const userData = { ...doc.data(), documentId: doc.id };
            setPid(userData.documentId)
        
            
            setUser(userData);
            setUpdatedUser(userData);
            setProfileImg(userData.photo || userimg);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };
    console.log(pid);
    
    fetchUserProfile();
  }, [userEmail]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Successfully logged out!", { position: "top-right", autoClose: 3000 });
    navigate("/login");
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const userRef = doc(firestore, "patients", user.documentId);
      await updateDoc(userRef, updatedUser);
      setUser(updatedUser);
      setIsModalOpen(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <section className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <div className="flex flex-col items-center">
            <figure className="rounded-full w-32 h-32 border-4 border-gray-300 p-1">
              <img src={profileImg} alt="User Avatar" className="rounded-full w-full h-full object-cover" />
            </figure>
            <div className="text-center mt-4">
              <h3 className="text-2xl font-semibold text-gray-800">{user?.name || "N/A"}</h3>
              <p className="text-gray-500">{user?.email || "N/A"}</p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <div className="bg-white p-3 rounded-lg border"><strong>Age:</strong> {user?.age || "N/A"}</div>
            <div className="bg-white p-3 rounded-lg border"><strong>Phone:</strong> {user?.phone || "N/A"}</div>
            <div className="bg-white p-3 rounded-lg border"><strong>Gender:</strong> {user?.gender || "N/A"}</div>
            <div className="bg-white p-3 rounded-lg border"><strong>Allergy:</strong> {user?.allergy || "N/A"}</div>
            <div className="bg-white p-3 rounded-lg border"><strong>PatientId:</strong> {user?.documentId || "N/A"}</div>
          </div>
          <button onClick={handleEdit} className="mt-4 w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Edit Profile
          </button>
          <button onClick={handleLogout} className="mt-2 w-full px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Logout
          </button>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">My Bookings</h2>
          <MyBooking />
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <input type="text" name="name" value={updatedUser.name || ""} onChange={handleChange} placeholder="Name" className="w-full p-2 mb-2 border rounded" />
            <input type="text" name="age" value={updatedUser.age || ""} onChange={handleChange} placeholder="Age" className="w-full p-2 mb-2 border rounded" />
            <input type="text" name="phone" value={updatedUser.phone || ""} onChange={handleChange} placeholder="Phone" className="w-full p-2 mb-2 border rounded" />
            <input type="text" name="gender" value={updatedUser.gender || ""} onChange={handleChange} placeholder="Gender" className="w-full p-2 mb-2 border rounded" />
            <input type="text" name="allergy" value={updatedUser.allergy || ""} onChange={handleChange} placeholder="Allergy" className="w-full p-2 mb-4 border rounded" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded">Save</button>
            </div>
          </div>
          {/* <Checkout pid={pid} /> */}
        </div>
       
      )}
    </section>

  );
};

export default MyAccount;
