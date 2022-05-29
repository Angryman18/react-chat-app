
import { useState } from "react";
import user from '../../images/user.png'

const User = ({ userImage }) => {

  const [currImage, setCurrImage] = useState(userImage);

  const onLoadHandler = (e) => {
    console.log("loaded");
  };

  const onErrorHandler = (e) => {
    console.log("image display error");
    setCurrImage(user)
  };

  return (
    <div>
      <img
        onLoad={onLoadHandler}
        onError={onErrorHandler}
        src={currImage}
        className='w-12 h-12 border p-1 rounded-full'
        alt='user'
      />
    </div>
  );
};

export default User;
