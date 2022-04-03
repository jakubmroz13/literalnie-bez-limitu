import { Dispatch, SetStateAction } from 'react'

const Message: React.FC<{
  text: string; 
  setMessage: Dispatch<SetStateAction<string>>;
}> = ({ text, setMessage }) => {

  setTimeout(() => {
    setMessage('')
  }, 1700)

  return (
    <div className="fixed flex justify-center w-screen top-11">
      <div className={`fixed p-2 bg-white z-100 text-center text-xl rounded text-black`}>
        <span className="text-center">{text}</span>
      </div>
    </div>
  )
}

export default Message
