import User from "../user/user";

const ChatHeader = ({ userImage, signOutHandler, displayName }) => {
  return (
    <div className='fixed top-0 -translate-x-1/2 left-1/2'>
      <div className='flex rounded-md justify-between items-center w-screen sm:w-[600px] border bg-sky-50 px-4 sm:px-8 py-2'>
        <span className="flex gap-x-3 items-center">
        <User userImage={userImage} />
        <span className="font-semibold">{displayName}</span>
        </span>
        <button className="bg-blue-600 text-white font-semibold shadow-md rounded text-sm px-3 py-1" onClick={signOutHandler}>Sign Out</button>
      </div>
    </div>
  );
};

export default ChatHeader;
