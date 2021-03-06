import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Board from '../components/Board'
import Keyboard from '../components/Keyboard'
import Message from '../components/Message'
import Modal from '../components/Modal'
import dictionary from '../functions/dictionary'
import { decrypt } from '../functions/cypher'
import polishAlphabet from '../functions/polish_alphabet'

const Home: NextPage = () => {
  const router = useRouter();
  let word = ''
  if (router.query.game_data && typeof (router.query.game_data) === 'string') {
    word = decrypt(router.query.game_data)
  }

  const [message, setMessage] = useState('')
  const [board, setBoard] = useState([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ])
  const [colors, setColors] = useState([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ])
  const [attempt, setAttempt] = useState(0)
  const [iterator, setIterator] = useState(0)
  const [win, setWin] = useState(false)
  const [modal, setModal] = useState('')
  const [keyboardColors, setKeyboardColors] = useState<{ [index: string]: number }>({})
  const [shake, setShake] = useState(false)
  const checkWord = (triedWord: string) => {
    let correctLetters = 0
    let tmp = word.split('')

    for (let i = 0; i < 5; ++i) {
      if (triedWord[i] === word[i]) {
        colors[attempt][i] = 3
        setColors([...colors])
        correctLetters++
        tmp[i] = ''
        keyboardColors[triedWord[i].toUpperCase()] = 3
        setKeyboardColors({ ...keyboardColors })
      }
    }

    if (correctLetters === 5) {
      setWin(true)
      const winMessages = ['Ogniลcie ๐ฅ', 'Detektywistycznie ๐ต๏ธโโ๏ธ', 'Nieลบle ๐', 'Masz to coล ๐', 'Nieziemsko ๐', 'Kosmos ๐ฉ๐ฟโ๐', 'Mistrzowsko ๐']
      setTimeout(() => {
        if(attempt === 5) {
          setModal('Uff ๐') 
        } else {
          setModal(winMessages[Math.round(Math.random() * winMessages.length)])
        }
      }, 500)
      return
    }

    for (let i = 0; i < 5; ++i) {
      if (colors[attempt][i] === 0) {
        if (tmp.includes(triedWord[i])) {
          colors[attempt][i] = 2
          setColors([...colors])
          tmp[tmp.indexOf(triedWord[i])] = ''
          if (keyboardColors[triedWord[i].toUpperCase()] === undefined) {
            keyboardColors[triedWord[i].toUpperCase()] = 2
            setKeyboardColors({ ...keyboardColors })
          }
        } else {
          colors[attempt][i] = 1
          setColors([...colors])
          if (keyboardColors[triedWord[i].toUpperCase()] === undefined) {
            keyboardColors[triedWord[i].toUpperCase()] = 1
            setKeyboardColors({ ...keyboardColors })
          }
        }
      }
    }

    if (attempt == 5) {
      const loseMessages = ['Dobra prรณba', 'Niezลa prรณba']
      setTimeout(() => {
        setModal(loseMessages[Math.round(Math.random() * loseMessages.length)])
      }, 500)
    }
  }

  const handleKeyboardClicked = (letter: string) => {
    if (attempt < 6 && !win) {
      if (letter === 'Enter') {
        if (iterator < 5) {
          setMessage('Zbyt maลo liter')
        } else {
          let triedWord = ''

          for (let i = 0; i < 5; i++) {
            triedWord += board[attempt][i]
          }

          triedWord = triedWord.toLowerCase()

          if (dictionary.has(triedWord)) {
            checkWord(triedWord)
            setIterator(0)
            setAttempt(attempt + 1)
          } else {
            setMessage('Sลowa nie ma w sลowniku')
            setShake(true)
            setTimeout(() => {
              setShake(false)
            }, 100)
          }
        }
      } else if (letter === 'Back') {
        if (iterator > 0) {
          board[attempt][iterator - 1] = ''
          setBoard([...board])
          setIterator(iterator - 1)
        }
      } else if (polishAlphabet.has(letter)) {
        if (iterator < 5) {
          board[attempt][iterator] = letter
          setBoard([...board])
          setIterator(iterator + 1)
        } else {
          setMessage('Kliknij Enter')
        }
      }
    }
  }

  return (
    <div className="relative h-[95vh] flex flex-col items-center max-w-2xl m-auto">
      <Head>
        <title>Literalnie bez limitu</title>
        <meta name="description" content="Zagraj w literalnie na wymyลlonych sลowach" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {modal ? <Modal text={modal} word={word} setModal={setModal} attempt={attempt} colors={colors} setMessage={setMessage} /> : <></>}
      {message ? <Message text={message} setMessage={setMessage} /> : <></>}
      <div className="flex justify-center h-[48vh] w-full mt-[5vh]">
        <Board board={board} colors={colors} attempt={attempt} shake={shake} />
      </div>
      <div className="absolute bottom-0 flex flex-col justify-center h-[30vh] w-full">
        <Keyboard handleKeyboardClicked={handleKeyboardClicked} keyboardColors={keyboardColors} />
      </div>
    </div>
  )
}

export default Home