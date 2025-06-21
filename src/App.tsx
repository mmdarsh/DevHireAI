import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center gap-4 mb-4">
            <a href="https://vite.dev" target="_blank">
              <img src={viteLogo} className="h-16 w-16" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="h-16 w-16 animate-spin" alt="React logo" />
            </a>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Vite + React + Material Tailwind
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-500 text-white p-4">
              <h2 className="text-xl font-semibold text-center">Counter Example</h2>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-3xl font-bold text-blue-600 mb-4">{count}</h3>
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 transition-colors"
                onClick={() => setCount((count) => count + 1)}
              >
                Increment
              </button>
              <button 
                className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold py-2 px-4 rounded transition-colors"
                onClick={() => setCount(0)}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-green-500 text-white p-4">
              <h2 className="text-xl font-semibold text-center">Material Tailwind Setup</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Your Material Tailwind CSS setup is complete! You can now use all the Material Design components.
              </p>
              <div className="flex gap-2 flex-wrap">
                <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-2 px-3 rounded transition-colors">
                  Primary
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-2 px-3 rounded transition-colors">
                  Danger
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-2 px-3 rounded transition-colors">
                  Success
                </button>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-bold py-2 px-3 rounded transition-colors">
                  Warning
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">
            Edit <code className="bg-gray-100 px-2 py-1 rounded">src/App.tsx</code> and save to test HMR
          </p>
          <p className="text-sm text-gray-500">
            Click on the Vite and React logos to learn more
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
