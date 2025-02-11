import React from "react"

export default function SudokuCell({ value, onChange, rowIndex, colIndex }) {
  const handleKeyDown = (e) => {
    const keysMap = {
      'ArrowRight': [0, 1],
      'ArrowLeft': [0, -1],
      'ArrowUp': [-1, 0],
      'ArrowDown': [1, 0]
    }

    if (keysMap[e.key]) {
      e.preventDefault() // Prevent default arrow key scrolling
      const [rowDiff, colDiff] = keysMap[e.key]
      const nextRow = rowIndex + rowDiff
      const nextCol = colIndex + colDiff

      // Check if next position is within bounds
      if (nextRow >= 0 && nextRow < 9 && nextCol >= 0 && nextCol < 9) {
        const nextCell = document.querySelector(`[data-position="${nextRow}-${nextCol}"]`)
        nextCell?.focus()
      }
    }

    // Handle Backspace or Delete
    if (e.key === 'Backspace' || e.key === 'Delete') {
      onChange('')
    }
  }

  const handleChange = (e) => {
    // Take only the last character entered
    const newValue = e.target.value.slice(-1) 
    if (newValue === "" || (Number.parseInt(newValue) >= 1 && Number.parseInt(newValue) <= 9)) {
      onChange(newValue)
      // After entering a valid number, move to the next cell
      if (newValue !== "") { 
        // Only move to next cell if a number was entered
        const nextCell = document.querySelector(`[data-position="${rowIndex}-${colIndex + 1}"]`) ||
                        document.querySelector(`[data-position="${rowIndex + 1}-0"]`)
        nextCell?.focus()
      }
    }
  }

  const borderClasses = [
    colIndex % 3 === 0 ? "border-l-2" : "border-l",
    rowIndex % 3 === 0 ? "border-t-2" : "border-t",
    colIndex === 8 ? "border-r-2" : "",
    rowIndex === 8 ? "border-b-2" : "",
  ].join(" ")

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      data-position={`${rowIndex}-${colIndex}`}
      className={`w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-xl ${borderClasses} border-gray-300 
        focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-0 focus:border-transparent
        focus:relative focus:z-10 
        transition-all duration-300 ease-in-out`}
      maxLength={1}
    />
  )
}