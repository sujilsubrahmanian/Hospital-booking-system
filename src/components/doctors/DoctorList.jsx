

import { useEffect, useState } from "react";
import { firestore } from "../../firebase"; // Ensure correct Firebase setup
import { collection, query, orderBy, limit, getDocs, where } from "firebase/firestore";
import DoctorCard from "./DoctorCard";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsRef = collection(firestore, "doctors"); // Reference to the "doctors" collection
        const q = query(doctorsRef, orderBy("experience","desc"), limit(3)); // Order by "name" (or another field) and limit to 3
        const querySnapshot = await getDocs(q);

        const doctorsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })).filter((doctor)=>doctor.verified);

        setDoctors(doctorsData);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-2 lg:mt-3">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorList;
