import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import client from './config/apollo';
import { ApolloProvider } from '@apollo/client';
import Auth from './pages/Auth';
import { decodeToken, getToken, removeToken } from './utils/token';
import AuthContext from './context/AuthContext';
import { authentication } from './firebase.config.js';
import Navigation from './routes/Navigation';
import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { Toaster } from 'react-hot-toast';

function App() {
  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      setAuth(null);
    }
    // if token is expired in 24h
    if (token && decodeToken(token).exp * 1000 < Date.now()) {
      removeToken();
      setAuth(null);
    }
    // if token is valid
    if (token && decodeToken(token).exp * 1000 > Date.now()) {
      setAuth(decodeToken(token));
    }
  }, []);

  const logout = () => {
    removeToken();
    setAuth(null);
  };

  const setUser = (user) => {
    setAuth(user);
  };

  /**
   * This function will create a new FacebookAuthProvider object, then use the signInWithPopup function
   * to sign in with Facebook, and then set the auth state to the user that was returned from the
   * signInWithPopup function.
   * @returns The user object.
   */
  const loginWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    const facebookUser = await signInWithPopup(authentication, provider);

    setAuth(facebookUser);

    return facebookUser;
  };

  const authData = useMemo(
    () => ({
      auth,
      setUser,
      logout,
      loginWithFacebook,
    }),
    [auth],
  );

  if (auth === undefined) return null;

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData}>
        {!auth ? <Auth /> : <Navigation />}
        <Toaster />
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
