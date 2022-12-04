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
    try {
      const res = await login({
        scope: 'email',
      });


      // grab name and id
      const facebookUserResponse = await (await fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${res.authResponse.accessToken}`)).json();

      // grab picture
      const facebookUserProfilePicture = await (
        await fetch(`https://graph.facebook.com/v15.0/${facebookUserResponse.id}/picture?redirect=false&access_token=${res.authResponse.accessToken}`)
      ).json();

      const userData = {
        ...facebookUserResponse,
        login_by: "facebook",
        profile_picture: facebookUserProfilePicture.data.url
      }

      // on facebook login, do custom login with backend 

      dispatch(sessionActions.thunkAPILogin(userData))
        .then(() => {
          setShowUserModal(false);
          window.location.reload();
        })
    } catch (error) {
      console.log("Error from logging in with Facebook: ", error.message);
    }
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
    </div>
  );
}

// export default component
export default FacebookLoginComponent;
