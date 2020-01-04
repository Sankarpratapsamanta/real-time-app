import React from 'react';
import './App.css';
import Chart from './component/chart/chart.component';
import PieComponent from './component/pie/pie.component';
function App() {
  return (
    <div className="App">
      <Chart/>
      <PieComponent />
    </div>
  );
}

export default App;
