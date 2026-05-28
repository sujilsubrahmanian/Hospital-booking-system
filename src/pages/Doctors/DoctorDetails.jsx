

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { firestore } from '../../firebase'; // Ensure correct Firebase config import
// import { doc, getDoc } from 'firebase/firestore';
// import star from '../../assets/images/star.png';
// import DoctorAbout from '../../components/doctors/DoctorAbout';
// import Feedback from '../../components/doctors/Feedback';
// import SidePanel from '../../components/doctors/SidePanel';

// const DoctorDetails = () => {
//   const [tab, setTab] = useState("about");
//   const [doctor, setDoctor] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     const getDoctor = async () => {
//       try {
//         const doctorRef = doc(firestore, "doctors", id);
//         const doctorSnap = await getDoc(doctorRef);

//         if (doctorSnap.exists()) {
//           setDoctor({ id: doctorSnap.id, ...doctorSnap.data() });
//         } else {
//           console.log("No such doctor found!");
//         }
//       } catch (error) {
//         console.error("Error fetching doctor details:", error);
//       }
//     };

//     getDoctor();
//   }, [id]);

//   if (!doctor) {
//     return <div className="text-center text-xl font-semibold">Loading...</div>;
//   }

//   return (
//     <section>
//       <div className="max-w-[1170px] px-5 mx-auto">
//         <div className="grid md:grid-cols-4 gap-[50px]">
//           <div className="md:col-span-2">
//           <figure className="d-flex justify-content-center align-items-center" style={{ maxWidth: "200px", maxHeight: "200px" }}>
//   <img src={doctor.photo} alt={doctor.name} className="w-100 h-auto rounded-md" />
// </figure>

//             <h3 className="text-headingColor text-[22px] font-bold">{doctor.name}</h3>
//             <p className="text-[14px] text-gray-600 mt-2">{doctor.specialty}</p>
//             <DoctorAbout doctor={doctor}/>

//           </div>
//           <SidePanel doctor={doctor} />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DoctorDetails;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import DoctorAbout from '../../components/doctors/DoctorAbout';
import SidePanel from '../../components/doctors/SidePanel';
import { MDBCard, MDBCardBody, MDBCardImage, MDBTypography, MDBContainer } from 'mdb-react-ui-kit';

const DoctorDetails = () => {
  const [doctor, setDoctor] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getDoctor = async () => {
      try {
        const doctorRef = doc(firestore, "doctors", id);
        const doctorSnap = await getDoc(doctorRef);

        if (doctorSnap.exists()) {
          setDoctor({ id: doctorSnap.id, ...doctorSnap.data() });
        } else {
          console.log("No such doctor found!");
        }
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    getDoctor();
  }, [id]);

  if (!doctor) {
    return <div className="text-center text-primary fw-bold mt-5">Loading doctor details...</div>;
  }

  return (
    <MDBContainer className="py-5">
      <div className="row d-flex align-items-start">
        {/* Left Section: Doctor Profile */}
        <div className="col-md-6">
          <MDBCard className="shadow-3 rounded-6 p-4">
            <div className="text-center">
              <MDBCardImage
                src={doctor.photo}
                alt={doctor.name}
                className=" shadow-2"
                style={{ width: "190px", height: "190px", objectFit: "cover", marginBottom: "10px" }}
              />
              <MDBTypography tag="h3" className="text-dark fw-bold mt-2">
                {doctor.name}
              </MDBTypography>
              <MDBTypography tag="p" className="text-green-500 font-semibold">{doctor.specialty}</MDBTypography>
            </div>
            <MDBCardBody className="p-3">
              <DoctorAbout doctor={doctor} />
            </MDBCardBody>
          </MDBCard>
        </div>

        {/* Right Section: Book Appointment (Better Aligned) */}
        <div className="col-md-6 d-flex justify-content-center">
          <SidePanel doctor={doctor} />
        </div>
      </div>
    </MDBContainer>
  );
};

export default DoctorDetails;

