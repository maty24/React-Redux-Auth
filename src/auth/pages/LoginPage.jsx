import { useDispatch, useSelector } from 'react-redux';//esto tiene mas peso que react router dom
import { Link as RouterLink } from 'react-router-dom';
import { useMemo } from 'react';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { checkingAuthentication, startGoogleSignIn } from '../../store/auth/thunks';



export const LoginPage = () => {
  const {status} = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const {email, password, onInputChange} = useForm({
    email:'matias@google.com',
    password: '12345'
  })
  const isAuthenticating = useMemo( ()=> status === 'checking', [status] )//memoriza el status

  const onSubmit = (e) =>{
    e.preventDefault();
    console.log({email, password});
    dispatch(checkingAuthentication())
  }

  const onGoogleSignIn = (e) =>{
    e.preventDefault();
    dispatch(startGoogleSignIn())
    
  }
  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
                name='email'
                value={email}
                onChange={onInputChange}
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                name='password'
                value={password}
                onChange={onInputChange}
              />
              
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button
                disabled={isAuthenticating}
                 type="submit"
                  variant='contained'
                   fullWidth
                   >
                  Login
                </Button>
              </Grid>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button
                disabled={isAuthenticating}
                 variant='contained'
                 fullWidth
                 onClick={onGoogleSignIn}
                  >
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}