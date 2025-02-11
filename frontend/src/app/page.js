import SudokuBoard from "../components/SudokuBoard"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
        Sudoku Solver
      </h1>
      <SudokuBoard />
    </main>
  )
}

