import React from 'react';

type PropType = {
  todo: {
    id: string;
    thing: string;
  };
};

const TodoCard: React.FC<PropType> = ({ todo }) => {
  return <div>{todo.thing}</div>;
};

export default TodoCard;
