import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import NavigationBar from "../../Components/NavigationBar/NavigationBar";

function SignIn() {
  let navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  async function signOut() {
    try {
      await Auth.signOut();
      console.log("Success");
    } catch (error) {
      console.log(error);
    }
  }

  async function userSignIn() {
    try {
      const user = await Auth.signIn(email, password);
      console.log(user);
      if (
        user.signInUserSession.accessToken.payload["cognito:groups"][0] ==
        "Admins"
      ) {
        navigate("/admin-console");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log("error signing in", error);
    }
  }

  const signIn = (event) => {
    userSignIn();
    event.preventDefault(); //Prevents page refresh on Submit
  };
  return (
    <>
      <NavigationBar></NavigationBar>
      <div className="text-center mt-24">
        <div className="flex items-center justify-center">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            className="w-12 h-12 text-blue-500"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h2 className="text-4xl tracking-tight">Sign in into your account</h2>
        <span className="text-sm">
          or{" "}
          <a
            href="#"
            className="text-blue-500"
            onClick={() => navigate("/signup")}
          >
            register a new account
          </a>
        </span>
      </div>
      <div className="flex justify-center my-2 mx-4 md:mx-0">
        <form
          className="w-full max-w-xl bg-white rounded-lg shadow-md p-6"
          onSubmit={signIn}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Email address
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Password
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
              />
            </div>
            <div className="w-full flex items-center justify-between px-3 mb-3 ">
              <div className="w-full text-right">
                <a href="#" className="text-blue-500 text-sm tracking-tight">
                  Forget your password?
                </a>
              </div>
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <button
                className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500"
                type="submit"
              >
                Sign in
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignIn;
