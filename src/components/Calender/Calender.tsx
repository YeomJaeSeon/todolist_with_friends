import React, { useState, forwardRef, useImperativeHandle } from 'react';
import DatePicker from 'react-datepicker';
import { CalendarBtn } from './Calender.style';

import 'react-datepicker/dist/react-datepicker.css';

export type RefType = {
  startDate: Date | null;
};

const Calendar = forwardRef<RefType>((_props, ref) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  useImperativeHandle(
    ref,
    () => ({
      startDate,
    }),
    [startDate]
  );

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => date && setStartDate(date)}
      customInput={<ExampleCustomInput />}
    />
  );
});

export default Calendar;

type CustomType = {
  value?: string;
  onClick?: () => void;
};

const ExampleCustomInput: React.FC<CustomType> = forwardRef(
  ({ value, onClick }, ref) => (
    <CalendarBtn
      type="button"
      className="example-custom-input"
      onClick={onClick}
    >
      {value} 📆
    </CalendarBtn>
  )
);
