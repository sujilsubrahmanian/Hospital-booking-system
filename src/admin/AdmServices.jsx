// import React, { useEffect, useState } from 'react';
// import { firestore } from '../firebase'; // Import Firebase Firestore instance
// import { collection, getDocs } from 'firebase/firestore';
// import ServiceCard from '../components/services/ServiceCard';
// import { FaTrashAlt } from "react-icons/fa";

// const AdmServices = () => {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(firestore, 'services'));
//         const servicesData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setServices(servicesData);
//       } catch (error) {
//         console.error('Error fetching services:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchServices();
//   }, []);

//   if (loading) {
//     return <p>Loading services...</p>;
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//       {services.map((item, index) => (
//         <ServiceCard item={item} key={item.id} />
//       ))}
//     </div>
//   );
// };

// export default AdmServices;
import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase'; // Import Firebase Firestore instance
import { collection, onSnapshot } from 'firebase/firestore';
import ServiceCard from '../components/services/ServiceCard';
import { Link } from 'react-router-dom';
import { MDBBtn } from 'mdb-react-ui-kit';
import { FaPlus } from 'react-icons/fa';



const AdmServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real-time Firestore data fetch
    const unsubscribe = onSnapshot(collection(firestore, 'services'), (snapshot) => {
      const servicesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setServices(servicesData);
      setLoading(false);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading services...</p>;
  }

  return (
    <>
   <Link to={'/admin/serviceadd'}>
          <MDBBtn rounded color="success" size="sm" className="d-flex align-items-center mb-4">
  <FaPlus className="me-1" /> Add Service
</MDBBtn>
          </Link>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {services.map((item) => (
        <ServiceCard item={item} key={item.id} />
      ))}
    </div>
    </>
  );
};

export default AdmServices;

