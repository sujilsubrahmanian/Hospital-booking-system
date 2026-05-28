import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";
import Checkout from "../Checkout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SidePanel = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedTimeslot, setSelectedTimeslot] = useState(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const doctorRef = doc(firestore, "doctors", id);
        const doctorSnap = await getDoc(doctorRef);
        if (!doctorSnap.exists()) throw new Error("Doctor not found");

        let doctorData = doctorSnap.data();
        const availableDatesSet = new Set();

        doctorData.timeslots?.forEach((slot) => {
          if (slot?.seconds) {
            const date = new Date(slot.seconds * 1000);
            availableDatesSet.add(date.toDateString());
          }
        });

        setAvailableDates([...availableDatesSet]);
        setDoctor(doctorData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [id]);

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    setSelectedTimeslot(null);

    const durationMinutes = (doctor?.duration || 1) * 60;

    // Fetch booked slots for the selected date
    const bookingsRef = collection(firestore, "bookings");
    const q = query(
      bookingsRef,
      where("doctorId", "==", id)
    );
    const querySnapshot = await getDocs(q);
    
    const bookedTimes = querySnapshot.docs
      .map((doc) => doc.data().timeslot)
      .filter((timestamp) => {
        const bookingDate = new Date(timestamp.seconds * 1000);
        return bookingDate.toDateString() === date.toDateString();
      })
      .map((timestamp) => {
        const bookingTime = new Date(timestamp.seconds * 1000);
        return bookingTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      });

    setBookedSlots(bookedTimes);

    const selectedDaySlots = doctor?.timeslots
      ?.filter((slot) => new Date(slot.seconds * 1000).toDateString() === date.toDateString())
      .flatMap((slot) => {
        let startTime = new Date(slot.seconds * 1000);
        let endTime = new Date(startTime.getTime() + durationMinutes * 60000);
        let slots = [];
        while (startTime < endTime) {
          let slotTime = startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          slots.push(slotTime);
          startTime = new Date(startTime.getTime() + 10 * 60000);
        }
        return slots;
      });

    setTimeSlots(selectedDaySlots || []);
  };

  return (
    <div className="shadow-lg p-6 bg-white rounded-lg max-w-lg mx-auto mt-2 w-full sm:w-96 md:w-[500px] lg:w-[600px]">
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">Error: {error}</p>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Book Appointment</h2>

          <div className="flex items-center justify-between text-lg font-semibold border-b pb-2">
            <span>Consultation Fee:</span>
            <span className="text-green-600">{doctor?.fee} Rs</span>
          </div>

          <div className="mt-5">
            <p className="font-medium text-gray-700">Select Date:</p>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              minDate={new Date()}
              includeDates={availableDates.map((date) => new Date(date))}
              className="border p-2 rounded w-full mt-2"
              placeholderText="Select an available date"
            />
          </div>

          {selectedDate && (
            <div className="mt-4">
              <p className="font-medium text-gray-700">Select Time Slot:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                {timeSlots.length > 0 ? (
                  timeSlots.map((slot, index) => {
                    const isBooked = bookedSlots.includes(slot);
                    return (
                      <button
                        key={index}
                        onClick={() => !isBooked && setSelectedTimeslot(slot)}
                        className={`p-2 text-sm font-semibold border rounded-md text-center transition duration-200 ease-in-out ${
                          isBooked
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
                            : selectedTimeslot === slot
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        disabled={isBooked}
                      >
                        {slot}
                      </button>
                    );
                  })
                ) : (
                  <p className="text-gray-500 text-sm col-span-3">No available slots</p>
                )}
              </div>
            </div>
          )}

          {selectedTimeslot && (
            <div className="mt-4 flex justify-center">
              <Checkout doctorId={id} doctor={doctor} selectedTimeslot={selectedTimeslot} selectedDate={selectedDate} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SidePanel;
