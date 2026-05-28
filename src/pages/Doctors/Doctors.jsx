

// import React, { useEffect, useState } from "react";
// import DoctorCard from "../../components/doctors/DoctorCard";
// import { getFirestore, collection, getDocs } from "firebase/firestore";

// const Doctors = () => {
//   const [allDoctors, setAllDoctors] = useState([]);
//   const [filteredDoctors, setFilteredDoctors] = useState([]); // Stores search results
//   const [searchTerm, setSearchTerm] = useState(""); // Tracks input value

//   // Fetch doctors from Firestore
//   useEffect(() => {
//     const getAllDoctors = async () => {
//       try {
//         const db = getFirestore();
//         const doctorsCollection = collection(db, "doctors");
//         const doctorsSnapshot = await getDocs(doctorsCollection);
//         const doctorsList = doctorsSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         setAllDoctors(doctorsList);
//         setFilteredDoctors(doctorsList); // Initialize with all doctors
//       } catch (error) {
//         console.error("Error fetching doctors:", error);
//       }
//     };

//     getAllDoctors();
//   }, []);

//   // Live Search Function: Filters results as the user types
//   useEffect(() => {
//     if (searchTerm.trim() === "") {
//       setFilteredDoctors(allDoctors); // Show all doctors if search is empty
//     } else {
//       const filtered = allDoctors.filter(
//         (doctor) =>
//           doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) // Search by name or specialty
//       );
//       setFilteredDoctors(filtered);
//     }
//   }, [searchTerm, allDoctors]); // Runs when searchTerm changes

//   return (
//     <>
//       <section className="bg-[#fff9ea]">
//         <div className="container text-center">
//           <div className="max-w-[570px] mt-[30px] mx-auto bg-orange-200 rounded-md flex items-center justify-between">
//             <input
//               type="search"
//               className="pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor  p-2"
//               placeholder="Search Doctors or Departments"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)} // Triggers filtering while typing
//             />
            
//           </div>
//         </div>
//       </section>

//       <section>
//         <div className="container">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4">
//             {filteredDoctors.length > 0 ? (
//               filteredDoctors.map((doctor) => (
//                 <DoctorCard key={doctor.id} doctor={doctor} />
//               ))
//             ) : (
//               <p className="text-center col-span-full text-gray-500 mt-4">
//                 No doctors found matching your search.
//               </p>
//             )}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Doctors;
import React, { useEffect, useState } from "react";
import DoctorCard from "../../components/doctors/DoctorCard";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const Doctors = () => {
  const [allDoctors, setAllDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]); // Stores search results
  const [searchTerm, setSearchTerm] = useState(""); // Tracks input value

  // Fetch doctors from Firestore
  useEffect(() => {
    const getAllDoctors = async () => {
      try {
        const db = getFirestore();
        const doctorsCollection = collection(db, "doctors");
        const doctorsSnapshot = await getDocs(doctorsCollection);
        const doctorsList = doctorsSnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((doctor) => doctor.verified); // Filter verified doctors only

        setAllDoctors(doctorsList);
        setFilteredDoctors(doctorsList); // Initialize with verified doctors
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    getAllDoctors();
  }, []);

  // Live Search Function: Filters results as the user types
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredDoctors(allDoctors); // Show all verified doctors if search is empty
    } else {
      const filtered = allDoctors.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) // Search by name or specialty
      );
      setFilteredDoctors(filtered);
    }
  }, [searchTerm, allDoctors]); // Runs when searchTerm changes

  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <div className="max-w-[570px] mt-[30px] mx-auto bg-orange-200 rounded-md flex items-center justify-between">
            <input
              type="search"
              className="pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor  p-2"
              placeholder="Search Doctors or Departments"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Triggers filtering while typing
            />
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500 mt-4">
                No doctors found matching your search.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Doctors;
