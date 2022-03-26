const Board: React.FC<{ board: string[][], colors: number[][] }> = ({ board, colors }) => {
  return (
    <div>
      {board.map((row, key) => {
        return (
          <div key={key} className="flex">{
            row.map((e, key2) => {
              const colorNumber = colors[key][key2]
              let color = 'bg-neutral-900'
              if (colorNumber === 1) {
                color = 'bg-neutral-500'
              } else if (colorNumber === 2) {
                color = 'bg-yellow-500'
              } else if (colorNumber === 3) {
                color = 'bg-green-500'
              }
              return (
                <div key={key2} className={
                  `w-12 h-12 py-2 text-2xl m-0.5 text-center 
                  ${colorNumber === 0 ? 'border border-neutral-500' : color}`
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
