import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Message from '../components/Message'
import dictionary from '../functions/dictionary'
import { encrypt } from '../functions/cypher'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter()
  const [word, setWord] = useState('')
  const [message, setMessage] = useState('')
  const [linkCopied, setLinkCopied] = useState(false)

  const handleCopyURL = () => {
    if (word) {
      if (word.length === 5) {
        if (dictionary.has(word.toLowerCase())) {
          navigator.clipboard.writeText('https://literalniebezlimitu.fun/' + encrypt(word.toLowerCase()))
          setMessage('')
          setLinkCopied(true)
        } else {
          setMessage('Słowa nie ma w słowniku')
        }
      } else {
        setMessage('Słowo musi być 5-literowe')
      }
    } else {
      setMessage('Podaj swoje słowo')
    }
  }

  const handleRandomWord = () => {
    const arr = Array.from(dictionary)
    const randomWord = arr[Math.round(Math.random() * arr.length)]
    const randomURL = encrypt(randomWord)
    router.push('/' + randomURL)
  }

  return (
    <div className="flex flex-col items-center justify-center h-[75vh] max-w-lg m-auto">
      <Head>
        <title>Literalnie bez limitu</title>
        <meta name="description" content="Zagraj w Literalnie Bez Limitu. Wylosuj słowo dla siebie lub wymyśl słowo i rzuć wyzwanie znajomemu." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      {message ? <Message text={message} setMessage={setMessage} /> : <></>}

      <div className="flex flex-col items-center w-4/5">
        <input onChange={(e) => {
          setWord(e.target.value)
          setLinkCopied(false)
        }} placeholder="Wpisz swoje słowo" className="w-full mt-4 m-1 h-[7vh] rounded text-center text-neutral-500 outline-none"></input>
        <button onClick={handleCopyURL} className="w-full m-1 h-[7vh] bg-neutral-400 rounded hover:bg-yellow-500">{linkCopied ? 'Link skopiowany' : 'Skopiuj link'}</button>
      </div>

      <div className="flex flex-col items-center w-4/5">
        <button onClick={handleRandomWord} className="w-full mt-4 m-1 h-[7vh] bg-neutral-400 rounded hover:bg-green-500">Losuj słowo dla Siebie</button>
      </div>
    </div>
  )
}

export default Home
