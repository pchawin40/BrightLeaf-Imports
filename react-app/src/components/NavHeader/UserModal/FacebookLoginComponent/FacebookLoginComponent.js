// src/components/NavHeader/UserModal/FacebookLoginComponent/FacebookLoginComponent.js

// import component
import { useNavHeader } from "../../../../context/NavHeaderContext";

// import react
import React, { useState } from "react";

// import react-redux
import { useDispatch } from "react-redux";

// import libraries
import { FacebookProvider, useLogin, useProfile } from 'react-facebook';

// import store
import * as sessionActions from '../../../../store/session';

//? FacebookLogin Component
const FacebookLoginComponent = () => {
  /**
   * Controlled inputs
   */
  // const [login, setLogin] = useState(false);
  // const [data, setData] = useState({});
  const { showUserModal, setShowUserModal } = useNavHeader();

  const { login, isLoading, error } = useLogin();

  // invoke dispatch
  const dispatch = useDispatch();

  const handleLogin = async () => {
    // try {
    //   const res = await login({
    //     scope: 'email',
    //   });


    //   const facebookUserResponse = await (await fetch(`https://graph.facebook.com/me?access_token=${res.authResponse.accessToken}`)).json();

    //   dispatch(sessionActions.thunkAPILogin(facebookUserResponse));
    // } catch (error) {
    //   console.log(error.message);
    // }
  }

  return (
    <div
      className="container"
    >
      <figure
        id="fb-login-img-figure"
        disabled={isLoading}
        onClick={handleLogin}
      >
        <img
          src="https://cdn2.downdetector.com/static/uploads/logo/FB-f-Logo__blue_512.png"
          alt="facebook-login"
          id="fb-login-img"
        />
      </figure>
      {/* {
        !isLoading
        &&
        <FacebookProfile />
      } */}
    </div>
  );
}

// export default component
export default FacebookLoginComponent;
