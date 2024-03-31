import "../App.css"
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo-transparent-cropped.png';
import { useState, useEffect } from 'react';

export default function AppBar() {
    const [loginStatus, setLoginStatus] = useState(false);
    const [loginHover, setLoginHover] = useState('w-[20px]');
    
    const navigate = useNavigate();

    const logout = () => {
        console.log('Logging out...');
        window.localStorage.setItem('LOGGED_USER', JSON.stringify(null));
        window.location.reload();
    }

    useEffect(
        () => {
            const LOGGED_USER = JSON.parse(window.localStorage.getItem('LOGGED_USER')) || null;

            if (LOGGED_USER !== null) {
                setLoginStatus(true);
            } else {
                window.localStorage.setItem('LOGGED_USER', JSON.stringify(LOGGED_USER));
                navigate('/');
            }
        }, [loginStatus]
    )

    return (
        <>
            {loginStatus && 
                <div className="flex h-[106px] w-full items-start justify-center absolute">
                    <div className="flex items-center justify-between w-[69%] h-[69%] bg-dark-white rounded-b-[23px] p-[10px]">
                        <span className="flex w-fit items-center h-fit ml-[5px] hover:cursor-pointer"
                            onClick={()=>navigate('/home')}><img src={logo} alt="logo" className="h-[50px] w-auto" /></span>
                        <div className="flex flex-col gap-[2px] items-end justify-center mr-[10px] hover:cursor-pointer text-main-maroon hover:text-dark-gold"
                            onMouseEnter={()=>setLoginHover('w-full duration-100')}
                            onMouseLeave={()=>setLoginHover('w-[20px] duration-500')}
                            onClick={()=>logout()}>
                            <h3 className="font-bold text-[18px]">logout</h3>
                            <div className={"h-[3px] bg-main-maroon rounded-[12px] " + loginHover}/>
                        </div>
                    </div>
                </div>
            }
            
        </>
    )
};