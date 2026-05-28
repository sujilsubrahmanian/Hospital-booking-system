

import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase'; // Adjust based on your Firebase config location
import { collection, getDocs } from 'firebase/firestore';

function AdmPatients() {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'patients'));
        const patientList = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || 'N/A',
            uid: data.uid || 'N/A',
            phone: data.phone || 'N/A',
            email: data.email || 'N/A',
            age: data.age || 'N/A',
            gender: data.gender || 'N/A',
            allergy: data.allergy || 'None',
            createdAt: data.createdAt ? data.createdAt.toDate().toLocaleDateString() : 'N/A'
          };
        });
        setPatients(patientList);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(patient =>
    (patient.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (patient.uid?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (patient.phone?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Registered Patients</h2>
      
      {/* Search Bar */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          className="border border-gray-400 rounded-lg p-2 w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search by Name, UID, or Phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">UID</th>
              <th className="py-2 px-4">Phone</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Age</th>
              <th className="py-2 px-4">Gender</th>
              <th className="py-2 px-4">Allergy</th>
              <th className="py-2 px-4">Date Registered</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map(patient => (
                <tr key={patient.id} className="border-b text-center hover:bg-gray-100">
                  <td className="py-2 px-4">{patient.name}</td>
                  <td className="py-2 px-4">{patient.uid}</td>
                  <td className="py-2 px-4">{patient.phone}</td>
                  <td className="py-2 px-4">{patient.email}</td>
                  <td className="py-2 px-4">{patient.age}</td>
                  <td className="py-2 px-4">{patient.gender}</td>
                  <td className="py-2 px-4">{patient.allergy}</td>
                  <td className="py-2 px-4">{patient.createdAt}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-4 text-center text-gray-500">No patients found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdmPatients;
