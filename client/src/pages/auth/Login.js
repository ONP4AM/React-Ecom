import React, { useState,useEffect } from "react";
import {auth, googleAuthProvider} from '../../firebase';
import {Button} from 'antd';
import { toast } from 'react-toastify';
import {useDispatch,useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import {createOrUpdateUser} from '../../functions/auth';
import { 
  MailOutlined,
  GoogleOutlined
} from "@ant-design/icons";
 

 const Login = ({history}) => { 
  const [email, setEmail] = useState("onkar0708@gmail.com");
  const [password, setPassword] = useState("");
  const [loading ,setLoading] = useState("false");
  const {user} = useSelector((state)=>({...state}));




useEffect(()=>{
  let intended = history.location.state;
  if(intended) {
    return
  }else{
    if (user && user.token) history.push ('/');
  }
  

},[user,history]);


let dispatch = useDispatch();


const roleBasedRedirect = (res) =>{

  //check if intended redirect
  let intended = history.location.state;
  if(intended){
    history.push(intended.from);
  }else{
    if(res.data.role ==='admin') {
      history.push('/admin/dashboard');
    }else{
      history.push('/user/history');
    }
  }
};


  const handleSubmit = async (e) => {
         e.preventDefault();  
        setLoading(true);
        try{
          const result = await auth.signInWithEmailAndPassword(email, password);
          //console.log(result);
          const {user} = result;
          const idTokenResult = await user.getIdTokenResult();

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
            roleBasedRedirect(res);
            })
          .catch((err)=> console.log(err));
         
        }catch(error){
          console.log(error);
          toast.error(error.message);
          setLoading(false);
        }
    };
    function googleLogin () {
      auth.signInWithPopup(googleAuthProvider)
      .then(async(result)=>{  
        const {user} = result;
        const idTokenResult = await user.getIdTokenResult();
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
            roleBasedRedirect(res);
            console.log(result)
            //setLoading(false);
            })
          .catch((err)=> console.log(err));
          //history.push('/');
       
      }) 
      .catch((err)=>{ console.log(err);
                    toast.error(err.message);
      });
    };
  const loginForm = () => (
    <form onSubmit={handleSubmit}>
        <input  type="email" 
                className="form-control" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                autoFocus
        />
        <br/>
        <input  type="password" 
                className="form-control" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                
        />
      <br/>
        <Button  
        type="submit"  
        className="mb-3 "
        onClick={handleSubmit} 
        icon ={<MailOutlined/>}  
        disabled ={!email || password <8 }
        >Login with email
        </Button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
        
          {loading ?( <h4>Login</h4>):( <h4 className="text-danger">Loging</h4>)}
          {loginForm()}

        <Button  
        type="danger" 
        className="mb-3 "
        onClick={googleLogin} 
        icon ={<GoogleOutlined/>}  
        >Login with Google
        </Button>
        <br/>
        <Link to="/password/forgot" className="text-danger p-1 float-end">Forgot password</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
