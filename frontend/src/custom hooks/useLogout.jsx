import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext()

  const logout = () => {
    // Remove the user in local storage
    localStorage.removeItem('user')
    // Remove user in the auth context
    dispatch({ type: "LOGOUT" })
  }

  return logout
}