'use client'
import React, { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation';
import request from '../../services/request';
import { loginAction } from '@/redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [user, setUser] = useState({
    email: 'dev1@curseduca.com',
    password: 'dev1',
  })
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const { push } = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const login = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: { access_token } } = await request.login(user);
      dispatch(loginAction({token: access_token, email: user.email}));
      
      push('/feed');
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response?.data?.message || 'Internal error');
    } 
  }

  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const emailCheck = emailRegex.test(user.email);
    const passCheck = user.password.length > 3;
    setIsDisabled(!emailCheck || !passCheck);
  }, [user.email, user.password,]);

  return (
    <main>
      <form onSubmit={ login }>
          <input
            type="email"
            value={user.email}
            onChange={e => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
          />
          <input
            type="password" 
            value={user.password}
            onChange={e => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
          />
          <button
            type="submit"
            disabled={isDisabled}
          >
            Login
          </button>
      </form>
      <ToastContainer />
      { loading && <p>Loading...</p> }
    </main>
  )
}

export default Login