"use client"

import React from "react"
import { useState } from "react"
import SudokuCell from "./SudokuCell"
import { Button } from "@/components/ui/button"
import { validateSudoku, solveSudoku } from "@/lib/sudokusolver"

const initialBoard = Array(9)
  .fill(null)
  .map(() => Array(9).fill(""))

const initialUserEntered = Array(9)
  .fill(null)
  .map(() => Array(9).fill(false))

export default function SudokuBoard() {
  const [board, setBoard] = useState(initialBoard)
  const [message, setMessage] = useState("")
  const [userEntered, setUserEntered] = useState(initialUserEntered)

  const handleCellChange = (row, col, value) => {
    const newBoard = board.map((r, i) => 
      r.map((c, j) => (i === row && j === col ? value : c))
    )
    const newUserEntered = userEntered.map((r, i) => 
      r.map((c, j) => (i === row && j === col ? value !== "" : c))
    )
    setBoard(newBoard)
    setUserEntered(newUserEntered)
    setMessage("")
  }

  const handleSolve = () => {
    const formattedBoard = board.map(row =>
      row.map(cell => cell === "" ? "." : cell)
    );
    console.log("Solve button clicked");
    // console.log(formattedBoard);
    if(validateSudoku(formattedBoard)) {
      setMessage("Sudoku is valid. Solving...");
      solveSudoku(formattedBoard);
      setBoard(formattedBoard);
      setMessage("Sudoku Solved!");
    } else {
      // console.log("Sudoku is invalid");
      setMessage("Invalid Sudoku board! Please Check your Inputs.");
    }
  }

  const handleReset = () => {
    setBoard(initialBoard.map(row => [...row])) 
    setUserEntered(initialUserEntered.map(row => [...row]))
    setMessage("")
  }

  const hasValues = board.some(row => row.some(cell => cell !== ""))

  return (
    React.createElement("div", { 
      className: "flex flex-col items-center space-y-6" 
    }, [
      React.createElement("div", {
        key: "message",
        className: `text-center font-medium text-lg ${
          message.includes("Invalid") ? "text-red-600" : 
          message.includes("solved") ? "text-green-600" : 
          "text-blue-600"
        }`
      }, message || (!hasValues ? "Enter values to begin" : "")),

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
              colIndex: colIndex,
              isUserEntered: userEntered[rowIndex][colIndex]
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
          disabled: !hasValues,
          className: "bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-2 px-6 rounded-full hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105"
        }, "Solve")
      ])
    ])
  )
}
