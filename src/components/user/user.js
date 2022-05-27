const User = ({ userImage }) => {
  const onLoadHandler = (e) => {
    console.log("loaded");
  };

  const onErrorHandler = (e) => {
    console.log("image display error");
  };

  return (
    <div>
      <img
        onLoad={onLoadHandler}
        onError={onErrorHandler}
        src={userImage}
        className='w-12 h-12 border p-1 rounded-full'
        alt='user'
      />
    </div>
  );
};

export default User;
