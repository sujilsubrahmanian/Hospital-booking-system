


import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { firestore } from "../../firebase"; // Import Firebase setup
import { toast } from "react-toastify";
import Modal from "react-modal";
import starIcon from "../../assets/images/Star.png";

Modal.setAppElement("#root");

const DoctorCard = ({ doctor, onDoctorUpdated, onDoctorDeleted }) => {
  const {
    id,
    name,
    specialty,
    avgRating,
    photo,
    hospital,
    about,
    education,
    experience,
    fee,
    timeslots,
    totalPatients,
    totalRating,
    verified,
  } = doctor;

  const user = localStorage.getItem("email");
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedDoctor, setEditedDoctor] = useState({ ...doctor });
  const [selectedFile, setSelectedFile] = useState(null);
  const [updatedTimeslots, setUpdatedTimeslots] = useState(
    timeslots.map((slot) => new Date(slot.seconds * 1000).toISOString().slice(0, 16))
  );
  const [isVerified, setIsVerified] = useState(verified);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDoctor({ ...editedDoctor, [name]: value });
  };

  // Handle timeslot change
  const handleTimeslotChange = (index, value) => {
    const updatedSlots = [...updatedTimeslots];
    updatedSlots[index] = value;
    setUpdatedTimeslots(updatedSlots);
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle update
  const handleUpdate = async () => {
    try {
      const doctorRef = doc(firestore, "doctors", id);
      const updatedDoctor = {
        ...editedDoctor,
        photo: selectedFile ? URL.createObjectURL(selectedFile) : editedDoctor.photo,
        timeslots: updatedTimeslots.map((slot) => ({ seconds: new Date(slot).getTime() / 1000 })),
      };

      await updateDoc(doctorRef, updatedDoctor);
      toast.success("Doctor details updated!");

      if (onDoctorUpdated) onDoctorUpdated(id, updatedDoctor);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Update failed!");
    }
  };

  // Handle delete
  const handleToggleVerify = async () => {
         try {
         const doctorRef = doc(firestore, "doctors", id);
         const newVerifiedStatus = !isVerified; // Toggle current state
    
          await updateDoc(doctorRef, { verified: newVerifiedStatus });
        setIsVerified(newVerifiedStatus); // Update UI immediately
    
          toast.success(`Doctor ${newVerifiedStatus ? "verified" : "unverified"} successfully!`);
        } catch (error) {
          console.error("Verification update error:", error);
         toast.error("Failed to update verification status.");
     }
      };

  return (
    <div className="p-3 lg:p-5 bg-white shadow-lg rounded-lg text-center">
      <div className="w-full h-56 overflow-hidden rounded-md">
        <img src={photo} className="w-full h-full object-cover" alt={name} />
      </div>

      <h2 className="text-[18px] font-semibold mt-3">{name}</h2>
      <div className="flex justify-between items-center mt-2">
        <span className="bg-[#CCF0F3] px-3 py-1 rounded-md text-sm">{specialty}</span>
        <div className="flex items-center gap-1">
          <img src={starIcon} className="w-4 h-4" alt="rating" />
          <span className="text-sm font-medium">{avgRating}</span>
        </div>
      </div>

      <div className="mt-2">
        <span className="text-gray-600 text-sm">{education}</span>
        <div className="flex justify-center gap-4 mt-3">
          {!isAdminPage && (
            user ? (
              <Link to={`/doctors/${id}`}>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-blue-700 whitespace-nowrap">
                  Book Now
                </button>
              </Link>
            ) : (
              <Link to={"/login"}>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-blue-700 whitespace-nowrap">
                  Book Now
                </button>
              </Link>
            )
          )}

          {isAdminPage && (
            <div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="border border-blue-500 px-3 py-1 text-sm text-blue-500 rounded-md hover:bg-blue-500 hover:text-white"
              >
                EDIT
              </button>
              <button
                onClick={handleToggleVerify}
                className={`border px-3 py-1 text-sm rounded-md ${
                  isVerified ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-white" 
                            : "border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                }`}
              >
                {isVerified ? "Unverify" : "Verify"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative overflow-y-auto max-h-[80vh]">
          <h2 className="text-xl font-semibold mb-4">Edit Doctor Details</h2>
          <div className="space-y-3 p-2">
            <input type="text" name="name" value={editedDoctor.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" />
            <textarea name="about" value={editedDoctor.about} onChange={handleChange} placeholder="About" className="w-full p-2 border rounded"></textarea>
            <input type="text" name="specialty" value={editedDoctor.specialty} onChange={handleChange} placeholder="Speciality" className="w-full p-2 border rounded" />
            <input type="text" name="education" value={editedDoctor.education} onChange={handleChange} placeholder="Education" className="w-full p-2 border rounded" />
            <input type="text" name="experience" value={editedDoctor.experience} onChange={handleChange} placeholder="Experience" className="w-full p-2 border rounded" />
            <input type="text" name="fee" value={editedDoctor.fee} onChange={handleChange} placeholder="Fee" className="w-full p-2 border rounded" />
            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded" />
            {selectedFile && <img src={URL.createObjectURL(selectedFile)} className="w-24 h-24 object-cover rounded mt-2" alt="preview" />}

            <div>
              <h3 className="font-semibold">Available Time Slots:</h3>
              {updatedTimeslots.map((slot, index) => (
                <input
                  key={index}
                  type="datetime-local"
                  value={slot}
                  onChange={(e) => handleTimeslotChange(index, e.target.value)}
                  className="w-full p-2 border rounded"
                />
              ))}
            </div>
          </div>
          <div className="sticky bottom-0 left-0 right-0 bg-white p-4 border-t flex justify-end gap-2">
            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
            <button onClick={handleUpdate} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DoctorCard;
