

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { firestore } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Timestamp } from "firebase/firestore";


const Checkout = ({ doctorId, doctor, selectedTimeslot, selectedDate , pid }) => {
    const [showDialog, setShowDialog] = useState(false);
    const patientId = localStorage.getItem("userid");
    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(selectedDate, selectedTimeslot, doctorId, patientId);
    
    const handleBooking = async () => {
        try {
            if (!selectedDate || !selectedTimeslot || !doctorId || !patientId) {
                console.error("Missing booking details");
                return false;
            }

            const [time, period] = selectedTimeslot.split(" ");
            const [hours, minutes] = time.split(":").map(Number);
            let formattedHours = period === "PM" && hours !== 12 ? hours + 12 : hours;
            if (period === "AM" && hours === 12) formattedHours = 0;

            const selectedDateTime = new Date(selectedDate);
            selectedDateTime.setHours(formattedHours, minutes, 0);
            if (isNaN(selectedDateTime.getTime())) {
                throw new Error("Invalid date-time value");
            }

            const timeslotTimestamp = Timestamp.fromDate(selectedDateTime);

            await addDoc(collection(firestore, "bookings"), {
                doctorId,
                patientId,
                timeslot: timeslotTimestamp,
                status: "confirmed",
                createdAt: Timestamp.now(),
            });

            navigate("/success");
        } catch (error) {
            console.error("Error adding booking:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-1 ">
            <h2 className="text-2l text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-6 py-3 rounded-lg shadow-md text-center mb-3">
    Confirm Your Booking by Clicking Below
</h2>

            <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700" 
                onClick={() => setShowDialog(true)}
            >
                Confirm Booking
            </button>

            {showDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <p className="text-lg font-medium mb-4">
                            Are you sure you want to confirm this booking?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                onClick={handleBooking}
                            >
                                Yes
                            </button>
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                onClick={() => setShowDialog(false)}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;


