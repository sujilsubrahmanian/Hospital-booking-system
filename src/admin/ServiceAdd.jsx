import React, { useState } from 'react';
import { firestore } from '../firebase'; // Import Firebase config
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

function ServiceAdd() {
  const [serviceName, setServiceName] = useState('');
  const [serviceDescr, setServiceDescr] = useState('');
  const navigate = useNavigate()

  const addService = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(firestore, 'services'), {
        name: serviceName,
        description: serviceDescr,
        createdAt: new Date(),
      });
      console.log('Service Added:', { serviceName, serviceDescr });
      setServiceName('');
      setServiceDescr('');
      alert('Service added successfully!');
      navigate('/admin')
    } catch (error) {
      console.error('Error adding service:', error);
      alert('Failed to add service. Try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Add Service</h1>
        <form onSubmit={addService} className="space-y-4">
          <input
            type="text"
            name="servicename"
            placeholder="Enter Service Name"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            name="servicedescr"
            placeholder="Enter Service Description"
            value={serviceDescr}
            onChange={(e) => setServiceDescr(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300 mb-3"
          >
            Add Service
          </button>
          <Link to={'/admin'}>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Cancel
            </button>

          </Link>
        </form>
      </div>
    </div>
  );
}

export default ServiceAdd;
