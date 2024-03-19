// Register.js
import { useState } from 'react';
import Layout  from '../components/Layout';
import { Link } from 'react-router-dom'
import { onRegistration } from '../api/auth'


const Register = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log("test");
    try {
      const { data } = await onRegistration(values)
      setError('')
      setSuccess(data.message)
      setValues({ username: '', password: '' })
    } catch (error) {
      setError(error.response.data.errors[0].msg)
      setSuccess('')
    }
  };

  return (
    <Layout>
      <div class="flex min-h-screen w-full items-center justify-center ">
        <div class="rounded-lg px-8 py-6 w-2/6 bg-white shadow-md">
        <h1 class="text-2xl font-bold text-center mb-4">Register</h1>
          <form onSubmit={(e) => onSubmit(e)}>
            <div class="mb-4">
              <label for="username" class="block text-sm font-medium text-black mb-2">
                Username</label>
				      <input type="text" onChange={(e) => onChange(e)} value={values.username} name="username" id="username" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="username" required/>
            </div>
            <div class="">
              <label for="password" class="block text-sm font-medium text-black mb-2">
                Password</label>
              <input type="password" onChange={(e) => onChange(e)} values={values.password} name="password" id="password" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required/>
            </div>
            <Link to="/login"
            class="flex mb-4 text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 justify-end">
              Already have an account? </Link>
            <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>
            <div style={{ color: 'green', margin: '10px 0' }}>{success}</div>
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-shamrockg hover:bg-dceladon focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dceladon">
              Register</button>
          </form>
        </div>
      </div>  
    </Layout>
  );
};

export default Register;
