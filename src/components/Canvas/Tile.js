import { useContext } from 'react'
import BoardContext from '../../store/board-context'

import classes from './Tile.module.css'

const Tile = (props) => {
  const boardCtx = useContext(BoardContext)

  let colors = !boardCtx.highContrastMode ? ['black-background', 'yellow-background', 'green-background'] : ['black-background', 'blue-background', 'orange-background']
  // let color =
  //   props.tileState === 0
  //     ? 'black-background'
  //     : props.tileState === 1
  //     ? 'yellow-background'
  //     : props.tileState === 2
  //     ? 'green-background'
  //     : ''

  let color = colors[props.tileState]

  const clickHandler = () => {
    boardCtx.updateTile(props.row, props.column)
  }

  return (
    <div className={`${classes.tile} ${color}`} onClick={clickHandler}></div>
  )
}

export default Tile
