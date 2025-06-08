import { FC } from 'react'

export type messageProp = {
    type: string,
    sender: string,
    time: any,
    text: string,
    id: string
}

export const Message: FC<messageProp> = ({type, sender, time, text}) => {
  const initials = sender.split(' ')[0][0] + sender.split(' ')[1][0]
  const formattedTime = time.toDate().toString().substring(16, 21)

  if (type === "self") {
    return (
      <div className="flex flex-row-reverse max-w-[70%] ml-auto mb-2 p-2 rounded-md shadow-md bg-indigo-900 bg-opacity-75 backdrop-blur-md border border-white/20">
        <div className="flex-shrink-0 ml-2">
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-indigo-600 font-bold text-sm select-none">
            {initials}
          </span>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-baseline text-xs text-indigo-200 mb-1">
            <span className="font-semibold">{sender} (You)</span>
            <time className="text-indigo-300">{formattedTime}</time>
          </div>
          <div className="text-white text-sm font-medium p-2 rounded-md bg-indigo-800 bg-opacity-70">
            <p>{text}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex max-w-[70%] mr-auto mb-2 p-2 rounded-md shadow-md bg-indigo-100 bg-opacity-90 backdrop-blur-md border border-white/20">
        <div className="flex-shrink-0 mr-2">
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-sm select-none">
            {initials}
          </span>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-baseline text-xs text-indigo-900 mb-1">
            <span className="font-semibold">{sender}</span>
            <time className="text-gray-600">{formattedTime}</time>
          </div>
          <div className="text-indigo-900 text-sm font-medium p-2 rounded-md bg-white bg-opacity-90">
            <p>{text}</p>
          </div>
        </div>
      </div>
    );
  }  
}