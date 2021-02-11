import Card from 'src/components/Card/Card';

const ADD_CARD = 'todo/ADD_CARD' as const;
const DELETE_CARD = 'todo/DELETE_CARD' as const;
const SAME_CHANGE_CARD = 'todo/SAME_CHANGE_CARD' as const;
const DIFF_CHANGE_CARD = 'todo/DIFF_CHANGE_CARD' as const;
const ADD_TODO = 'todo/ADD_TODO' as const;
const DELETE_TODO = 'todo/DELETE_TODO' as const;
const UPDATE_TODO = 'todo/UPDATE_TODO' as const;

export const addCardAction = (id: string) => {
  return {
    type: ADD_CARD,
    payload: { id: id },
  };
};

export const deleteCardAction = (id: string) => {
  return {
    type: DELETE_CARD,
    payload: { id: id },
  };
};

export const sameChangeCardAction = (sIndex: number, dIndex: number) => {
  return {
    type: SAME_CHANGE_CARD,
    payload: {
      sIndex: sIndex,
      dIndex: dIndex,
    },
  };
};

export const diffChangeCardAction = (
  id: string,
  sIndex: number,
  dIndex: number
) => {
  return {
    type: DIFF_CHANGE_CARD,
    payload: {
      id: id,
      sIndex: sIndex,
      dIndex: dIndex,
    },
  };
};

export const addTodoAction = (cardId: string, id: number, newTodo: string) => {
  return {
    type: ADD_TODO,
    payload: {
      cardId: cardId,
      id: id,
      thing: newTodo,
    },
  };
};

export const deleteTodoAction = (cardId: string, id: number) => {
  return {
    type: DELETE_TODO,
    payload: {
      cardId: cardId,
      id: id,
    },
  };
};

export const updateTodoAction = (cardId: string, id: number, todo: string) => {
  return {
    type: UPDATE_TODO,
    payload: {
      cardId: cardId,
      id: id,
      todo: todo,
    },
  };
};

type ActionType =
  | ReturnType<typeof addCardAction>
  | ReturnType<typeof deleteCardAction>
  | ReturnType<typeof addTodoAction>
  | ReturnType<typeof deleteTodoAction>
  | ReturnType<typeof updateTodoAction>
  | ReturnType<typeof sameChangeCardAction>
  | ReturnType<typeof diffChangeCardAction>;

type StateType = {
  id: string;
  current: boolean;
  todos: TodoType;
}[];

type TodoType = {
  id: number;
  thing: string;
}[];

const initialState: StateType = [];

const todoReducer = (state: StateType = initialState, action: ActionType) => {
  switch (action.type) {
    case ADD_CARD:
      return [...state, { id: action.payload.id, current: false, todos: [] }];
    case DELETE_CARD:
      return state.filter((card) => card.id !== action.payload.id);
    case SAME_CHANGE_CARD:
      const newCards = [...state];
      const [reorderedItem] = newCards.splice(action.payload.sIndex, 1);
      newCards.splice(action.payload.dIndex, 0, reorderedItem);
      return newCards;

    case DIFF_CHANGE_CARD:
      const addingCard = state.find((card) => card.current === true);
      const originCard = state.filter((card) => card.current === false);

      addingCard && originCard.splice(action.payload.dIndex - 1, 0, addingCard);

      return originCard.map((card) => {
        if (card.id === action.payload.id) {
          return { ...card, current: !card.current };
        }
        return { ...card, current: false };
      });

    case ADD_TODO:
      return state.map((card) => {
        if (card.id === action.payload.cardId) {
          return {
            ...card,
            todos: [
              ...card.todos,
              { id: action.payload.id, thing: action.payload.thing },
            ],
          };
        }
        return card;
      });
    case DELETE_TODO:
      return state.map((card) => {
        if (card.id === action.payload.cardId) {
          return {
            ...card,
            todos: card.todos.filter((todo) => todo.id !== action.payload.id),
          };
        }
        return card;
      });
    case UPDATE_TODO:
      return state.map((card) => {
        if (card.id === action.payload.cardId) {
          return {
            ...card,
            todos: card.todos.map((todo) => {
              if (todo.id === action.payload.id) {
                return { ...todo, thing: action.payload.todo };
              }
              return todo;
            }),
          };
        }
        return card;
      });
    default:
      return state;
  }
};

export default todoReducer;
