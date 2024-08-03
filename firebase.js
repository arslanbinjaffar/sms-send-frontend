import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvKhUxKl4EEhujpHqUJ_HvSVKjps-czw4",
  authDomain: "sms-send-app.firebaseapp.com",
  projectId: "sms-send-app",
  storageBucket: "sms-send-app.appspot.com",
  messagingSenderId: "1065461762672",
  appId: "1:1065461762672:web:447c35d4776630dc2242b5",
  measurementId: "G-QP38CDWR68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const uploadImage = async (file) => {
  const imageRef = ref(storage, `postImages/${file.name + v4()}`);
  try {
    await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};