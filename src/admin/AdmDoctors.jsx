




import React, { useEffect, useState } from 'react';
import DoctorCard from '../components/doctors/DoctorCard';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { MDBBtn } from 'mdb-react-ui-kit';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdmDoctors = () => {
  const [allDoctors, setAllDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    const doctorsCollection = collection(db, "doctors");

    const unsubscribe = onSnapshot(doctorsCollection, (snapshot) => {
      const doctorsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAllDoctors(doctorsList);
      setFilteredDoctors(doctorsList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = allDoctors.filter(doctor =>
      doctor.name.toLowerCase().includes(lowercasedQuery) ||
      doctor.specialty.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredDoctors(filtered);
  }, [searchQuery, allDoctors]);

  return (
    <>
      <section className="bg-[#fff9ea] py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search Bar */}
            <div className="flex items-center bg-orange-200 rounded-md overflow-hidden w-full sm:max-w-md">
              <input
                type="search"
                className="pl-4 pr-2 bg-transparent w-full focus:outline-none placeholder:text-textColor py-2"
                placeholder="Search Doctors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded-r-md hover:bg-orange-600"
                onClick={() => setFilteredDoctors(allDoctors.filter(doctor =>
                  doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
                ))}
              >
                Search
              </button>
            </div>

            {/* Success Button */}
          <Link to={'/admin/doctoradd'}>
          <MDBBtn rounded color="success" size="sm" className="d-flex align-items-center">
  <FaPlus className="me-1" /> Add Doctor
</MDBBtn>
          </Link>


          </div>
        </div>
      </section>

      <section className="py-6">
        <div className="container mx-auto px-4">
          {loading ? (
            <p className="text-center text-gray-600">Loading doctors...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)
              ) : (
                <p className="text-center col-span-4 text-gray-600">No doctors found.</p>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AdmDoctors;
