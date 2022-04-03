import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Message from '../components/Message'
import dictionary from '../functions/dictionary'
import { encrypt } from '../functions/cypher'

const Home: NextPage = () => {
  const [word, setWord] = useState('')
  const [message, setMessage] = useState('')
  const [linkCopied, setLinkCopied] = useState(false)

  const handleCopyURL = () => {
    if (word) {
      if (word.length === 5) {
        if (dictionary.has(word.toLowerCase())) {
          navigator.clipboard.writeText('localhost:3000/' + encrypt(word.toLowerCase()))
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

  return (
    <div>
      <Head>
        <title>Literalnie bez limitu</title>
        <meta name="description" content="Zagraj w literalnie na wymyślonych słowach" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {message ? <Message text={message} setMessage={setMessage} /> : <></>}

      <div className="flex flex-col w-4/5 max-w-md text-xl m-auto mt-32">
        <input onChange={(e) => {
          setWord(e.target.value)
          setLinkCopied(false)
        }} placeholder="Wpisz swoje słowo" className="m-1 h-12 rounded text-center text-neutral-500 outline-none"></input>
        <button onClick={handleCopyURL} className="m-1 h-12 bg-neutral-400 rounded hover:bg-green-500 focus:bg-green-500">{linkCopied ? 'Link skopiowany' : 'Skopiuj link'}</button>
      </div>
    </div>
  )
}

export default Home
