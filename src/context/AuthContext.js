import React, { createContext, useContext, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { USER_TYPE } from 'constant/config'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { auth } = useSelector(state => state.auth)
  const [isCashbox, setIsCashbox] = useState(false)

  useEffect(() => {
    setIsCashbox(auth?.userType === USER_TYPE.cashbox)
  }, [auth]);

  return (
    <AuthContext.Provider value={{ isCashbox }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)