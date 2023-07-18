import React from 'react'
import { authenticate } from './AuthAPIs';
import {useNavigate, useLocation} from 'react-router-dom';
import ReactLoading from "react-loading";

export default function AuthenticatePage() {
    
    const navigate = useNavigate();
    const location = useLocation();
    
    const email = location.state?.email;
    
    const [token,setToken] = React.useState("");
    const [loading, setLoading] = React.useState(false);

        
    React.useEffect(() => {
        if (!email) {
          navigate('/login');
        }
        // Going back to login screen if there is no email to validate
    }, [email, navigate]);

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setLoading(true);
        const response = await authenticate(email,token);
        setLoading(false);
        
        if(response){
            localStorage.setItem("Twitter JWT", response.data);
            navigate("/home");
        }else{
            alert("Failure to login/signup");
            navigate("/login");
        } 
    }

    return (
        <div className='bg-[#CFD9DE] h-[100vh] flex justify-center items-center'>
            
            {loading === false ?
                
                <div className='rounded-[10px] bg-[white] login-modal h-[60%] w-[40%]'>
                    
                    <div className='w-full flex justify-center mt-8'>
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="brandLogo r-1cvl2hr r-4qtqp9 r-yyyyoo r-16y2uox r-8kz0gk r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg>
                    </div>

                    <div className='mt-8 text-[30px] font-bold text-center'>
                        Enter Token sent to your email
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        <div className='mt-8 text-center'>
                            <input onChange={(e)=>setToken(e.target.value)} className='w-[55%] border-1 border-solid border-[#CFD9DE] rounded-[3px] pe-2 pt-3 pb-3 ps-2' placeholder='Enter The Email Token'></input>
                        </div>

                        <div className='mt-8 text-center'>
                            <button className='h-[50px] w-[55%] bg-[black] text-white rounded-[25px] font-bold'>Authenticate Token</button>
                        </div>
                    </form>


                </div>

                :
                
                <ReactLoading type="spokes" color="#0000FF" height={100} width={50} />
            }

        </div>
    )
}
