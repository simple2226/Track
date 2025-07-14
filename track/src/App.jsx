import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetch_account, setStatus } from './redux/Slices'
import axios from 'axios'
import Account_Loading from './Account_Loading'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const status = useSelector(state => state.globals.status)
  const domain = useSelector(state => state.globals.domain)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post(`${domain}/auth/verify`, {}, {
          withCredentials: true
        })
        // console.log(response.data)
        dispatch(fetch_account(response.data))
        dispatch(setStatus(1))
      } catch (error) {
        console.log(error)
        dispatch(setStatus(2))
      }
    }
    getData()
  }, [dispatch])

  useEffect(() => {
    const path = location.pathname
    switch (status) {
      case 1:
        if(path === '/login') navigate('/')
        break;
      case 2:
        if(path !== '/' && path !== '/login' && path !== '/signup') navigate('/login')
        break;
      default:
        break;
    }
  }, [location, status])


  
  return (
    <div className='w-[100vw] min-w-[360px]'>
      {status === 0 ? (
        <Account_Loading/>
      ) : (
        <Outlet/>
      )}
    </div>
  )
}

export default App
