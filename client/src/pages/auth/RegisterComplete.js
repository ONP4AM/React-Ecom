import React, { useState,useEffect } from "react";
import {auth} from '../../firebase';
import {useDispatch,useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ConsoleSqlOutlined } from "@ant-design/icons";
import {createOrUpdateUser} from '../../functions/auth';

const RegisterComplete = ({history}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const {user } = useSelector((state)=>({...state}));
    let dispatch = useDispatch();
    //props.history
    useEffect(()=>{ 
      setEmail(window.localStorage.getItem('emailForRegistration'));
      //console.log(window.location.href);
      //console.log(window.localStorage.getItem('emailForRegistration'));
    },[])
  const handleSubmit = async (e) => {
         e.preventDefault();
        if(!email || !password) {
            toast.error('Email and password are required')
            return;
        }
        if (password.length < 8) {
          toast.error('Password must be at least 8 characters');
          return;

        }

         try{ 
            const result = await auth.signInWithEmailLink(email,window.location.href)
            if(result.user.emailVerified){
              //remove user email from local storage
              window.localStorage.removeItem("emailForRegistration");
              //get user id token
              let user = auth.currentUser;
              await user.updatePassword(password)
              const idTokenResult= await user.getIdTokenResult();
              //redux
              console.log('user',user ,'idTokenResult',idTokenResult);
              
              
              
          createOrUpdateUser(idTokenResult.token)
          .then((res) =>{
              dispatch({
                type: 'LOGGED_IN_USER',
                payload:{
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            }) 
          .catch((err)=> console.log(err));
              //redirecct
              
              history.push('/')
            }
         }catch (error){
            console.log(error);
            toast.error(error.message); 
         }  
      
    };


  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
        <input  type="email" 
                className="form-control" 
                value={email} 
                disabled
        />
        <br/>
          <input  type="password" 
                className="form-control" 
                value={password} 
                placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
        />
        <button type="su bmit" className="btn btn-raised ">Complete RegistrationF</button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>RegisterComplete</h4>
          
          {completeRegistrationForm()}
        </div>
      </div>
     </div>
  );
};

export default RegisterComplete;
