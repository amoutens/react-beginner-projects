import './index.scss';
import React from 'react';
function App() {
  const[count, setCount] = React.useState(0);
  const fnPlus = () => {setCount(count+1)}
  return (
    <div className="App">
      <div>
        <h2>Счетчик:</h2>
        <h1>{count}</h1>
        <button className="minus">- Минус</button>
        <button onClick={fnPlus} className="plus">Плюс +</button>
      </div>
    </div>
  );
}

export default App;
