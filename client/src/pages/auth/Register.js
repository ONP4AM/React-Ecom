import React, { useState } from "react";
import {auth} from '../../firebase';

import { toast } from 'react-toastify';


const Register = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
         e.preventDefault();
         const config = {
             url:process.env.REACT_APP_REGISTR_REDIRECT_URL,
             handleCodeInApp:true,
         };
     await auth.sendSignInLinkToEmail(email,config);
     toast.success(
         `Email is sent to ${email}. Click the link to complete your Registration`
         
         );
    //save users email
     window.localStorage.setItem('emailForRegistration',email) 
    //clear this.
    setEmail('');
    
    };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
        <input  type="email" 
                className="form-control" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                autoFocus
        />
      <br/>
        <button type="submit" className="btn btn-raised ">Register</button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
