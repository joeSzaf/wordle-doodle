import Tile from './Tile'

import classes from './Row.module.css'

const Row = (props) => {
  const tiles = props.rowState.map((tileState, index) => {
    return <Tile tileState={tileState} row={props.rowNumber} column={index} key={index} />
  })

  return (
    <div className={classes.row}>
      {tiles}
    </div>
  )
}

export default Row
