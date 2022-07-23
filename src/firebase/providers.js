import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';


const googleProvider = new GoogleAuthProvider();

//regitro con google
export const singInWithGoogle = async() => {

    try {
        
        const result = await signInWithPopup(FirebaseAuth, googleProvider );
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        const { displayName, email, photoURL, uid } = result.user;
        
        return {
            ok: true,
            // User info
            displayName, email, photoURL, uid
        }
        

    } catch (error) {
        
        const errorMessage = error.message;
    
        return {
            ok: false,
            errorMessage,
        }
    }

}


export const registerUserWithEmailPassword = async({ email, password, displayName }) => {//traigo los datos 

    try {
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );//createuser es de firebase y le envio 3 parametros
        const { uid, photoURL } = resp.user;

        //esto es para actualizar el usuario  en firebase
        await updateProfile( FirebaseAuth.currentUser, { displayName });//para 

        return {//si sale todo bien envio lo siguiente
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        console.log(error);
        return { ok: false, errorMessage: error.message }//esto es un error persoalizado
    }

}


export const loginWithEmailPassword = async({ email, password }) => {

    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid, photoURL, displayName
        }

    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();//esto cierra todo
}
