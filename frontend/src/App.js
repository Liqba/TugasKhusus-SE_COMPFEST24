import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'

import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'

import { useSelector } from 'react-redux'

import React, { Fragment } from 'react';  


const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{isAuth ? <Outlet /> : <Navigate to='/login' />}</>
}

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{!isAuth ? <Outlet /> : <Navigate to='/' />}</>
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<Home />} />
        </Route>

        <Route element={<RestrictedRoutes />}>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Route>
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
