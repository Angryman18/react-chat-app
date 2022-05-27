import "./App.scss";
import { useState } from "react";
import SignIn from "./components/signin-button";
import StorageHandler from "./components/Storage";

import DisplayChat from "./components/chat/chat";

function App(props) {
  const { user } = props;
  const [LoggedUser, setLoggedUser] = useState(user);

  return (
    <div className='flex justify-center overflow-x-hidden h-screen overflow-y-scroll'>
      {LoggedUser ? (
        <DisplayChat user={LoggedUser} setLoggedUser={setLoggedUser} />
      ) : (
        <SignIn getLoggedUser={(val) => setLoggedUser(val)} />
      )}
    </div>
  );
}

const connect = (retrivalHandler) => (Component) => {
  return () => <Component user={retrivalHandler()} />;
};
export default connect(StorageHandler.retrieveFromLocalStorage)(App);
