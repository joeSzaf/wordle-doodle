import { useContext } from 'react'
import BoardContext from '../../store/board-context'
import Button from '../UI/Button'

import classes from './PreviewSection.module.css'

const PreviewSection = () => {
  const boardCtx = useContext(BoardContext)

  let parsedText = boardCtx.generatedText

  if (parsedText) {
    parsedText = parsedText.split('\n')
    parsedText = parsedText.map((row, index) => {
      return <li key={index}>{row}</li>
    })
  }

  const emojiOptions = boardCtx.emojiSets.map((emojiOption, index) => {
    return (
      <option value={index} key={index}>{`${
        emojiOption.name
      }: ${emojiOption.emojis.join('')}`}</option>
    )
  })

  const emojiChangeHandler = (event) => {
    boardCtx.selectEmojiSet(event.target.value)
  }

  return (
    <section className={classes.preview}>
      <h1>Preview:</h1>
      <div className={classes.parsedTextArea}>
        <ul className={classes.parsedText}>{parsedText}</ul>
        <Button onClick={boardCtx.copyGeneratedText}>Copy</Button>
      </div>
      <div className={classes.selectEmojis}>
        <h3>Change emojis:</h3>
        <select value={boardCtx.selectedEmojiSet} onChange={emojiChangeHandler}>
          {emojiOptions}
        </select>
        <p>
          <em>
            Note: some emoji sets may appear unaligned. When copied to Discord
            or Twitter, they should be aligned.
          </em>
        </p>
      </div>
    </section>
  )
}

export default PreviewSection
