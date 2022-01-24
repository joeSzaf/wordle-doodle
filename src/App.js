import React from 'react'
import Board from './components/Canvas/Board'
import ConversionSection from './components/Conversion/ConversionSection'
import PreviewSection from './components/Conversion/PreviewSection'
import Info from './components/Info/Info'
import Header from './components/UI/Header'

function App() {
  return (
    <div className='app-container'>
      <Header />
      <main>
        <ConversionSection />
        <PreviewSection />
        <Board />
        <Info />
      </main>
    </div>
  )
}

export default App
