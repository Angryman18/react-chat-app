import format from "date-fns/format";
import { Fragment, useEffect, useRef } from "react";

const ChatBody = ({ message, uid, loading }) => {
  const scrollHandler = useRef();

  const dateTimeFormatter = (val) => {
    return format(new Date(val * 1000), "hh:mm bbb");
  };

  const showDateHandler = (array = [], currIndex) => {
    const formattedDate = format(
      new Date(array[currIndex]?.createdAt?.seconds * 1000),
      "dd MMM yyyy"
    );
    if (currIndex === 0) return formattedDate;
    const prev = array[currIndex - 1];
    const prevDate = new Date(prev?.createdAt * 1000).getDate();
    const currDate = new Date(array[currIndex].createdAt * 1000).getDate();

    if (prevDate !== currDate) {
      return formattedDate;
    }
    return "";
  };

  const DateDisplayComp = ({ idx, message }) => {
    const date = showDateHandler(message, idx);
    if (!date) return null;
    return (
      <div className='w-full grid place-items-center my-4'>
        <p className='inline px-2 rounded-md text-sm bg-blue-200'>{date}</p>
      </div>
    );
  };

  useEffect(() => {
    scrollHandler.current.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const LoadingComponent = () => {
    if (!loading) return null;
    return <div className="absolute left-1/2 top-1/2 -translate-x-1/2">
      Loading...
    </div>
  }


  return (
    <div className='pb-16 pt-16 ml-2'>
     <LoadingComponent />
      {!loading && message.map((item, idx) => {
        if (item.uid === uid) {
          return (
            <Fragment key={`${item?.text.slice(0, 5)}${idx}`}>
              <DateDisplayComp idx={idx} message={message} />
              <div className='flex gap-x-2 justify-end my-3'>
                <span className='bg-blue-600 flex flex-col text-white w-auto ml-10 px-3 py-2 rounded-lg sm:w-auto sm:mr-0 sm:max-w-[300px]'>
                  {item?.text}
                  <span className='block text-right text-xs italic'>
                    {dateTimeFormatter(item?.createdAt)}
                  </span>
                </span>
                <img
                  className='w-10 h-10 rounded-full'
                  src={item?.photoURL}
                  alt='avatar'
                />
              </div>
            </Fragment>
          );
        } else {
          return (
            <Fragment key={`${item?.text.slice(0, 5)}${idx}`}>
              <DateDisplayComp idx={idx} message={message} />
              <div className='flex gap-x-2 my-3'>
                <img
                  className='w-10 h-10 rounded-full border'
                  src={item?.photoURL}
                  alt='avatar'
                />
                <span className='bg-slate-200 flex flex-col w-auto sm:w-auto mr-10 px-3 py-2 rounded-lg sm:mr-0 sm:max-w-[300px]'>
                  {item?.text}
                  <span className='block text-right text-xs italic'>
                    {dateTimeFormatter(item?.createdAt)}
                  </span>
                </span>
              </div>
            </Fragment>
          );
        }
      })}
      <div ref={scrollHandler}></div>
    </div>
  );
};

export default ChatBody;
