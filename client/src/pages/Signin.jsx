import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function Signin() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange  = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  const handleSubmit = async (e) => {

    try {
       //prevent refresh page 
      setLoading(true);
      setError(false);
      e.preventDefault();
      const res = await fetch('/api/auth/signin',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);

      if(data.success === false){
        setError(data.message);
        return;
      } 
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
   
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' 
        onChange={handleChange}
        />
        <input type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' 
        onChange={handleChange}
        />
        <button disabled = {loading} className='bg-green-300 text-white p-3 rounded-lg uppercase font-bold hover:opacity-95 disaibled:opacty-80'> 
        {loading? 'Loading': 'Sign In'} </button>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Don't Have an account </p>
        <Link to = '/sign-up'> 
          <span className='text-blue-500'> Sign up</span>        
        </Link>
      </div>

      <p className='text-red-800 mt-5'> {error} </p>
    </div>
  )
}
