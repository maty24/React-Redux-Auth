import { singWithGoogle } from "../../firebase/providers"
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = (email, password) =>{
    return async(dispatch) =>{
        dispatch(checkingCredentials())
    }
}
//auth con google
export const startGoogleSignIn = () =>{
    return async(dispatch) =>{
        dispatch(checkingCredentials())
        const result = await singWithGoogle();//me trae la info del user

        if(!result.ok) dispatch(logout(result.errorMessage));//si el ok es true 

        dispatch(login(result))
    }
}