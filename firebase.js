import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBoXYI7Ed38iqmWEeJvJ9gKaFgnS0UD3Ws",
  authDomain: "netflix-clone-979dd.firebaseapp.com",
  projectId: "netflix-clone-979dd",
  storageBucket: "netflix-clone-979dd.firebasestorage.app",
  messagingSenderId: "254183751447",
  appId: "1:254183751447:web:76f9f37005f57edeee0152"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        } )
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }
}

const logout = () => {
    signOut(auth);
}

export {auth, db, login, signup, logout}