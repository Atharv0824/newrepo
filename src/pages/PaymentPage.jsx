import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { createAppointment, createPayment, updateAppointmentStatus } from '../services/firebaseService';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { notifySuccess, notifyInfo, notifyAppointmentBooked } = useNotification();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const details = localStorage.getItem('bookingDetails');
    if (!details) {
      alert('No booking details found');
      navigate('/counsellors');
      return;
    }
    setBookingDetails(JSON.parse(details));
  }, []);

  const handlePaymentConfirmed = async () => {
    if (!user || !bookingDetails) {
      alert('Invalid booking details');
      return;
    }

    setIsProcessing(true);

    try {
      // Create appointment in Firebase
      const appointmentData = {
        userId: user.id,
        userEmail: user.email,
        userName: user.fullName || user.name,
        counsellorId: bookingDetails.counsellorId,
        counsellorName: bookingDetails.counsellorName,
        counsellorImage: bookingDetails.counsellorImage,
        sessionType: bookingDetails.sessionType,
        price: bookingDetails.price,
        status: 'pending'
      };

      let appointment;
      let payment;

      try {
        // Try Firebase first
        appointment = await createAppointment(appointmentData);

        // Create payment record in Firebase
        const paymentData = {
          appointmentId: appointment.id,
          userId: user.id,
          userEmail: user.email,
          amount: bookingDetails.price,
          method: 'QR',
          status: 'success',
          counsellorName: bookingDetails.counsellorName,
          sessionType: bookingDetails.sessionType
        };

        payment = await createPayment(paymentData);

        // Update appointment status to paid
        await updateAppointmentStatus(appointment.id, 'paid');
        
        console.log('✅ Booking saved to Firebase');
      } catch (firebaseError) {
        // Fallback to localStorage
        console.warn('Firebase not available, saving to localStorage');
        
        // Save to localStorage
        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        appointment = {
          id: `apt-${Date.now()}`,
          ...appointmentData,
          status: 'paid'
        };
        appointments.push(appointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        
        const payments = JSON.parse(localStorage.getItem('payments') || '[]');
        payment = {
          id: `pay-${Date.now()}`,
          appointmentId: appointment.id,
          userId: user.id,
          amount: bookingDetails.price,
          method: 'QR',
          status: 'success'
        };
        payments.push(payment);
        localStorage.setItem('payments', JSON.stringify(payments));
      }

      // Show success message
      setShowSuccess(true);

      // Send notification for successful booking
      notifyAppointmentBooked(
        bookingDetails.counsellorName,
        bookingDetails.sessionType,
        bookingDetails.price
      );

      // Also send an info notification about the upcoming session
      setTimeout(() => {
        notifyInfo(
          'Appointment Details',
          `Don't forget to join your session on time. Check your dashboard for details.`,
          '/my-dashboard'
        );
      }, 1000);

      // Clear booking details
      localStorage.removeItem('bookingDetails');

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate('/my-dashboard');
      }, 3000);

    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Failed to process payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {showSuccess ? (
              /* Success Message */
              <Card className="bg-white text-center py-12">
                <div className="text-6xl mb-4 animate-bounce">🎉</div>
                <h2 className="text-3xl font-bold text-green-600 mb-4">
                  Payment Successful!
                </h2>
                <p className="text-xl text-gray-700 mb-2">
                  Your session has been booked successfully
                </p>
                <div className="mt-6 space-y-2 text-gray-600">
                  <p className="font-semibold">{bookingDetails.counsellorName}</p>
                  <p>{bookingDetails.sessionType === 'group' ? '👥 Group Session' : '👤 Individual Session'}</p>
                  <p className="text-green-600 font-bold">Amount Paid: ₹{bookingDetails.price}</p>
                </div>
                <p className="mt-6 text-gray-500">
                  Redirecting to dashboard...
                </p>
              </Card>
            ) : (
              /* Payment Details */
              <div className="space-y-6">
                {/* Booking Summary */}
                <Card className="bg-white">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    📋 Booking Summary
                  </h2>
                  
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b">
                    <img
                      src={bookingDetails.counsellorImage}
                      alt={bookingDetails.counsellorName}
                      className="w-20 h-20 rounded-full object-cover border-4 border-indigo-100"
                      onError={(e) => {
                        e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(bookingDetails.counsellorName) + '&background=6366f1&color=fff&size=200';
                      }}
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {bookingDetails.counsellorName}
                      </h3>
                      <p className="text-gray-600">
                        {bookingDetails.expertise?.join(', ')}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-yellow-500">⭐</span>
                        <span className="font-semibold text-gray-700">{bookingDetails.rating}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-600">{bookingDetails.experience} years exp.</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-indigo-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Session Type</p>
                      <p className="text-lg font-bold text-indigo-600">
                        {bookingDetails.sessionType === 'group' ? '👥 Group Session' : '👤 Individual Session'}
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Amount to Pay</p>
                      <p className="text-2xl font-bold text-green-600">₹{bookingDetails.price}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Note:</strong> After payment confirmation, you will receive an email with session details and meeting link.
                    </p>
                  </div>
                </Card>

                {/* QR Code Section */}
                <Card className="bg-white">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    📱 Scan QR to Pay
                  </h2>
                  
                  <div className="flex flex-col items-center">
                    {/* Fake QR Code */}
                    <div className="relative w-64 h-64 bg-white border-4 border-indigo-100 rounded-xl shadow-lg p-4 mb-6">
                      <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center relative overflow-hidden">
                        {/* QR Code Pattern Simulation */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="grid grid-cols-8 gap-1 p-4">
                            {Array.from({ length: 64 }).map((_, i) => (
                              <div
                                key={i}
                                className={`w-4 h-4 ${Math.random() > 0.5 ? 'bg-white' : 'bg-transparent'}`}
                              ></div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Center Logo */}
                        <div className="relative z-10 bg-white p-4 rounded-xl shadow-lg">
                          <div className="text-4xl">💳</div>
                        </div>

                        {/* Corner Markers */}
                        <div className="absolute top-4 left-4 w-12 h-12 border-4 border-white rounded-lg"></div>
                        <div className="absolute top-4 right-4 w-12 h-12 border-4 border-white rounded-lg"></div>
                        <div className="absolute bottom-4 left-4 w-12 h-12 border-4 border-white rounded-lg"></div>
                      </div>
                    </div>

                    {/* Payment Instructions */}
                    <div className="text-center mb-6">
                      <p className="text-lg font-semibold text-gray-900 mb-2">
                        UPI Payment Options
                      </p>
                      <div className="flex gap-4 justify-center mb-4">
                        <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          Google Pay
                        </span>
                        <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                          PhonePe
                        </span>
                        <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                          Paytm
                        </span>
                        <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                          BHIM
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Scan the QR code with any UPI app to make payment
                      </p>
                    </div>

                    {/* Confirm Payment Button */}
                    <Button
                      variant="primary"
                      className="px-12 py-4 text-lg font-semibold"
                      onClick={handlePaymentConfirmed}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          ✅ I Have Paid
                        </span>
                      )}
                    </Button>

                    <p className="mt-4 text-gray-500 text-sm">
                      By confirming, you agree to our Terms & Conditions
                    </p>
                  </div>
                </Card>

                {/* Cancel Button */}
                <div className="text-center">
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/counsellors')}
                    className="text-gray-600"
                  >
                    ← Back to Counsellors
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PaymentPage;
