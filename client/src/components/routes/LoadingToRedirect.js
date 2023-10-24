import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';

const  LoadingToRedirect =()=> {
    const [count , setCount] = useState(5);
    let history = useHistory();

    useEffect(()=>{
            const interval = setInterval(()=>{
                setCount((currentCount)=> --currentCount);
            },1000); 
            // redirect once Count is equal to zero
            count === 0 && history.push('/');
            //cleanup
            return () => clearInterval(interval);
    },[count,history]);
    return (
        <div className="p-5 text-center">
            <p>Redirecting you in {count}</p>
        </div>
    )
}

export default LoadingToRedirect;
  