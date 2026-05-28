import React, { useEffect, useState } from 'react';
import { firestore } from '../../firebase'; // Import Firebase Firestore instance
import { collection, getDocs } from 'firebase/firestore';
import ServiceCard from './ServiceCard';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'services'));
        const servicesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setServices(servicesData);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <p>Loading services...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {services.map((item, index) => (
        <ServiceCard item={item} key={item.id} />
      ))}
    </div>
  );
};

export default ServiceList;
