import { useEffect, useReducer } from "react"
import Content from "./Content"
import Header from "./Header"

const initialState = {
  questions: [],
  // loading, error,ready,active,finished
  status: "loading",
}

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      }
    case "dataFailed":
      return {
        ...state,
        status: "error",
      }
    default:
      throw new Error("Unknown action")
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(function () {
    fetch(`http://localhost:5000/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }))
  }, [])
  return (
    <div className="app">
      <Header />
      <Content>
        <p>1/15</p>
        <p>Question?</p>
      </Content>
    </div>
  )
}
