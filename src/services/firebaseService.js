import { db } from '../firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  query, 
  where,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';

// Collections
const COUNSELLORS_COLLECTION = 'counsellors';
const APPOINTMENTS_COLLECTION = 'appointments';
const PAYMENTS_COLLECTION = 'payments';

/**
 * Counsellor Services
 */

// Get all counsellors
export const getAllCounsellors = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COUNSELLORS_COLLECTION));
    const counsellors = [];
    querySnapshot.forEach((doc) => {
      counsellors.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return counsellors;
  } catch (error) {
    console.error('Error getting counsellors:', error);
    throw error;
  }
};

// Get counsellor by ID
export const getCounsellorById = async (counsellorId) => {
  try {
    const docRef = doc(db, COUNSELLORS_COLLECTION, counsellorId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('Counsellor not found');
    }
  } catch (error) {
    console.error('Error getting counsellor:', error);
    throw error;
  }
};

// Get counsellors by expertise
export const getCounsellorsByExpertise = async (expertise) => {
  try {
    const q = query(
      collection(db, COUNSELLORS_COLLECTION),
      where('expertise', 'array-contains', expertise)
    );
    const querySnapshot = await getDocs(q);
    
    const counsellors = [];
    querySnapshot.forEach((doc) => {
      counsellors.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return counsellors;
  } catch (error) {
    console.error('Error getting counsellors by expertise:', error);
    throw error;
  }
};

/**
 * Appointment Services
 */

// Create new appointment
export const createAppointment = async (appointmentData) => {
  try {
    const appointment = {
      ...appointmentData,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, APPOINTMENTS_COLLECTION), appointment);
    return {
      id: docRef.id,
      ...appointment
    };
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

// Get appointments by user ID
export const getAppointmentsByUserId = async (userId) => {
  try {
    const q = query(
      collection(db, APPOINTMENTS_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const appointments = [];
    querySnapshot.forEach((doc) => {
      appointments.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return appointments;
  } catch (error) {
    console.error('Error getting appointments:', error);
    throw error;
  }
};

// Get appointment by ID
export const getAppointmentById = async (appointmentId) => {
  try {
    const docRef = doc(db, APPOINTMENTS_COLLECTION, appointmentId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('Appointment not found');
    }
  } catch (error) {
    console.error('Error getting appointment:', error);
    throw error;
  }
};

// Update appointment status
export const updateAppointmentStatus = async (appointmentId, status) => {
  try {
    const docRef = doc(db, APPOINTMENTS_COLLECTION, appointmentId);
    await updateDoc(docRef, {
      status,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating appointment:', error);
    throw error;
  }
};

/**
 * Payment Services
 */

// Create payment record
export const createPayment = async (paymentData) => {
  try {
    const payment = {
      ...paymentData,
      status: 'success',
      method: 'QR',
      createdAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, PAYMENTS_COLLECTION), payment);
    return {
      id: docRef.id,
      ...payment
    };
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};

// Get payments by appointment ID
export const getPaymentByAppointmentId = async (appointmentId) => {
  try {
    const q = query(
      collection(db, PAYMENTS_COLLECTION),
      where('appointmentId', '==', appointmentId)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const payments = [];
      querySnapshot.forEach((doc) => {
        payments.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return payments[0]; // Return first payment
    }
    
    return null;
  } catch (error) {
    console.error('Error getting payment:', error);
    throw error;
  }
};

// Get all payments by user ID
export const getPaymentsByUserId = async (userId) => {
  try {
    const q = query(
      collection(db, PAYMENTS_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const payments = [];
    querySnapshot.forEach((doc) => {
      payments.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return payments;
  } catch (error) {
    console.error('Error getting payments:', error);
    throw error;
  }
};
