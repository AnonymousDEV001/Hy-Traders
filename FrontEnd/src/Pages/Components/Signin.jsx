import React, { useState, useEffect } from "react";
import Css from "../Css/Signin.module.css";
import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import {
  signinToggle,
  setSigninMethod,
} from "../../Redux/signIn/signInToggleSlice";
import { useDispatch, useSelector } from "react-redux";
import loader from "../../assets/loader.gif";
import {
  userLogin,
  oauthUserLogin,
  userSignup,
} from "../../Redux/handelingAuth/authSlice";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const VITE_GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const VITE_FACEBOOK_APP_ID = import.meta.env.VITE_FACEBOOK_APP_ID;
  const user = useSelector((state) => state.userCreds);
  const signinMethod = useSelector((state) => state.signInToggle.method);

  const dispatch = useDispatch();

  const handleSignin = async (e) => {
    e.preventDefault();
    if (email.length == 0) {
      return setError("Email field is required");
    }
    if (password.length == 0) {
      return setError("Password field is required");
    }

    dispatch(userLogin({ email: email, password: password }));
  };

  const hangleSignup = async (e) => {
    e.preventDefault();
    dispatch(
      userSignup({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        confirmPassword: confirmPassword,
      })
    );
  };

  return (
    <>
      <div className={Css.signin}>
        <div
          className={Css.wraper}
          onClick={() => {
            dispatch(signinToggle(false));
          }}
        ></div>
        <div className={Css.signinForm}>
          {user?.message != undefined && user?.message.includes("verification") ? (
            <p style={{ color: "green" }}>{user.message}</p>
          ) : (
            <>
              {" "}
              <div className={Css.heading}>
                <h3>{signinMethod == "signin" ? "SIGN IN" : "SIGN UP"}</h3>
              </div>
              <div className={Css.form}>
                <form>
                  <input
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    disabled={user?.loading}
                    type="email"
                    placeholder="Email"
                  />
                  {signinMethod != "signin" ? (
                    <>
                      <input
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                        value={firstName}
                        disabled={user?.loading}
                        type="text"
                        placeholder="First Name"
                      />
                      <input
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                        disabled={user?.loading}
                        value={lastName}
                        type="text"
                        placeholder="Last Name"
                      />
                    </>
                  ) : null}

                  <input
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    disabled={user?.loading}
                    type="password"
                    value={password}
                    placeholder="Passowrd"
                  />

                  {signinMethod != "signin" ? (
                    <input
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                      disabled={user?.loading}
                      type="password"
                      value={confirmPassword}
                      placeholder="Confirm Passowrd"
                    />
                  ) : null}

                  {user?.errors !== null ? (
                    <p style={{ color: "red" }}>{user.errors}</p>
                  ) : null}
                  {user?.message !== null ? (
                    <p style={{ color: "green" }}>{user.message}</p>
                  ) : null}

                  <div className={Css.options}>
                    {signinMethod == "signin" ? (
                      <span>Forget Password?</span>
                    ) : (
                      <span></span>
                    )}

                    {signinMethod == "signin" ? (
                      <button onClick={handleSignin}>
                        {user?.loading ? (
                          <img src={loader} alt="loader" />
                        ) : (
                          "Signin"
                        )}
                      </button>
                    ) : (
                      <button onClick={hangleSignup}>
                        {user?.loading ? (
                          <img src={loader} alt="loader" />
                        ) : (
                          "Signup"
                        )}
                      </button>
                    )}
                  </div>

                  <div className={Css.otherMethords}>
                    <LoginSocialGoogle
                      isOnlyGetToken
                      scope="profile email"
                      client_id={VITE_GOOGLE_CLIENT_ID}
                      onResolve={(data) => {
                        console.log(data)
                        dispatch(
                          oauthUserLogin({
                            provider: data.provider,
                            access_token: data.data.access_token,
                          })
                        );
                      }}
                      onReject={(err) => {
                        console.log(err);
                      }}
                    >
                      <GoogleLoginButton />
                    </LoginSocialGoogle>
                    <LoginSocialFacebook
                      isOnlyGetToken
                      appId={VITE_FACEBOOK_APP_ID}
                      onResolve={async ({ provider, data }) => {
                        dispatch(
                          oauthUserLogin({
                            provider: provider,
                            access_token: data.accessToken,
                          })
                        );
                      }}
                      onReject={(err) => {
                        console.log(err);
                      }}
                    >
                      <FacebookLoginButton />
                    </LoginSocialFacebook>
                  </div>
                  <div className={Css.signupRedirect}>
                    {signinMethod == "signin" ? (
                      <span
                        onClick={() => {
                          dispatch(setSigninMethod("signup"));
                          setEmail("");
                          setFirstName("");
                          setLastName("");
                          setPassword("");
                          setConfirmPassword("");
                        }}
                      >
                        Don't have an account?
                      </span>
                    ) : (
                      <span
                        onClick={() => {
                          dispatch(setSigninMethod("signin"));
                          setEmail("");
                          setFirstName("");
                          setLastName("");
                          setPassword("");
                          setConfirmPassword("");
                        }}
                      >
                        Already have an account?
                      </span>
                    )}
                    {signinMethod == "signin" ? (
                      <span
                        className={Css.Bold}
                        onClick={() => {
                          dispatch(setSigninMethod("signup"));
                          setEmail("");
                          setFirstName("");
                          setLastName("");
                          setPassword("");
                          setConfirmPassword("");
                        }}
                      >
                        Register
                      </span>
                    ) : (
                      <span
                        className={Css.Bold}
                        onClick={() => {
                          dispatch(setSigninMethod("signin"));
                          setEmail("");
                          setFirstName("");
                          setLastName("");
                          setPassword("");
                          setConfirmPassword("");
                        }}
                      >
                        Login
                      </span>
                    )}
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Signin;
