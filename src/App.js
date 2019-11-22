import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Aux from './hoc/Auxiliary/Auxiliary';
import Calculator from './components/SalaryCalculator/Calculator/Calculator';

function App() {
  return (
    <div>
      <center>
        <Aux>
            <Calculator />
        </Aux>
      </center>
    </div>
  );
}

export default App;
