import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignUpLogin = () => {
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)
  const { dispatch } = useAuthContext()

  const axiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': ' '
    }
  })

  const signup = async (username, email, password) => {
    setLoading(true)
    setError(null)

    const data = {
      username: username,
      email: email,
      password: password
    }

    axiosInstance
      .post('http://localhost:4000/user/signup', data)
      .then(res => {
        // Save the user in the local storage
        localStorage.setItem('user', JSON.stringify(res.data))
        // Assigning the user to auth context
        dispatch({ type: 'LOGIN', payload: res.data })
        setLoading(false)
      }).catch(err => {
        setLoading(false)
        setError(err.response.data.err)
      })
  }

  const login = async (email, password) => {
    setLoading(true)
    setError(null)

    const data = {
      email: email,
      password: password
    }

    axiosInstance
      .post('http://localhost:4000/user/login', data)
      .then(res => {
        // Save the user in the local storage
        localStorage.setItem('user', JSON.stringify(res.data))
        // Assigning the user to auth context
        dispatch({ type: 'LOGIN', payload: res.data })
        setLoading(false)
      }).catch(err => {
        setLoading(false)
        setError(err.response.data.err)
      })
  }

  return { signup, login, loading, error, setError }
}