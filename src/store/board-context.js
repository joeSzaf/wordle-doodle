import React, { useState, useEffect, useCallback } from 'react'

const BoardContext = React.createContext({
  boardState: [],
  generatedText: '',
  emojiSet: [],
  emojiSets: [],
  selectedEmojiSet: 0,
  highContrastMode: false,
  addRow: () => {},
  removeRow: () => {},
  clearState: () => {},
  selectEmojiSet: () => {},
  changeHighContractMode: () => {},
  updateTileHandler: (row, col) => {},
  generateText: () => {},
  copyGeneratedText: () => {},
  parseClipBoard: () => {},
})

const EMOJI_SETS = [
  { name: 'Wordle Classic', emojis: ['⬜', '🟨', '🟩'] },
  { name: 'Shape Fill', emojis: ['⬜', '⏹', '🟦'] },
  { name: 'Dark', emojis: ['⬛', '🟨', '🟩'] },
  { name: 'Hearts', emojis: ['🤍', '💗', '💖'] },
  { name: 'Cards', emojis: ['🟥', '🎴', '🃏'] },
  { name: 'Sunbeams', emojis: ['🟦', '⛅', '🌞'] },
  { name: 'Sunflowers', emojis: ['🟫', '🌱', '🌻'] },
  { name: 'Chicks!', emojis: ['🥚', '🐣', '🐥'] },
  { name: 'Moons', emojis: ['🌑', '🌓', '🌕'] },
  { name: 'Rainbows', emojis: ['☁', '🌦', '🌈'] },
  { name: 'Tigers', emojis: ['🟥', '🐅', '🐯'] },
  { name: 'Boston Flowers', emojis: ['🟫', '🌱', '🌹'] },
  { name: 'Shoes', emojis: ['🟨', '🦶', '👟'] },
  { name: 'Death Mints', emojis: ['⬛', '🍬', '💀'] },
  { name: 'Books', emojis: ['⬜', '📘', '📖'] },
  { name: 'Fishing', emojis: ['🟦', '🐟', '🎣'] },
  { name: 'Kisses', emojis: ['🔲', '💄', '💋'] },
  { name: 'Snow', emojis: ['☁', '🌨', '❄'] },
  { name: 'Wormy', emojis: ['🟫', '🐚', '🐌'] },
  { name: 'Butterfly', emojis: ['🍀', '🐛', '🦋'] },
  { name: 'Crabby', emojis: ['🟦', '🌊', '🦀'] },
  { name: 'Fire', emojis: ['🟫', '🪓', '🔥'] },
]

export const BoardContextProvider = (props) => {
  const [boardState, setBoardState] = useState([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ])

  const [selectedEmojiSet, setSelectedEmojiSet] = useState(0)
  const [generatedText, setGeneratedText] = useState('')
  const [highContrastMode, setHighContrastMode] = useState(false)

  const emojiSet = EMOJI_SETS[selectedEmojiSet].emojis

  const updateTileHandler = (row, col) => {
    const currentValue = boardState[row][col]

    const newValue = (currentValue + 1) % emojiSet.length

    const newBoardState = [...boardState]
    newBoardState[row][col] = newValue

    setBoardState(newBoardState)
  }

  const selectEmojiSet = (selectedEmojiIndex) => {
    setSelectedEmojiSet(selectedEmojiIndex)
  }

  const changeHighContractMode = useCallback(() => {
    setHighContrastMode((highContrastMode) => !highContrastMode)
  }, [])

  const clearState = () => {
    const newBoardState = []
    boardState.forEach((row) => {
      let newRow = []
      row.forEach((tile) => {
        newRow.push(0)
      })
      newBoardState.push(newRow)
    })

    setBoardState(newBoardState)
  }

  const parseResults = (results) => {
    try {
      const standardSet = ['⬜⬛', '🟨🟦', '🟩🟧']
      const splitRows = results.split('\n')

      const cleanedRows = splitRows.filter((row) => {
        return (
          row.includes(standardSet[0][0]) ||
          row.includes(standardSet[1][0]) ||
          row.includes(standardSet[2][0]) ||
          row.includes(standardSet[0][1]) ||
          row.includes(standardSet[1][1]) ||
          row.includes(standardSet[2][1])
        )
      })

      const parsedRows = cleanedRows.map((row) => {
        const newRow = []
        const iteratableRow = [...row]
        iteratableRow.forEach((char) => {
          standardSet.forEach((item, index) => {
            if (item.includes(char)) {
              newRow.push(index)
            }
          })
        })
        return newRow
      })

      return parsedRows
    } catch (error) {
      console.log('Unable to parse the results, please try again.')
    }
  }

  const parseClipBoard = async (results) => {
    setBoardState(parseResults(results))
  }

  const generateText = useCallback(() => {
    let mappedBoardState = []

    boardState.forEach((row) => {
      const mappedRow = row.map((tileValue) => {
        return emojiSet[tileValue]
      })

      mappedBoardState.push(mappedRow.join(''))
    })

    const generatedText = mappedBoardState.join('\n')
    setGeneratedText(generatedText)
  }, [boardState, emojiSet])

  const copyGeneratedText = () => {
    navigator.clipboard.writeText(generatedText)
  }

  const addRow = () => {
    if (boardState.length >= 6) return

    setBoardState((prevBoardState) => {
      let lastRow = [0, 0, 0, 0, 0]

      if (prevBoardState.length > 0) {
        lastRow = [...prevBoardState[prevBoardState.length - 1]]
      }

      return [...prevBoardState, lastRow]
    })
  }

  const removeRow = () => {
    if (boardState.length <= 1) return

    setBoardState((prevBoardState) => {
      return prevBoardState.slice(0, -1)
    })
  }

  useEffect(() => {
    generateText()
  }, [boardState, selectedEmojiSet, generateText])

  const contextValue = {
    boardState: boardState,
    generatedText: generatedText,
    emojiSet,
    emojiSets: EMOJI_SETS,
    selectedEmojiSet,
    highContrastMode,
    generateText,
    updateTile: updateTileHandler,
    changeHighContractMode,
    addRow,
    removeRow,
    copyGeneratedText,
    clearState,
    selectEmojiSet,
    parseClipBoard,
  }

  return (
    <BoardContext.Provider value={contextValue}>
      {props.children}
    </BoardContext.Provider>
  )
}

export default BoardContext
