const Board: React.FC<{ board: string[][], colors: number[][], attempt: number, shake: boolean}> = ({ board, colors, attempt, shake}) => {
  return (
    <div>
      {board.map((row, key) => {
        let animation = shake && key === attempt ? 'animate-shake-quick' : ''

        return (
          <div key={key} className={`flex ${animation}`}>{
            row.map((e, key2) => {
              let border = e ? 'border-2 border-neutral-500 animate-bounce-quick' :'border-2 border-neutral-700'
              const colorNumber = colors[key][key2]
              let color = 'bg-neutral-900'
              if (colorNumber === 1) color = 'bg-neutral-500'
              if (colorNumber === 2) color = 'bg-yellow-500'
              if (colorNumber === 3) color = 'bg-green-500'
              
              return (
                <div key={key2} className={
                  `h-[7vh] w-[7vh] max-h-[15vw] max-w-[15vw] m-[.5vh] flex justify-center items-center text-xl
                  ${colorNumber === 0 ? border : color}`
                }>{e}</div>
              )
            })
          }</div>
        )
      })}
    </div>
  )
}

export default Board
