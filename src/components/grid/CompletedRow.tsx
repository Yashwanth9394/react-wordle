import { collection, doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { FaLightbulb } from 'react-icons/fa'

// Ensure correct import
import { db } from '../../firebase'
// Assuming db is correctly initialized
import { getGuessStatuses } from '../../lib/statuses'
import { unicodeSplit } from '../../lib/words'
import { Cell } from './Cell'

type Props = {
  solution: string
  guess: string
  isRevealing?: boolean
  hintIndex: number
}

export const CompletedRow: React.FC<Props> = ({
  solution,
  guess,
  isRevealing,
  hintIndex,
}) => {
  const [hint, setHint] = useState('')
  const statuses = getGuessStatuses(solution, guess)
  const splitGuess = unicodeSplit(guess)
  const [showPopup, setShowPopup] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchHint() {
      console.log('Fetching hint for solution:', solution.toLowerCase()) // Log the solution being queried
      const hintRef = doc(collection(db, 'hints'), solution.toLowerCase())
      const docSnap = await getDoc(hintRef)
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data()) // Check what data is being returned
        const hints = docSnap.data().hints
        if (hints && hintIndex < hints.length) {
          const selectedHint = hints[hintIndex]
          setHint(selectedHint)
          console.log('Selected hint:', selectedHint) // Log the hint being set
        } else {
          console.error('Hints array is missing or the key is out of bounds')
        }
      } else {
        console.error('No document exists for the provided solution')
      }
    }

    fetchHint()
  }, [solution.toLowerCase(), hintIndex])

  const handleHintClick = () => {
    setShowPopup(true)
    setTimeout(() => {
      setShowPopup(false)
    }, 3500) // Hide the popup after 3 seconds
  }

  useEffect(() => {
    if (showPopup) {
      popupRef.current?.classList.add('show')
    } else {
      popupRef.current?.classList.remove('show')
    }
  }, [showPopup])
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative mb-1 flex justify-center">
      {splitGuess.map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          status={statuses[i]}
          isRevealing={isRevealing}
        />
      ))}
      <button onClick={handleHintClick} className="z-10">
        <FaLightbulb color="yellow" size="2em" />
      </button>
      {showPopup && (
        <div className="overlay position-absolute">
          <div ref={popupRef} className="comic-popup">
            <p>{hint}</p> {/* Display the fetched hint */}
          </div>
        </div>
      )}
    </div>
  )
}
