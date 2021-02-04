import React, { useState } from 'react';
import Calendar from 'react-calendar';
import {} from './Calender.style';

const Calender = () => {
  const [value, onChange] = useState(new Date());

  // const change = (e) => {
  //   setValue((value) => e.target.value);
  // };
  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
};

export default Calender;
