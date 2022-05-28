// assets
import googleIcon from "../images/icon.png";
import githubIcon from "../images/github.png";
import twitterIcon from '../images/twitter.png';

// vendors
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import { useState } from "react";

// helpers
import StorageHandler from "./Storage";

// credentials
import { firebase } from "../firebase";

const SignIn = ({ getLoggedUser }) => {
  const auth = getAuth(firebase);
  const [error, setError] = useState(null);

  const signInHandler = (provider) => () => {
    setError(null);
    return signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        getLoggedUser(StorageHandler.saveLocalStorage(user));
      })
      .catch((error) => {
        setError(error?.message);
      });
  };

  const SignInButton = ({ icon, text, handler }) => {
    return (
      <div className="mx-auto">
        <button
          onClick={handler}
          className='flex justify-center items-center px-6 py-2 shadow-md gap-x-2 border rounded-md active:bg-slate-100'
        >
          <img className='w-8 h-8' src={icon} alt={text} />
          <span className='text-xl px-2 py-2'>{text}</span>
        </button>
      </div>
    );
  };

  return (
    <>
      <div className='grid place-items-center'>
        <div className='flex flex-col justify-center flex-wrap gap-y-6'>
          {error && <p className='text-red-500'>{error}</p>}
          <SignInButton
            icon={googleIcon}
            text='Sign in With Google'
            handler={signInHandler(new GoogleAuthProvider())}
          />
          <SignInButton
            icon={githubIcon}
            text='Sign in With Github'
            handler={signInHandler(new GithubAuthProvider())}
          />
          {/* <SignInButton
            icon={twitterIcon}
            text='Sign in With Twitter'
            handler={signInHandler(new TwitterAuthProvider())}
          /> */}
        </div>
      </div>
    </>
  );
};

export default SignIn;
