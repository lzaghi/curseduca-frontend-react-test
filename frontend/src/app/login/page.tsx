'use client'
import React, { useState, useEffect } from 'react'

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const emailCheck = emailRegex.test(user.email);
    const passCheck = user.password.length > 3;
    setIsDisabled(!emailCheck || !passCheck);
  }, [user.email, user.password,]);

  return (
    <form>
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
  )
}

export default Login