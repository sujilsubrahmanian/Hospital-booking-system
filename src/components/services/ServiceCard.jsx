// import React from "react";
// import { FaTrashAlt } from "react-icons/fa";
// import { MdEdit } from "react-icons/md";
// import { useLocation } from "react-router-dom";

// const ServiceCard = ({ item }) => {
//   const { name, description, bgColor, textColor } = item;
//   const location = useLocation();
//     const isAdminPage = location.pathname.startsWith("/admin");

//   return (
//     <div
//       className={`p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105`}
//       style={{ backgroundColor: bgColor || "#f8f9fa", color: textColor || "#333" }}
//     >
//       <h2 className="text-xl font-bold mb-3">{name}</h2>
//       <p className="text-sm mb-4">{description}</p>

//       {/* Action Buttons */}
//       {isAdminPage &&
//       <div className="flex items-center gap-4">
//         <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
//           <MdEdit size={18} />
//         </button>
//         <button className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
//           <FaTrashAlt size={16} />
//         </button>
//       </div>
// }
//     </div>
//   );
// };

// export default ServiceCard;
import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { firestore } from "../../firebase"; // Firestore Import
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

const ServiceCard = ({ item }) => {
  const { id, name, description, bgColor, textColor } = item;
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name, description });

  const handleEdit = async () => setEditMode(true);

  const handleSave = async () => {
    try {
      const docRef = doc(firestore, "services", id);
      await updateDoc(docRef, {
        name: formData.name,
        description: formData.description,
      });
      alert("Service updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("Failed to update service. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      const docRef = doc(firestore, "services", id);
      await deleteDoc(docRef);
      alert("Service deleted successfully!");
    } catch (error) {
      console.error("Error deleting document: ", error);
      alert("Failed to delete service. Please try again.");
    }
  };

  return (
    <div
      className={`p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200`}
      style={{ backgroundColor: bgColor || "#f8f9fa", color: textColor || "#333" }}
    >
      <h2 className="text-2xl font-bold mb-3">{name}</h2>
      <p className="text-sm mb-4 leading-relaxed">{description}</p>

      {isAdminPage && (
        <div className="flex items-center gap-4 mt-4">
          <button
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            onClick={handleEdit}
          >
            <MdEdit size={18} />
          </button>
          <button
            className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            onClick={handleDelete}
          >
            <FaTrashAlt size={16} />
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {editMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="p-6 bg-white rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Service</h2>
            <input
              className="w-full p-2 border border-gray-300 rounded-md mb-3"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Service Name"
            />
            <input
              className="w-full p-2 border border-gray-300 rounded-md mb-3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Service Description"
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 text-black p-2 rounded-md"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
