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
      const winMessages = ['Ogniście 🔥', 'Detektywistycznie 🕵️‍♀️', 'Nieźle 😎', 'Masz to coś 🔍', 'Nieziemsko 🚀', 'Kosmos 👩🏿‍🚀', 'Mistrzowsko 🏅']
      setModal(winMessages[Math.round(Math.random() * winMessages.length)])
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

    if(attempt == 5) {
      const loseMessages = ['Dobra próba','Niezła próba']
      setModal(loseMessages[Math.round(Math.random() * loseMessages.length)])
    }
  }

  const handleKeyboardClicked = (letter: string) => {
    if (attempt < 6 && !win) {
      if (letter === 'Enter') {
        if (iterator < 5) {
          setMessage('Zbyt mało liter')
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
            setMessage('Słowa nie ma w słowniku')
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
    <div>
      <Head>
        <title>Literalnie bez limitu</title>
        <meta name="description" content="Zagraj w literalnie na wymyślonych słowach" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {modal ? <Modal text={modal} word={word} setModal={setModal} attempt={attempt} colors={colors} setMessage={setMessage}/> : <></>}
      {message ? <Message text={message} setMessage={setMessage}/> : <></>}
      <div className="flex justify-center mt-12">
        <Board board={board} colors={colors} attempt={attempt} shake={shake}/>
      </div>
      <Keyboard handleKeyboardClicked={handleKeyboardClicked} keyboardColors={keyboardColors} />
    </div>
  )
}

export default Home