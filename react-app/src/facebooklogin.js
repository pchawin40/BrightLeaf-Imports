import React, { useState } from "react";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

function FacebookLoginComponent() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState("");

  const responseFacebook = (response) => {
    console.log(response);
    // Login failed
    if (response.status === "unknown") {
      alert("Login failed!");
      setLogin(false);
      return false;
    }
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };
  const logout = () => {
    setLogin(false);
    setData({});
    setPicture("");
  };

  return (
    <div className="container">
      {!login && (
        <FacebookLogin
          appId="569720507786195"
          autoLoad={false}
          fields="name,email,picture"
          scope="public_profile,email,user_friends"
          callback={responseFacebook}
          render={renderProps => (
            <figure
              id="fb-login-img-figure"
              onClick={renderProps.onClick}
            >
              <img
                src="https://cdn2.downdetector.com/static/uploads/logo/FB-f-Logo__blue_512.png"
                alt="facebook-login"
                id="fb-login-img"
              />
            </figure>
          )}
        />
      )}

      {login && (
        // To handle to login once click on sign in w/ facebook
        <div className="card">
          <div className="card-body">
            <img className="rounded" src={picture} alt="Profile" />
            <h5 className="card-title">{data.name}</h5>
            <p className="card-text">Email ID: {data.email}</p>
            <a href="#" className="btn btn-danger btn-sm" onClick={logout}>
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacebookLoginComponent;
