const ADD_CARD = 'todo/ADD_CARD' as const;
const DELETE_CARD = 'todo/DELETE_CARD' as const;
const ADD_TODO = 'todo/ADD_TODO' as const;
const DELETE_TODO = 'todo/DELETE_TODO' as const;
const UPDATE_TODO = 'todo/UPDATE_TODO' as const;

export const addCardAction = (id: number) => {
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
  | ReturnType<typeof updateTodoAction>;

type StateType = {
  [cardId: string]: {
    id: string;
    todos: { id: number; thing: string }[];
  };
};

const initialState: StateType = {};

const todoReducer = (state: StateType = initialState, action: ActionType) => {
  switch (action.type) {
    case ADD_CARD:
      return {
        ...state,
        [action.payload.id]: { id: action.payload.id, todos: [] },
      };
    case DELETE_CARD:
      const newCard = { ...state };
      delete newCard[action.payload.id];
      return newCard;
    case ADD_TODO:
      return {
        ...state,
        [action.payload.cardId]: {
          id: action.payload.cardId,
          todos: [
            ...state[action.payload.cardId].todos,
            { id: action.payload.id, thing: action.payload.thing },
          ],
        },
      };
    case DELETE_TODO:
      return {
        ...state,
        [action.payload.cardId]: {
          id: action.payload.cardId,
          todos: state[action.payload.cardId].todos.filter(
            (item) => item.id !== action.payload.id
          ),
        },
      };
    case UPDATE_TODO:
      return {
        ...state,
        [action.payload.cardId]: {
          id: action.payload.cardId,
          todos: state[action.payload.cardId].todos.map((item) => {
            if (item.id === action.payload.id)
              return { id: item.id, thing: action.payload.todo };
            return item;
          }),
        },
      };
    default:
      return state;
  }
};

export default todoReducer;
