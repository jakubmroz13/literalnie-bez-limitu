import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Board from '../components/Board'
import Keyboard from '../components/Keyboard'
import Message from '../components/Message'
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
  const [keyboardColors, setKeyboardColors] = useState<{ [index: string]: number }>({})

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
      setMessage(winMessages[Math.round(Math.random() * winMessages.length)])
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

    setMessage('')
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
          setMessage('')
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

      <Link href='/'>
        <button className="fixed top-1.5 left-1.5 text-sm p-1 px-2 bg-neutral-500 rounded hover:bg-green-500">
          Nowe Słowo
        </button>
      </Link>
      {message ? <Message text={message} setMessage={setMessage} winStatus={win} /> : <></>}
      <div className="flex justify-center mt-12">
        <Board board={board} colors={colors} />
      </div>
      <Keyboard handleKeyboardClicked={handleKeyboardClicked} keyboardColors={keyboardColors} />
    </div>
  )
}

export default Home
