import { useContext } from 'react'
import BoardContext from '../../store/board-context'
import Button from '../UI/Button'

import classes from './Board.module.css'
import Row from './Row'

const Board = () => {
  const boardCtx = useContext(BoardContext)

  let parsedText = boardCtx.generatedText

  if (parsedText) {
    parsedText = parsedText.split('\n')
    parsedText = parsedText.map((row, index) => {
      return <li key={index}>{row}</li>
    })
  }

  const board = boardCtx.boardState.map((row, index) => {
    return <Row rowState={row} rowNumber={index} key={index} />
  })

  return (
    <section className={classes.board}>
      <h1>Edit your results: </h1>
      <div className={classes.boardContainer}>{board}</div>
      <div className={classes.buttonContainer}>
        <Button onClick={boardCtx.addRow}>Add Row</Button>
        <Button onClick={boardCtx.removeRow}>Remove Row</Button>
        <Button onClick={boardCtx.clearState} className="clearButton">
          Clear All
        </Button>
      </div>
      <div className={classes.toggleContainer}>
        <label className="switch">
          <input
            type="checkbox"
            onChange={boardCtx.changeHighContractMode}
            value={boardCtx.highContrastMode}
          />
          <span className="slider"></span>
        </label>

        <label className={classes.toggleLabel}>High Contrast</label>
      </div>
    </section>
  )
}

export default Board
