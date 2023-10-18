'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image';
import { AppDispatch } from '../redux/store';
import 'react-toastify/dist/ReactToastify.css';
import { loginAction } from '../redux/slices/authSlice';
import request from '../services/request';
import styles from './styles/LoginForm.module.css';
import logo from '../assets/logo.png';
import Loading from './Loading';

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
      const { data } = await request.login(user);
      dispatch(loginAction({ token: data.access_token, email: user.email }));
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
    <main className={styles.background}>
      <div className={styles.loginCard}>
        <Image src={logo} alt="logo Curseduca Social Media" className={styles.logo} />
        <form onSubmit={login} className={styles.loginForm}>
          <input
            className={styles.loginInput}
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
          />
          <input
            className={styles.loginInput}
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Senha"
          />
          <button
            className={styles.loginButton}
            type="submit"
            disabled={disabled}
          >
            ENTRAR
          </button>
        </form>
        { loading && <div className={styles.loginLoader}><Loading /></div> }
      </div>
      <ToastContainer />
    </main>
  );
}

export default LoginForm;
