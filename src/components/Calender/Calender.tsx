import React, { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { CalendarBtn } from './Calender.style';
import { useDispatch } from 'react-redux';
import { updateDateAction } from '../../modules/todos';

import 'react-datepicker/dist/react-datepicker.css';
import { DatabaseType } from 'src/services/data_service';

type PropType = {
  uid: string;
  databaseService: DatabaseType;
  cardId: string;
};

const Calendar: React.FC<PropType> = ({ uid, databaseService, cardId }) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const changeHandler = (date: Date | null) => {
    const year = date?.getFullYear();
    const month = date?.getMonth() && date.getMonth() + 1;
    const day = date?.getDate();

    const today = `${year}-${month}-${day}`;

    dispatch(updateDateAction(cardId, today));
    databaseService.updateCalendar(uid, cardId, today);

    date && setStartDate(date);
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={changeHandler}
      customInput={<ExampleCustomInput />}
    />
  );
};

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
