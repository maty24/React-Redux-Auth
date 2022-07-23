import { loginWithEmailPassword, registerUserWithEmailPassword, singInWithGoogle, logoutFirebase  } from "../../firebase/providers"
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = () =>{
    return async(dispatch) =>{
        dispatch(checkingCredentials())
    }
}
//auth con google
export const startGoogleSignIn = () =>{
    return async(dispatch) =>{
        dispatch(checkingCredentials())
        const result = await singInWithGoogle();//me trae la info del user

        if(!result.ok) dispatch(logout(result.errorMessage));//si el ok es true 

        dispatch(login(result))
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {//datos  tradidos del dispatch desde el registrer user
    return async( dispatch ) => {

        dispatch( checkingCredentials() );//cambia el stado a checking

        const result = await registerUserWithEmailPassword({ email, password, displayName });//le envio los datos para que haga su logica
        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );//si la respuesta es ok (false) se dispara el logout

        dispatch( login( result ))//si sale bien 

    }

}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await loginWithEmailPassword({ email, password });
        console.log(result);

        if ( !result.ok ) return dispatch( logout( result ) );
        dispatch( login( result ));

    }
}

export const startLogout = () => {
    return async( dispatch ) => {
        
        await logoutFirebase();//aca mandamos el logout del firebase

        dispatch( logout() );//si sale vien dispara esto

    }
}