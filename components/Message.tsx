import { Dispatch, SetStateAction } from 'react'

const Message: React.FC<{
  text: string; setMessage: Dispatch<SetStateAction<string>>, winStatus?: boolean
}> = ({ text, setMessage, winStatus }) => {
  const color = winStatus ? 'bg-green-500' : 'bg-neutral-500'

  return (
    <div>
      <div className={`fixed top-10 p-2 w-full ${color} z-20 text-center`}>
        <span className="text-center">{text}</span>
        <button onClick={() => setMessage('')} className="absolute right-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Message
