import { useContext, useState } from 'react'
import BoardContext from '../../store/board-context'
import Button from '../UI/Button'

import classes from './ConversionSection.module.css'

const ConversionSection = () => {
  const [enteredResults, setEnteredResults] = useState('')
  const boardCtx = useContext(BoardContext)

  const resultsChangeHandler = (event) => {
    setEnteredResults(event.target.value)
  }

  let parsedText = boardCtx.generatedText

  if (parsedText) {
    parsedText = parsedText.split('\n')
    parsedText = parsedText.map((row, index) => {
      return <li key={index}>{row}</li>
    })
  }

  const handleConvertResults = () => {
      boardCtx.parseClipBoard(enteredResults)
  }

  return (
    <section className={classes.conversionSection}>
      <h1>Convert your results:</h1>
      <form>
        <textarea
          name="results"
          placeholder="Paste your results here!"
          rows="8"
          spellCheck="false"
          required
          onChange={resultsChangeHandler}
        ></textarea>
      </form>
      <Button onClick={handleConvertResults}>Convert</Button>
      {boardCtx.convertedClipBoard && (
        <div className={classes.copiedClipboardTextDiv}>
          <h5>
            <strong>Copied to clipboard:</strong>
          </h5>
          <p className="line-break-text">{boardCtx.convertedClipBoard}</p>
        </div>
      )}
    </section>
  )
}

export default ConversionSection
