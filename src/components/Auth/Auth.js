import React, {useState} from 'react';
import {Avatar , Button ,Paper,Grid,Typography,Container} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useNavigate} from 'react-router-dom'
import Input from './Input';
import Icon from './icon';
import {GoogleOAuthProvider} from "@react-oauth/google";
import { GoogleLogin } from '@react-oauth/google';
import { signin, signup } from '../../actions/auth';
import jwt_decode from 'jwt-decode'
// import {GoogleLogin} from "react-google-login";
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const classes =useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup , setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const history =useNavigate();
    const [formData, setFormData]=useState(initialState)
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    
    const handleSubmit = (e) => {
      e.preventDefault();
      if (isSignup) {
        dispatch(signup(formData, history));
      } else {
        dispatch(signin(formData, history));
      }
    };
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const switchMode = () =>{
       setIsSignup((prevIsSignup) => !prevIsSignup);
       setShowPassword(false);
    };

     const onSuccess = async (res) => {
      const token=res.credential
      const decode=jwt_decode(res.credential)
      console.log(decode)
      const result={
        _id:decode.sub,
        _type:'user',
        email:decode.email,
        name:decode.name,
        imageUrl:decode.picture
      }
     try{
      dispatch({type:'AUTH',data:{result,token}});
      history('/')
     }
     catch (error){
      console.log(error)
     }
     };
    const onFailure= () =>
     {
       console.log("Google unsuccessfful")
     };
  const user=false;
  return (
    // <GoogleOAuthProvider
    //   clientId={'119754270216-faeor0gjmsi32pthg5j72b6lv8j9jg2o.apps.googleusercontent.com'}>
   <Container component="main" maxwidth="xs">
    <Paper className={classes.paper} elevation ={3}>
        <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
        </Avatar>
     <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In' }</Typography>
     <form className={classes.form} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {
            isSignup && (
                <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
            )
        }
        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
         {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type ="password" />}
      
       </Grid>
      
      {/* <GoogleOAuthProvider
      clientId="119754270216-faeor0gjmsi32pthg5j72b6lv8j9jg2o.apps.googleusercontent.com"
       render={(renderProps) =>(
        <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
      )}
      onSuccess={googleSuccess}
      onFailure={googleFailure}
      cookiePolicy="single_host_origin"
      /> */}
     <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
        {isSignup ?'Sign Up ' : 'Sign In'}
      </Button>
      <div>
        {user?(
          <div>Logged In</div>
        ):(
          <GoogleLogin
          onSuccess={(response)=>onSuccess(response)}
          onError={onFailure}
          />
        )}
      </div>

     </form>
     <Grid container justifyContent="flex-end" >
       <Grid item>
        <Button onClick={switchMode}>
            { isSignup ? 'Already have An account ? Sign In' :"Don't have an account ? Sign Up"}
        </Button>
       
       </Grid>
     </Grid>
    </Paper>
   </Container>
  //  </GoogleOAuthProvider>
  );
};

export default Auth;