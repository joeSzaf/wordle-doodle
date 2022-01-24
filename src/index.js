import React from "react"
import ReactDOM from "react-dom"

import "./index.css"
import App from "./App"

import { BoardContextProvider } from "./store/board-context"

ReactDOM.render(<App />, document.getElementById("root"))

ReactDOM.render(
  <BoardContextProvider>
    <App />
  </BoardContextProvider>,
  document.getElementById("root")
)
