import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  

  return (
    <main className="min-h-screen bg-[#f8f6ef] flex flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-5xl font-bold text-green-900">
        Vivero
      </h1>

      <p className="text-lg text-gray-600">
        Nuestro catálogo de plantas
      </p>

      <button className="rounded-full bg-green-900 px-6 py-3 font-semibold text-white hover:bg-green-800">
        Explorar catálogo
      </button>
    </main>
  );
}

export default App
