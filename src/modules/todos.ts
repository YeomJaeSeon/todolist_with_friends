const INIT_CARD = 'todo/INIT_CARD' as const;
const ADD_CARD = 'todo/ADD_CARD' as const;
const DELETE_CARD = 'todo/DELETE_CARD' as const;
const SAME_CHANGE_CARD = 'todo/SAME_CHANGE_CARD' as const;
const DIFF_CHANGE_CARD = 'todo/DIFF_CHANGE_CARD' as const;
const ADD_TODO = 'todo/ADD_TODO' as const;
const DELETE_TODO = 'todo/DELETE_TODO' as const;
const UPDATE_TODO = 'todo/UPDATE_TODO' as const;
const TOGGLE_TODO = 'todo/TOGGLE_TODO' as const;
const UPDATE_DATE = 'todo/UPDATE_DATE' as const;

// 카드 초반상태
export const initCardAction = (state: StateType) => {
  return {
    type: INIT_CARD,
    payload: { initState: state },
  };
};

// 카드 추가 액션생성
export const addCardAction = (id: string, today: string) => {
  return {
    type: ADD_CARD,
    payload: { id: id, today: today },
  };
};

// 카드 삭제 액션생성
export const deleteCardAction = (id: string) => {
  return {
    type: DELETE_CARD,
    payload: { id: id },
  };
};
// 같은 section 카드 드래깅할때 상태 변경
export const changeSameCardAction = (newCards: StateType) => {
  return {
    type: SAME_CHANGE_CARD,
    payload: {
      newCards: newCards,
    },
  };
};
// 다른 section으로 카드 드래깅할때 상태변경(좌 -> 우, 우 -> 좌)
export const changeDiffCardAction = (newCards: StateType) => {
  return {
    type: DIFF_CHANGE_CARD,
    payload: {
      newCards: newCards,
    },
  };
};

// todo 추가 액션생성
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

//todo 삭제액션생성
export const deleteTodoAction = (cardId: string, id: number) => {
  return {
    type: DELETE_TODO,
    payload: {
      cardId: cardId,
      id: id,
    },
  };
};

// 할일 edit 업데이트 액션생성
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

// 할일 check uncheck 상태 변경 액션생성함수
export const toggleTodoAction = (
  cardId: string,
  id: number,
  checked: boolean
) => {
  return {
    type: TOGGLE_TODO,
    payload: {
      cardId: cardId,
      id: id,
      checked: checked,
    },
  };
};

// 날짜 변경
export const updateDateAction = (cardId: string, today: string) => {
  return {
    type: UPDATE_DATE,
    payload: {
      cardId: cardId,
      today: today,
    },
  };
};

type ActionType =
  | ReturnType<typeof initCardAction>
  | ReturnType<typeof addCardAction>
  | ReturnType<typeof deleteCardAction>
  | ReturnType<typeof addTodoAction>
  | ReturnType<typeof deleteTodoAction>
  | ReturnType<typeof updateTodoAction>
  | ReturnType<typeof toggleTodoAction>
  | ReturnType<typeof changeSameCardAction>
  | ReturnType<typeof changeDiffCardAction>
  | ReturnType<typeof updateDateAction>;

export type StateType = {
  id: string;
  current: boolean;
  today: string;
  todos: TodoType;
}[];

type TodoType = {
  id: number;
  thing: string;
  checked: boolean;
}[];

const initialState: StateType = [];

const todoReducer = (state: StateType = initialState, action: ActionType) => {
  switch (action.type) {
    case INIT_CARD:
      return action.payload.initState;
    case ADD_CARD:
      return [
        ...state,
        {
          id: action.payload.id,
          current: false,
          today: action.payload.today,
          todos: [],
        },
      ];
    case DELETE_CARD:
      return state.filter((card) => card.id !== action.payload.id);

    case SAME_CHANGE_CARD:
      return action.payload.newCards;

    case DIFF_CHANGE_CARD:
      return action.payload.newCards;

    case ADD_TODO:
      return state.map((card) => {
        if (card.id === action.payload.cardId) {
          return {
            ...card,
            todos: [
              ...card.todos,
              {
                id: action.payload.id,
                thing: action.payload.thing,
                checked: false,
              },
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
    case TOGGLE_TODO:
      return state.map((card) => {
        if (card.id === action.payload.cardId) {
          return {
            ...card,
            todos: card.todos.map((todo) => {
              if (todo.id === action.payload.id) {
                return { ...todo, checked: action.payload.checked };
              }
              return todo;
            }),
          };
        }
        return card;
      });
    case UPDATE_DATE:
      return state.map((card) => {
        if (card.id === action.payload.cardId) {
          return { ...card, today: action.payload.today };
        }
        return card;
      });
    default:
      return state;
  }
};

export default todoReducer;
