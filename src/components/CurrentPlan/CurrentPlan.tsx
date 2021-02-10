import React, { useState } from 'react';
import { CurrentPlanContainer } from './CurrentPlan.style';
import { Droppable } from 'react-beautiful-dnd';

const CurrentPlan = () => {
  const [plan, setPlan] = useState();
  return <CurrentPlanContainer></CurrentPlanContainer>;
};

export default CurrentPlan;
