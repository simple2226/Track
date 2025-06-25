import React, { useEffect, useState } from 'react'
import Logo from '../../assets/Logo'
import useColor from '../../contexts/homeColourContext';
import Exclamation from '../../assets/Exclamation';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../assets/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { fetch_account, setStatus } from '../../redux/Slices';

export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const domain = useSelector(state => state.globals.domain)
    const { color } = useColor()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameErr, setUsernameErr] = useState(false)
    const [passwordErr, setPasswordErr] = useState(false)
    const [loading, setLoading] = useState(false)
    const [disable, setDisable] = useState(true)
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        document.title ='Track© - Login'
    }, [])

    useEffect(() => {
        window.addEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if(username) setUsernameErr(false)
    }, [username])

    useEffect(() => {
        if(password) setPasswordErr(false)
    }, [password])
    
    useEffect(() => {
        if(!username || !password) setDisable(true)
        else setDisable(false)
    }, [username, password])

    const login = async () => {
        const url = `${domain}/auth/login`
        const data = {
            username: username.trim(),
            password: password,
            generateTokens: true
        }
        try {
            setLoading(true)
            const response = await axios.post(url, data, {
                withCredentials: true
            })
            dispatch(fetch_account(response.data))
            dispatch(setStatus(1))
        } catch(err) {
            if(err.response.data.message === "usename does not exist") setUsernameErr(true)
            if(err.response.data.message === "invalid password") setPasswordErr(true)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            className='relative overflow-x-hidden flex justify-center w-[100vw]'
            style={{background: `linear-gradient(135deg, white 45%, #${color}36)`}}
        >
            <form
                className='relative mt-[calc(121px+60px)] my-[121px] mx-[40px] flex flex-col justify-evenly items-center h-[350px] min-w-[250px] w-[400px] rounded-xl border-[1px] 500:border-[1px]'
                onSubmit={(e) => {e.preventDefault()}}
                style={{border: `1px solid #${color}70`}}
            >
                    <div className='absolute -bottom-10 text-[.9rem] 500:text-[1.1rem]'>Do not have an account? <Link to='/signup' className='cursor-pointer hover:underline' style={{color: `#${color}`}}>SignUp</Link></div>
                    <div className='flex items-center gap-4'>
                        <Logo color={`#${color}`} size={windowWidth > 500 ? '80px' : '60px'}/>
                        <h1 className='text-[1.3rem] 500:text-[1.7rem] font-[900]'>Welcome Back!</h1>
                    </div>
                    <div className='relative flex flex-col gap-2 w-[90%]'>
                        <div className='flex w-[100%] relative'>
                            <input
                                autoFocus={true}
                                type="text"
                                className='transition-all ease-linear duration-[.1s] h-[50px] w-[100%] bg-[#ffffff00] rounded-md border-[1px] outline-none text-[.7rem] 500:text-[.9rem] font-[100] 500:font-[200] p-[11px] hover:brightness-[.8] focus:brightness-[.7]'
                                style={{
                                    border: `1px solid #${color}70`,
                                }}
                                placeholder='Enter your username...'
                                value={username}
                                onChange={(e) => setUsername(e.target.value.trim())}
                            />
                            {usernameErr ?
                                <Exclamation className='absolute self-center right-3' size='25' message='Invalid Username'/>
                                :
                                ''
                            }
                        </div>
                        <div className='flex w-[100%] relative'>
                            <input
                                type="password"
                                className='transition-all ease-linear duration-[.1s] h-[50px] w-[100%] bg-[#ffffff00] rounded-md border-[1px] outline-none text-[.7rem] 500:text-[.9rem] font-[100] 500:font-[200] p-[11px] hover:brightness-[.8] focus:brightness-[.7]'
                                style={{
                                    border: `1px solid #${color}70`,
                                }}
                                placeholder='Enter password...'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {passwordErr ?
                                <Exclamation className='absolute self-center right-3' size='25' message='Invalid Password'/>
                                :
                                ''
                            }
                        </div>
                    </div>
                    <button
                        disabled={disable}
                        className={`${disable ? 'opacity-[.7]' : ''} flex items-center justify-center transition-all duration-[.07s] ease-linear h-[40px] w-[100px] text-white rounded-md border-[1px] active:brightness-[.9] hover:rounded-[25px]`}
                        style={{backgroundColor: `#${color}`}}
                        onClick={login}
                    >
                        {loading ? <Loading/> : 'Login'}
                    </button>
            </form>
        </div>
    )
}