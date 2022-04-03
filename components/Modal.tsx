import Link from "next/link"
import { Dispatch, SetStateAction } from 'react'

const Modal: React.FC<{
  text: string;
  word: string;
  setModal: Dispatch<SetStateAction<string>>;
  attempt: number;
  colors: number[][];
  setMessage:  Dispatch<SetStateAction<string>>;
}> = ({ text, word, setModal, attempt, colors, setMessage }) => {

  const copyResults = () => {
    let result = `Literalnie Bez Limitu ${attempt}/6\n`
    for (let i = 0; i < attempt; ++i) {
      for (let j = 0; j < 5; ++j) {
        if (colors[i][j] === 1) {
          result += '⬛'
        } else if (colors[i][j] === 2) {
          result += '🟨'
        } else if (colors[i][j] === 3) {
          result += '🟩'
        }
      }
      result += '\n';
    }
    navigator.clipboard.writeText(result)
    setMessage('Wynik został skopiowany')
  }

  return (
    <div className="fixed z-50 flex justify-center h-screen w-screen mt-10">
      <div className="absolute h-80 w-72 rounded bg-white p-5 flex flex-col items-center justify-around">
        <div onClick={() => setModal('')} className="text-black absolute top-3 right-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div className="text-black text-2xl text-center mt-3">{text}</div>
        <div className="text-black text-2xl text-center">Słowo to: <span className="text-green-500 font-bold">{word.toUpperCase()}</span></div>
        <button onClick={copyResults} className="flex items-center rounded text-xl p-2 bg-green-500 hover:bg-green-600">
          <span>Udostępnij</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
        <Link href='/'>
          <button className="bg-neutral-500 rounded text-xl p-2 hover:bg-neutral-600">
            Nowe Słowo
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Modal
