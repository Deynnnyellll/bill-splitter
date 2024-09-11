import React, { useState, useRef, useEffect } from 'react'
import { useSignUpLogin } from '../custom hooks/useSignUpLogin';
import axios from 'axios';

import { HiUser, HiLockClosed } from "react-icons/hi2";
import { IoMdMail } from "react-icons/io";
import { CiSquareChevUp, CiSquareChevDown } from "react-icons/ci";
import { TbEye, TbEyeOff } from "react-icons/tb";

export const LoginType = ({ passType, passRef, error, loading, setEmail, setPassword, handleToggleSee, handleLoginSubmit }) => {

  return (
    <>
      <h1 className='text-[24px]'>Let's split your Bill</h1>
      <div className='flex items-center w-full bg-darkTwo rounded-md' >
        <span className='mx-3'>
          <IoMdMail className='text-[18px]' />
        </span>
        <input
          type='email'
          className='bg-transparent py-3 text-[12px] outline-none w-full'
          placeholder='Email'
          onChange={event => setEmail(event.target.value)} />
      </div >
      <div className='flex items-center w-full bg-darkTwo rounded-md' >
        <span className='mx-3'>
          <HiLockClosed className='text-[18px]' />
        </span>
        <input
          ref={passRef}
          type={passType}
          className='bg-transparent py-3 text-[12px] outline-none w-full'
          placeholder='Password'
          onChange={event => setPassword(event.target.value)} />
        <span className='mx-3' onClick={handleToggleSee}>
          {passType === 'password' ?
            <TbEyeOff className='text-[18px]' /> :
            <TbEye className='text-[18px]' />}
        </span>
      </div >
      <button className='bg-primaryThree w-full py-2 rounded-lg' onClick={handleLoginSubmit} disabled={loading}>Login</button>
      {error && (
        <div className='absolute -bottom-14 w-full text-center py-2 border-red-600 border-2 rounded-md bg-darkTwo'>
          <h1 className='text-[14px]'>
            {error}
          </h1>
        </div>
      )}
    </>
  )
}

export const SignupType = ({ passType, passRef, error, loading, setEmail, setPassword, setUsername, handleToggleSee, handleSignupSubmit }) => {

  return (
    <>
      <h1 className='text-[24px]'>Sign in to Bill Splitter!</h1>
      <div className='flex items-center w-full bg-darkTwo rounded-md' >
        <span className='mx-3'>
          <HiUser className='text-[18px]' />
        </span>
        <input
          type='text'
          className='bg-transparent py-3 text-[12px] outline-none w-full'
          placeholder='Username'
          onChange={event => setUsername(event.target.value)} />
      </div >
      <div className='flex items-center w-full bg-darkTwo rounded-md' >
        <span className='mx-3'>
          <IoMdMail className='text-[18px]' />
        </span>
        <input
          type='email'
          className='bg-transparent py-3 text-[12px] outline-none w-full'
          placeholder='Email'
          onChange={event => setEmail(event.target.value)} />
      </div >
      <div className='flex items-center w-full bg-darkTwo rounded-md' >
        <span className='mx-3'>
          <HiLockClosed className='text-[18px]' />
        </span>
        <input
          ref={passRef}
          type={passType}
          className='bg-transparent py-3 text-[12px] outline-none w-full'
          placeholder='Password'
          onChange={event => setPassword(event.target.value)} />
        <span className='mx-3' onClick={handleToggleSee}>
          {passType === 'password' ?
            <TbEyeOff className='text-[18px]' /> :
            <TbEye className='text-[18px]' />}
        </span>
      </div >
      <button className='bg-primaryThree w-full py-2 rounded-lg' onClick={handleSignupSubmit} disabled={loading}>Sign up</button>
      {error && (
        <div className='absolute -bottom-14 w-full text-center py-2 border-red-600 border-2 rounded-md bg-darkTwo'>
          <h1 className='text-[14px]'>
            {error}
          </h1>
        </div>
      )}
    </>
  )
}

const Login = () => {
  const { signup, login, loading, error, setError } = useSignUpLogin()

  const [loginState, setLoginState] = useState('signup')
  const [passType, setPassType] = useState('password')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const passRef = useRef(null)

  const ovalMoving = loginState === 'login' ? 'after:translate-y-[117%]' : ''
  const signMoving = loginState === 'login' ? '-translate-y-[70%] opacity-0' : ''
  const loginMoving = loginState === 'login' ? 'translate-y-[200px]' : 'opacity-0 translate-y-[110%]'
  const formMoving = loginState === 'login' ? 'translate-y-[50px]' : 'translate-y-[210px]'

  const handleSwitchLogin = () => {
    setError(null)
    setLoginState(prev => prev === 'signup' ? 'login' : 'signup')
  }

  const handleToggleSee = () => {
    setPassType(passRef.current.type === 'password' ? 'text' : 'password')
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault()
    await login(email, password)
  }

  const handleSignupSubmit = async (event) => {
    event.preventDefault()
    await signup(username, email, password)
  }

  return (
    <div className='py-6 px-11 text-white h-screen overflow-hidden'>
      <div className={`relative oval-effect z-10 ${ovalMoving} transition-all ease-in-out duration-300 w-full`}>
        <div className={`absolute z-20 w-full h-full flex flex-col gap-1 items-center text-center top-2 ${signMoving} duration-1000 delay-500`}>
          <h1 className='text-[22px]'>Got an account already?</h1>
          <p className='text-[12px]'>Login to access your account and continue splitting your bills.</p>
          <CiSquareChevUp className='text-[36px] mt-2' onClick={handleSwitchLogin} />
        </div>
        <div className={`grid grid-rows-4 w-full gap-4 z-0 ${formMoving} duration-1000 `}>
          {loginState === 'login' ?
            <LoginType
              passRef={passRef}
              passType={passType}
              error={error}
              loading={loading}
              setEmail={setEmail}
              setPassword={setPassword}
              handleToggleSee={handleToggleSee}
              handleLoginSubmit={handleLoginSubmit} />
            : <SignupType
              passRef={passRef}
              passType={passType}
              error={error}
              loading={loading}
              setUsername={setUsername}
              setEmail={setEmail}
              setPassword={setPassword}
              handleToggleSee={handleToggleSee}
              handleSignupSubmit={handleSignupSubmit} />}
        </div >
        <div className={`absolute z-20 w-full h-full flex flex-col gap-2 items-center text-center ${loginMoving} duration-1000 delay-500`}>
          <h1 className='text-[20px]'>Ready to split your bills with friends?</h1>
          <div className='text-[12px]'>
            <p>Bill Splitter simplifies tracking and dividing items you bought.</p>
            <p>Sign up now to start splitting your bills!</p>
          </div>
          <CiSquareChevDown className='text-[36px]' onClick={handleSwitchLogin} />
        </div>
      </div>
    </div >
  )
}

export default Login