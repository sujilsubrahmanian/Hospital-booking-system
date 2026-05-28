

import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";

const AdmBookings = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "doctors"));
        const doctorsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDoctors(doctorsList);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const fetchPatientDetails = async (uid) => {
    try {
      const q = query(collection(firestore, "patients"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const patientData = querySnapshot.docs[0].data();
        return {
          name: patientData.name || "Unknown",
          phone: patientData.phone || "N/A",
          uid: patientData.uid || "N/A",
        };
      }
      return { name: "Unknown", phone: "N/A", uid: "N/A" };
    } catch (error) {
      console.error("Error fetching patient details:", error);
      return { name: "Unknown", phone: "N/A", uid: "N/A" };
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp || !timestamp.toDate) return "Invalid Date";
    return timestamp.toDate().toLocaleString();
  };

  const fetchBookings = async (doctorId) => {
    setLoading(true);
    try {
      const q = query(
        collection(firestore, "bookings"),
        where("doctorId", "==", doctorId)
      );
      const querySnapshot = await getDocs(q);

      const bookingPromises = querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        const patientDetails = await fetchPatientDetails(data.patientId);
        return {
          id: doc.id,
          patientName: patientDetails.name,
          patientPhone: patientDetails.phone,
          patientUid: patientDetails.uid,
          timeslot: data.timeslot, // Keep as Firestore Timestamp for sorting
          formattedTimeslot: formatTimestamp(data.timeslot), // For display
          confirmation: data.confirmation || "Pending",
          arrival: data.arrival || "Waiting",
        };
      });

      let bookingData = await Promise.all(bookingPromises);

      // Sort bookings by latest appointment time first (descending order)
      bookingData.sort((a, b) => b.timeslot.toMillis() - a.timeslot.toMillis());

      setBookings(bookingData);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      const bookingRef = doc(firestore, "bookings", bookingId);
      await updateDoc(bookingRef, { confirmation: newStatus });
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, confirmation: newStatus } : b))
      );
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  const updateArrivalStatus = async (bookingId, newStatus) => {
    try {
      const bookingRef = doc(firestore, "bookings", bookingId);
      await updateDoc(bookingRef, { arrival: newStatus });
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, arrival: newStatus } : b))
      );
    } catch (error) {
      console.error("Error updating arrival status:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Doctor's Booking Details</h2>

      <div className="flex gap-4 overflow-x-auto mb-6">
        {doctors.map((doctor) => (
          <button
            key={doctor.id}
            className={`flex flex-col items-center p-3 border rounded-lg shadow-md transition ${
              selectedDoctor === doctor.id ? "bg-blue-500 text-white" : "bg-white"
            }`}
            onClick={() => {
              setSelectedDoctor(doctor.id);
              fetchBookings(doctor.id);
            }}
          >
            <img src={doctor.photo} alt={doctor.name} className="w-16 h-16 rounded-full mb-2 object-cover" />
            <span className="text-sm font-semibold">{doctor.name}</span>
          </button>
        ))}
      </div>

      {selectedDoctor && (
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-3">
            Bookings for {doctors.find((doc) => doc.id === selectedDoctor)?.name}
          </h3>
          {loading ? (
            <p>Loading bookings...</p>
          ) : bookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border border-4 border-gray-300 text-sm rounded-lg shadow-lg">
                <thead className="bg-gray-100 sticky top-0">
                  <tr className="text-left">
                    <th className="border border-gray-300 px-4 py-3">Patient Name</th>
                    <th className="border border-gray-300 px-4 py-3">Phone Number</th>
                    <th className="border border-gray-300 px-4 py-3">Patient UID</th>
                    <th className="border border-gray-300 px-4 py-3">Timeslot</th>
                    <th className="border border-gray-300 px-4 py-3">Booking Status</th>
                    <th className="border border-gray-300 px-4 py-3">Arrival Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
                    <tr
                      key={booking.id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100 transition`}
                    >
                      <td className="border border-gray-300 px-4 py-2">{booking.patientName}</td>
                      <td className="border border-gray-300 px-4 py-2">{booking.patientPhone}</td>
                      <td className="border border-gray-300 px-4 py-2">{booking.patientUid}</td>
                      <td className="border border-gray-300 px-4 py-2">{booking.formattedTimeslot}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <select
                          className="p-2 border rounded-md w-full bg-white"
                          value={booking.confirmation}
                          onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <select
                          className="p-2 border rounded-md w-full bg-white"
                          value={booking.arrival}
                          onChange={(e) => updateArrivalStatus(booking.id, e.target.value)}
                        >
                          <option value="Waiting">Waiting</option>
                          <option value="Arrived">Arrived</option>
                          <option value="Absent">Absent</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No bookings found for this doctor.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdmBookings;
