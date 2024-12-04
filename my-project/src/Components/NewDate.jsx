import React from 'react';
import { formateDate } from '../utils';


 function NewDate() {

  return (
    <div className="App">
      <p>Date Ordered is {formateDate}</p>
    </div>
  );
}

export default NewDate;