import { FaRegLightbulb } from 'react-icons/fa'

import { solution } from '../../lib/words'
import { Cell } from './Cell'

type Props = {
  isLast: boolean
}

export const EmptyRow = ({ isLast }: Props) => {
  const emptyCells = Array.from(Array(solution.length))
  const bulbColor = isLast ? 'transparent' : 'yellow' // Change "red" to the color you want for the last row

  return (
    <div className="mb-1 flex justify-center">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
      {isLast ? (
        <div style={{ width: '2em', height: '2em' }}></div>
      ) : (
        <button disabled style={{ color: 'yellow' }}>
          <FaRegLightbulb size="2em" />
        </button>
      )}
    </div>
  )
}
