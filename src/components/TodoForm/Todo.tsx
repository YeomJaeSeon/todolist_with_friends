import React from 'react';

type PropType = {
  todo: {
    id: number;
    thing: string;
  };
};

const Todo: React.FC<PropType> = ({ todo }) => {
  return (
    <li>
      {todo.thing}
      <button>✔</button>
      <button>➖</button>
    </li>
  );
};

export default Todo;
