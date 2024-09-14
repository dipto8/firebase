import React, { useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../../firebase/firebase.innit";

const Login = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [user, setUser] = useState(null);

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const loggedInUser = result.user;
        setUser(loggedInUser);
        console.log(loggedInUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSignout = () => {
    signOut(auth)
      .then((result) => {
        console.log(result);
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="">
{ 
  user?
  <button onClick={handleSignout}> Logout</button> :
        <button onClick={handleGoogleLogin}>Google</button> 
     }
      {user && (
        <div className="">
          <h2>User: {user.displayName}</h2>
          <h2>Email: {user.email}</h2>
          <img src={user.photoURL} alt="" />
        </div>
      )}
    </div>
  );
};

export default Login;
