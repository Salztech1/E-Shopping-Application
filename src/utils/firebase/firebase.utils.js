import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAxaUNjs-1E9rJou9srlPDP9nG4YmQrJec",
    authDomain: "e-clothing-db-2743d.firebaseapp.com",
    projectId: "e-clothing-db-2743d",
    storageBucket: "e-clothing-db-2743d.appspot.com",
    messagingSenderId: "90569657765",
    appId: "1:90569657765:web:e2bd4e9040fef5c4a32c4c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.getCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)


export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {

    const userDocRef = doc(db, 'users', userAuth.uid)

    // console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef)
    // console.log(userSnapshot)
    // console.log(userSnapshot.exists())


    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef,
                {
                    displayName,
                    email,
                    createdAt
                })
        } catch (error) {
            console.log('Error creating the user', error.message)
        }

        return userDocRef
    }
}

