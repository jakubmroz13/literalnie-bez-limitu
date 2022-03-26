const Keyboard: React.FC<{
  handleKeyboardClicked: (letter: string) => void,
  keyboardColors: { 
    [index: string]: number;
  } 
}> = ({ handleKeyboardClicked, keyboardColors }) => {
  const keyboard = [
    ['Ą', 'Ć', 'Ę', 'Ł', 'Ń', 'Ó', 'Ś', 'Ź', 'Ż'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Back']
  ]

  return (
    <div className="fixed bottom-1 w-full">
      {keyboard.map((row, key) => {
        return (
          <div key={key} className="flex justify-center">{
            row.map((e, key2) => {
              let color = 'bg-neutral-500'
              if (keyboardColors[e] === 3) {
                color = 'bg-green-500'
              } else if (keyboardColors[e] === 2) {
                color = 'bg-yellow-500'
              } else if (keyboardColors[e] === 1) {
                color = 'bg-neutral-700'
              }
              return (
                <div onClick={() => handleKeyboardClicked(e)} key={key2} className={`m-0.5 w-8 min-w-min p-2 text-center rounded ${color}`}>{
                  e === 'Back' ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                  </svg> : e
                }</div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Keyboard
