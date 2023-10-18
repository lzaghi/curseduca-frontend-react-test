'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { AppDispatch } from '../redux/store';
import 'react-toastify/dist/ReactToastify.css';
import { fetchToken } from '../services/fetch';

function LoginForm() {
  const [user, setUser] = useState({
    email: 'dev1@curseduca.com',
    password: 'dev1',
  });
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const { push } = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const login = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      fetchToken(dispatch, user);
      push('/feed');
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response?.data?.message || 'Internal error');
    }
  };

  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const emailCheck = emailRegex.test(user.email);
    const passCheck = user.password.length > 3;
    setDisabled(!emailCheck || !passCheck);
  }, [user.email, user.password]);

  return (
    <main>
      <form onSubmit={login}>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Senha"
        />
        <button
          type="submit"
          disabled={disabled}
        >
          ENTRAR
        </button>
      </form>
      <ToastContainer />
      { loading && <p>Loading...</p> }
    </main>
  );
}

export default LoginForm;
