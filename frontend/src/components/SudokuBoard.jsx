"use client"

import React from "react"
import { useState } from "react"
import SudokuCell from "./SudokuCell"
import { Button } from "@/components/ui/button"

const initialBoard = Array(9)
  .fill(null)
  .map(() => Array(9).fill(""))

export default function SudokuBoard() {
  const [board, setBoard] = useState(initialBoard)

  const handleCellChange = (row, col, value) => {
    const newBoard = board.map((r, i) => 
      r.map((c, j) => (i === row && j === col ? value : c))
    )
    setBoard(newBoard)
  }

  const handleSolve = () => {
    console.log("Solve button clicked")
  }

  const handleReset = () => {
    setBoard(initialBoard.map(row => [...row])) 
  }

  return (
    React.createElement("div", { 
      className: "flex flex-col items-center space-y-6" 
    }, [
      React.createElement("div", {
        key: "board",
        className: "grid grid-cols-9 gap-0 bg-white rounded-lg shadow-lg p-2"
      }, 
        board.map((row, rowIndex) =>
          row.map((cell, colIndex) =>
            React.createElement(SudokuCell, {
              key: `${rowIndex}-${colIndex}`,
              value: cell,
              onChange: (value) => handleCellChange(rowIndex, colIndex, value),
              rowIndex: rowIndex,
              colIndex: colIndex
            })
          )
        )
      ),
      React.createElement("div", { 
        key: "buttons", 
        className: "flex space-x-20" 
      }, [
        React.createElement(Button, {
          key: "reset-button",
          onClick: handleReset,
          className: "bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold py-2 px-6 rounded-full hover:from-red-600 hover:to-red-800 transition-all duration-300 ease-in-out transform hover:scale-105"
        }, "Reset"),
        
        React.createElement(Button, {
          key: "solve-button",
          onClick: handleSolve,
          className: "bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-2 px-6 rounded-full hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105"
        }, "Solve")
      ])
    ])
  )
}
