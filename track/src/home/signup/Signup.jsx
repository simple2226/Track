import React, { useEffect, useState } from 'react'
import Logo from '../../assets/Logo'
import useColor from '../../contexts/homeColourContext'
import Loading from '../../assets/Loading'
import axios from 'axios'
import Exclamation from '../../assets/Exclamation'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Input({autoFocus, color, type, placeholder, val, set}) {
    return (
        <input
            autoFocus={autoFocus}
            type={type}
            className='transition-all ease-linear duration-[.1s] h-[50px] w-[100%] bg-[#ffffff00] rounded-md border-[1px] outline-none text-[.7rem] 500:text-[.9rem] font-[100] 500:font-[200] p-[11px] hover:brightness-[.8] focus:brightness-[.7]'
            style={{
                border: `1px solid #${color}70`,
            }}
            placeholder={placeholder}
            value={val}
            onChange={(e) => {set(e)}}
        />
    )
}

export default function Signup() {
    const navigate = useNavigate()
    const domain = useSelector(state => state.globals.domain)
    const { color } = useColor()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showName, setShowName] = useState('')
    const [age, setAge] = useState('')
    const [job, setJob] = useState('0')
    const JOB = {
        '1': 'batter',
        '2': 'bowler',
        '3': 'all rounder'
    }
    const [loading, setLoading] = useState(false)
    const [disable, setDisable] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        document.title =`Track© - Signup`
    }, [])

    useEffect(() => {
        if(username) setError(false)
    }, [username])
    useEffect(() => {
        if(!username || !password || !confirmPassword || !showName || !age || job === '0') setDisable(true)
        else if(password !== confirmPassword) setDisable(true)
        else if(isNaN(age)) setDisable(true)
        else setDisable(false)
    }, [username, password, confirmPassword, showName, age, job])
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {window.removeEventListener('resize', handleResize)}
    }, [])
    const signUp = async () => {
        const url = `${domain}/accounts/add`
        const data = {
            username,
            password,
            job: JOB[job],
            age,
            showName
        }
        setLoading(true)
        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            navigate('/login')
        } catch(err) {
            if(err.response?.data.message === "username exists") {
                setError(true)
            }
        } finally {
            setLoading(false)
        }
    }
    return (
        <div
            className='relative overflow-x-hidden flex justify-center w-[100vw]'
            style={{background: `linear-gradient(135deg, white 45%, #${color}36)`}}
        >
            <form className='relative mt-[calc(30px+60px)] my-[77px] mx-[40px] flex flex-col justify-evenly items-center h-[520px] min-w-[250px] w-[400px] rounded-xl border-[1px] 500:border-[1px]' style={{border: `1px solid #${color}70`}} onSubmit={(e) => {e.preventDefault()}}>
                    <div className='absolute -bottom-10 text-[.9rem] 500:text-[1.1rem]'>Already have an account? <Link to='/login' className='cursor-pointer hover:underline' style={{color: `#${color}`}}>Login</Link></div>
                    <div className='flex items-center gap-4'>
                        <Logo color={`#${color}`} size={windowWidth > 500 ? '80px' : '60px'}/>
                        <h1 className='text-[1.3rem] 500:text-[2rem] font-[900]'>Get Started!</h1>
                    </div>
                    <div className='flex flex-col gap-2 w-[90%]'>
                        <div className='flex w-[100%] relative'>
                            <Input autoFocus={true} color={color} type='text' placeholder='Set your username...' val={username} set={(e) => setUsername(e.target.value.trim())}/>
                            {error ?
                                <Exclamation className='absolute self-center right-3' size='25' message='Username Already Exists'/>
                                :
                                ''
                            }
                        </div>
                        <Input autoFocus={false} color={color} type='password' placeholder='Set your password...' val={password} set={(e) => setPassword(e.target.value)}/>
                        <Input autoFocus={false} color={color} type='password' placeholder='Confirm password...' val={confirmPassword} set={(e) => setConfirmPassword(e.target.value)}/>
                        <Input autoFocus={false} color={color} type='text' placeholder='Enter you Full Name...' val={showName} set={(e) => setShowName(e.target.value.replace(/\b\w/g, char => char.toUpperCase()))}/>
                        <Input autoFocus={false} color={color} type='text' placeholder='Enter age...' val={age} set={(e) => setAge(e.target.value.trim())}/>
                        <select
                            className='transition-all ease-linear duration-[.1s] h-[50px] w-[100%] bg-[#ffffff00] rounded-md border-[1px] outline-none text-[.7rem] 500:text-[.9rem] font-[100] 500:font-[200] p-[11px] hover:brightness-[.8] focus:brightness-[.7]'
                            style={{
                                border: `1px solid #${color}70`,
                            }}
                            value={job}
                            onChange={(e) => {setJob(e.target.value)}}
                        >
                            <option value="0">---choose job as player---</option>
                            <option value="1">batter</option>
                            <option value="2">bowler</option>
                            <option value="3">all rounder</option>
                        </select>
                    </div>
                    <button
                        disabled={disable}
                        className={`${disable ? 'opacity-[.7]' : ''} flex items-center justify-center transition-all duration-[.07s] ease-linear h-[40px] w-[100px] text-white rounded-md border-[1px] active:brightness-[.9] hover:rounded-[25px]`}
                        style={{backgroundColor: `#${color}`}}
                        onClick={signUp}
                    >
                        {loading ? <Loading/> : 'Signup'}
                    </button>
            </form>
        </div>
    )
}