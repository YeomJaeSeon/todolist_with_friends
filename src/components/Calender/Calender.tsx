import React, { useState, forwardRef, useImperativeHandle } from 'react';
import DatePicker from 'react-datepicker';
import { CalendarBtn } from './Calender.style';
import { useDispatch } from 'react-redux';
import { updateDateAction } from '../../modules/todos';

import 'react-datepicker/dist/react-datepicker.css';

type PropType = {
  cardId: string;
};

export type RefType = {
  startDate: Date | null;
};

const Calendar = forwardRef<RefType, PropType>(({ cardId }, ref) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  useImperativeHandle(
    ref,
    () => ({
      startDate,
    }),
    [startDate]
  );

  const changeHandler = (date: Date | null) => {
    console.log(date);
    const year = date?.getFullYear();
    const month = date?.getMonth() && date.getMonth() + 1;
    const day = date?.getDate();

    const today = `${year}-${month}-${day}`;

    dispatch(updateDateAction(cardId, today));

    console.log(`year : ${year} month : ${month} day : ${day}`);
    date && setStartDate(date);
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={changeHandler}
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
