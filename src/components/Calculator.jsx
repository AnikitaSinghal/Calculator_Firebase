import { useState } from "react";
import axios from 'axios';
import Table from "./Table";

function Calculator() {
  const [result, setResult] = useState("");
  const [Name, setName] = useState('')
  const [Output, setOutput] = useState('')

  const inputNum = (e) => {
    var input = e.target.value;
    setResult(result.concat(input));
    setOutput(result.concat(input));
  };

  const clear = () => {
    setResult("");
  };

  const backspace = () => {
    setResult(result.slice(0, -1));
  };

  const calculate = () => {
    try {
      // eslint-disable-next-line
      const output = eval(result).toString();
      setResult(output)
    } catch (error) {
      setResult("Error")
    }
  };

  const postData = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/create', {
      Name: Name,
      operation: Output,
      result: result,
    })
      .then(response => {
        console.log("Data saved to the database.", response)
      })
      .catch(error => {
        console.log("Error", error)
      })
  };

  return (
    <>
      <div className="bg-gray-200 w-screen h-screen flex justify-start p-6 items-center">

        <div className="w-64 h-auto bg-white rounded-2xl shadow-xl border-4 border-gray-100">
          <div className="w-auto m-3 h-28 text-right space-y-2 py-2">
            <div className="text-black font-bold text-2xl">{result}</div>
          </div>
          <div className="w-auto m-1 h-auto mb-2">
            <div className="m-2 flex justify-between">
              <button className="btn-yellow" id="clear" onClick={clear}>AC</button>
              <button className="btn-grey" onClick={inputNum}>+/-</button>
              <button className="btn-grey" value="%" onClick={inputNum}>%</button>
              <button className="btn-orange" value="/" onClick={inputNum} >&divide;</button>
            </div>
            <div className="m-2 flex justify-between">
              <button className="btn-grey" value={7} onClick={inputNum}>7</button>
              <button className="btn-grey" value={8} onClick={inputNum}>8</button>
              <button className="btn-grey" value={9} onClick={inputNum}>9</button>
              <button className="btn-orange" value="*" onClick={inputNum}>x</button>
            </div>
            <div className="m-2 flex justify-between">
              <button className="btn-grey" value={4} onClick={inputNum}>4</button>
              <button className="btn-grey" value={5} onClick={inputNum}>5</button>
              <button className="btn-grey" value={6} onClick={inputNum}>6</button>
              <button className="btn-orange" value="-" onClick={inputNum}>-</button>
            </div>
            <div className="m-2 flex justify-between">
              <button className="btn-grey" value={1} onClick={inputNum}>1</button>
              <button className="btn-grey" value={2} onClick={inputNum}>2</button>
              <button className="btn-grey" value={3} onClick={inputNum}>3</button>
              <button className="btn-orange" value="+" onClick={inputNum}>+</button>
            </div>
            <div className="m-2 flex justify-between">
              <button className="btn-grey" value={0} onClick={inputNum}>0</button>
              <button className="btn-grey" value="." onClick={inputNum}>.</button>
              <button className="btn-yellow" id="backspace" onClick={backspace}>C</button>
              <button className="btn-green" onClick={calculate} id="result">=</button>
            </div>
            <div className="flex justify-center mt-5">
              <div className="w-20 h-1 bg-gray-100 rounded-l-xl rounded-r-xl"></div>
            </div>
          </div>
          <div className="m-2 flex justify-between">
            <input type="text" id="Name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="Name" value={Name}
              onChange={(e) => {
                setName(e.target.value)
              }} required />
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={postData}>Save</button>
          </div>
        </div>
        <Table />
      </div>
    </>
  );
}

export default Calculator;