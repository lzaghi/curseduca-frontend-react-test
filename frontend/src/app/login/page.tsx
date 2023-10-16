'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import request from '@/services/request';

function Login() {
  const [user, setUser] = useState({
    email: 'dev1@curseduca.com',
    password: 'dev1',
  })
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { push } = useRouter();

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: { access_token } } = await request.login(user);
      console.log(access_token)

      push('/feed');
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const emailCheck = emailRegex.test(user.email);
    const passCheck = user.password.length > 3;
    setIsDisabled(!emailCheck || !passCheck);
  }, [user.email, user.password,]);

  return (
    <>
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
      { loading && <p>Loading...</p> }
      { error && <p>{error}</p> }
    </>
  )
}

export default Login