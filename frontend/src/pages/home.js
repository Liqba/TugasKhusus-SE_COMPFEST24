// import { useState } from 'react'
// import { useEffect } from 'react'

import { useDispatch } from 'react-redux'

// import { fetchProtectedInfo, onLogout } from '../api/auth'
import { onLogout } from '../api/auth'
import { unauthenticateUser } from '../redux/slices/authSlice'
import InputDeadline from "../components/InputDeadline";
import ListDeadline from "../components/ListDeadline";
import Layout  from "../components/Layout";


const Home = () => {
    const dispatch = useDispatch()
    // const [protectedData, setProtectedData] = useState(null)


    const logout = async () => {
        try {
          await onLogout()
    
          dispatch(unauthenticateUser())
          localStorage.removeItem('isAuth')
        } catch (error) {
          console.log(error.response)
        }
      }
    
    // const protectedInfo = async () => {
    //     try {
    //       const { data } = await fetchProtectedInfo()
    
    //       setProtectedData(data.info)

    //     } catch (error) {
    //       logout()
    //     }
    //   }

    // useEffect(() => {
    //     protectedInfo()
    // }, [])

    return (
        <Layout>
            <br/>
            <br/>
            <br/>
            <br/>
            <div class="flex items-center justify-center">
            <div className="container" class="p-5 w-1/2 scroll-mx-1 ">
              <div class="grid grid-cols-2">
                <div>
                  
                  <button onClick={() => logout()} className=' hover:bg-gray-200 text-red-500 p-4 rounded-xl hover:border-white cursor-pointer transition-all duration-500 ease-in-out transform hover:scale-105'>
                  Logout
                  </button>
                </div>
                <InputDeadline />
              </div>
                <div class="flex m-4 justify-center text-4xl font-bold text-gray-700">
                <h1>
                    Daftar Deadline
                </h1>
                </div>
                <ListDeadline />
            </div>

            </div>
        </Layout>

    )
}

export default Home