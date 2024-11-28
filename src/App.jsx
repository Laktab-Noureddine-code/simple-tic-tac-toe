import { useEffect, useState } from "react";
import "./App.css";
import winningScenarios from "./Strategies.js";
import { createPortal } from "react-dom";

function App() {
  const [movements, setMovements] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [winuser, setWinuser] = useState("");
  const [stop, setStop] = useState(false);
  const [xo, setXo] = useState(false);
  function updateMovements(index) {
    if (
      movements[index] !== false &&
      movements[index] !== true &&
      stop === false
    ) {
      let newArray = [...movements];
      newArray[index] = xo;
      setMovements(newArray);
    }
  }
  useEffect(() => {
    let draw = 0;
    movements.forEach((e) => {
      if (e === false || e === true) {
        draw++;
      }
    });
    if (draw === 9 ) {
      setWinuser("draw");
      setStop(true);
    }
    
    winningScenarios.forEach((element) => {
      let counterTrue = 0;
      let counterFalse = 0;
      element.forEach((elem) => {
        if (movements[elem] === true) counterTrue++;
        if (movements[elem] === false) counterFalse++;
      });
      if (counterTrue === 3) {
        setWinuser("X Win");
        counterFalse = 0;
        setStop(true);
      }
      if (counterFalse === 3) {
        setWinuser("O Win");
        counterTrue = 0;
        setStop(true);
      }


      counterTrue = 0;
      counterFalse = 0;
    });
  }, [xo]);
  function userPlay(e) {
    const index = e.target.id;

    console.log(index);
    updateMovements(index);
    setXo(!xo);
  }
  return (
    <div className="App">
      {movements.map((move, index) => {
        return (
          <div className="child" id={index} key={index} onClick={userPlay}>
            {move === true ? "X" : move === false ? "O" : ""}
          </div>
        );
      })}
      {stop
        ? createPortal(
            <>
              <div className="overLay"></div>
              <div className="winnig">
                <div className="container">
                  <h1>{stop ? winuser : ""}</h1>
                  <button
                    onClick={() => {
                      setMovements(["", "", "", "", "", "", "", "", ""]);
                      setStop(false);
                    }}
                  >
                    restart
                  </button>
                </div>
              </div>
            </>,
            document.getElementById("root")
          )
        : null}
    </div>
  );
}

export default App;
