import React from 'react';
import heroimg1 from '../assets/images/hero-img01.png';
import heroimg2 from '../assets/images/hero-img02.png';
import heroimg3 from '../assets/images/hero-img03.png';
import icon1 from '../assets/images/icon01.png';
import icon2 from '../assets/images/icon02.png';
import icon3 from '../assets/images/icon03.png';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import About from '../components/About';
import ServiceList from '../components/services/ServiceList';
import DoctorList from '../components/doctors/DoctorList';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const Home = () => {
  const user = localStorage.getItem('email');
  const db = getFirestore();

  const findLocation = async () => {
    try {
      const patientsRef = collection(db, 'patients');
      const q = query(patientsRef, where('role', '==', 'admin'));
      const querySnapshot = await getDocs(q);
      let locations = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.location) {
          locations.push(data.location);
        }
      });
      if (locations.length > 0) {
        window.open(locations[0], '_blank');
      } else {
        console.log('No admin locations found.');
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className='hero_section pt-[60px] bg-gradient-to-r from-blue-500 to-indigo-600 text-white'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col lg:flex-row gap-12 items-center justify-between'>
            <div className='lg:w-1/2 text-center lg:text-left'>
              <h1 className='text-4xl font-bold leading-tight md:text-5xl'>
                We Help Patients Live a Healthy, Longer Life
              </h1>
              <p className='mt-4 text-lg'>
                Connecting patients with experienced doctors for timely medical care. Book appointments easily and take charge of your well-being today!
              </p>
              <div className='mt-6'>
                {user ? (
                  <Link to='/doctors'>
                    <button className='px-6 py-3 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition'>
                      Request an Appointment
                    </button>
                  </Link>
                ) : (
                  <Link to='/login'>
                    <button className='px-6 py-3 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition'>
                      Request an Appointment
                    </button>
                  </Link>
                )}
              </div>
            </div>
            <div className='lg:w-1/2 flex gap-4'>
              <img className='w-1/2 rounded-lg shadow-lg' src={heroimg1} alt='Hero' />
              <div className='flex flex-col gap-4'>
                <img className='w-full rounded-lg shadow-lg' src={heroimg2} alt='Hero 2' />
                <img className='w-full rounded-lg shadow-lg' src={heroimg3} alt='Hero 3' />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className='py-16 bg-gray-100'>
        <div className='container mx-auto text-center'>
          <h2 className='text-3xl font-bold text-gray-800'>Providing the Best Medical Services</h2>
          <p className='text-gray-600 mt-4'>
            We connect you with expert doctors for top-quality healthcare services.
          </p>
          <div className='flex flex-wrap justify-center gap-6 mt-10'>
            {[{ img: icon1, title: 'Find Doctor' }, { img: icon2, title: 'Find Location', action: findLocation }, { img: icon3, title: 'Book Appointment' }].map((service, index) => (
              <div key={index} className='bg-white shadow-lg rounded-lg p-6 w-64 hover:shadow-xl transition'>
                <img src={service.img} alt={service.title} className='w-16 h-16 mx-auto' />
                <h3 className='text-xl font-semibold mt-4'>{service.title}</h3>
                <p className='text-gray-500 mt-2'>
                  {service.title === 'Find Doctor' && 'Find and book appointments with trusted doctors across specialties.'}
                  {service.title === 'Find Location' && 'Locate our nearby clinics and hospitals quickly.'}
                  {service.title === 'Book Appointment' && 'Schedule your appointment with ease.'}
                </p>
                <button
                  onClick={service.action}
                  className='mt-4 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition'
                >
                  <BsArrowRight className='text-xl' />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <About />

      {/* Services List */}
      <section className='py-16 bg-white'>
        <div className='container mx-auto text-center'>
          <h2 className='text-3xl font-bold text-gray-800'>Our Medical Services</h2>
          <p className='text-gray-600 mt-4'>
            Comprehensive medical care from consultations to specialist support.
          </p>
          <ServiceList />
        </div>
      </section>

      {/* Doctors Section */}
      <section className='py-16 bg-gray-100'>
        <div className='container mx-auto text-center'>
          <h2 className='text-3xl font-bold text-gray-800'>Our Great Doctors</h2>
          <p className='text-gray-600 mt-4'>
            Meet our expert team dedicated to compassionate patient care.
          </p>
          <DoctorList />
        </div>
      </section>
    </>
  );
};

export default Home;
