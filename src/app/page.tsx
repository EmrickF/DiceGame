"use client";  
import { useState } from "react";
import React from "react";
import Dice from '../components/dice'
import { useRouter } from "next/navigation"

export default function Home() {
  const [results, setResults] = useState<number[]>([null, null, null])
  const [total, setTotal] = useState<number | null>(null)
  const [rolling, setRolling] = useState([false, false, false])
  const [money, setMoney] = useState<number>(1000)
  const [message, setMessage] = useState<string>("")
  const [spinCount, setSpinCount] = useState<number>(0)
  const router = useRouter();

  async function rollDice(i: number) {
    if (spinCount >= 15) {
      setMessage("Maximalt antal kast (15) nått! Sidan laddas om...");
      setTimeout(() => window.location.reload(), 1000)
      return
    }
    if (money < 10) {
      setMessage("DU ÄR FATTIG LÄGG IN MERA PENGAR😡😡😡😡!")
      return
    }
    setMoney(money - 20)
    setMessage("")

    const newRolling = [...rolling]
    newRolling[i] = true
    setRolling(newRolling)

    const res = await fetch("/api/roll")
    const data = await res.json()

    setTimeout(() => {
      const newResults = [...results]
      newResults[i] = data.roll
      setResults(newResults)
      setTotal(newResults.reduce((sum, val) => sum + (val || 0), 0))

      newRolling[i] = false
      setRolling([...newRolling])

      setSpinCount(count => count + 1);

      if (newResults.every(val => val !== null)) {
        if (newResults[0] === newResults[1] && newResults[1] === newResults[2]) {
          const winValue = newResults[0]
          const winAmount = winValue * 50
          setMoney(m => m + winAmount)
          setTimeout(() => {
            window.alert(`Grattis! Du fick tre i rad med ${winValue}. Du vann ${winAmount}€!`)
            window.location.reload()
          }, 2000)
        } else {
          setMessage("Ingen vinst. Försök igen! 🤣🤣🤣")
        }
      }
    }, 500)
  }

  React.useEffect(() => {
    setResults([null, null, null])
  }, [])

  return (
   <main className="flex flex-col select-none items-center justify-center min-h-screen
    bg-gradient-to-br from-black via-[#0a1833] to-[#1e293b] relative">
      <div className="absolute top-6 right-8 flex gap-4">
        <button
          onClick={() => router.push("/login")}
          className="px-6 py-2 rounded bg-blue-700 hover:bg-blue-500 text-white font-semibold shadow-lg transition"
        >
          Logga in
        </button>
        <button
          onClick={() => router.push("/register")}
          className="px-6 py-2 rounded bg-blue-700 hover:bg-blue-500 text-white font-semibold shadow-lg transition"
        >
          Skapa konto
        </button>
      </div>
      <h1 className="text-3xl font-bold mt-8 mb-8 text-center text-white">SLÅ TÄRNINGEN!!!</h1>
      <div className="flex flex-col  items-center border-4 border-blue-700 rounded-lg bg-gray-800 p-10 shadow-lg text-black">
        <div className="mb-4 text-white text-lg">Pengar: {money}€</div>
        <div className="mb-2 text-white text-md">Kast kvar: {15 - spinCount}</div>
        <div>
          <div className="flex flex-row gap-8 mb-4 justify-center">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="flex items-center justify-center h-[128px] w-[128px] mb-2 rounded overflow-hidden bg-gray-700">
                  <Dice value={results[i]} rolling={rolling[i]} />
                </span>
                <button
                  onClick={() => rollDice(i)}
                  className="bg-blue-700 hover:bg-blue-500 text-white px-4 py-2 rounded"
                  disabled={rolling[i] || money < 20 || spinCount >= 15}
                >
                  Kasta (-20€)
                </button>
              </div>
            ))}
          </div>
          {total !== null && <p className="mt-4 text-lg text-center text-white">Total: {total}</p>}
          {message && <p className="mt-2 text-center text-yellow-300">{message}</p>}
        </div>
      </div>
    </main>
  )
}
