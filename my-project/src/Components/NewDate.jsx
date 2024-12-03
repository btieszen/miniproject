import React from 'react';



 function NewDate() {
  const current = new Date();
  
const date=`${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
  return (
    <div className="App">
      <p>Date Ordered is {date}</p>
    </div>
  );
}

export default NewDate;