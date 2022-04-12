import { Dispatch, SetStateAction } from 'react'

const Message: React.FC<{
  text: string; 
  setMessage: Dispatch<SetStateAction<string>>;
}> = ({ text, setMessage }) => {

  setTimeout(() => {
    setMessage('')
  }, 1700)

  return (
    <div className="fixed flex justify-center w-screen top-2">
      <div className={`p-2 bg-white z-100 rounded`}>
        <span className="text-center text-xl text-black">{text}</span>
      </div>
    </div>
  )
}

export default Message
