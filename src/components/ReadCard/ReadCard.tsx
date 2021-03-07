import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  ReadCardContainer,
  ReadCardHeader,
  ReadCardTitle,
  ReadCardListContainer,
  TodoContent,
  ToggleBtn,
  ReadCardList,
  DragElement,
  DragIcon,
  CardDeleteBtn,
  TrashIcon,
} from './ReadCard.style';
import { useDispatch } from 'react-redux';
import { toggleTodoAction, deleteCardAction } from '../../modules/todos';
import { DatabaseType } from 'src/services/data_service';

type PropType = {
  currentId: string;
  today: string;
  todos: {
    id: number;
    thing: string;
    checked: boolean;
  }[];
  uid: string | null;
  databaseService: DatabaseType;
};

const ReadCard: React.FC<PropType> = ({
  currentId,
  today,
  todos,
  uid,
  databaseService,
}) => {
  const dispatch = useDispatch();

  // todo toggle되면 상태와 데이터베이스 변경
  const onToggleHandler = (id: number, checked: boolean) => () => {
    dispatch(toggleTodoAction(currentId, id, !checked));
    databaseService.toggleTodo(uid, currentId, id, !checked);
  };

  // current Card부분도 삭제기능이 존재, 상태와 데이터베이스 변경
  const deleteCardHandelr = () => {
    dispatch(deleteCardAction(currentId));
    databaseService.removeCard(uid, currentId);
  };
  return (
    <Draggable key={currentId} draggableId={currentId} index={0}>
      {(provided, snapshot) => (
        <ReadCardContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          isDragging={snapshot.isDragging}
        >
          <ReadCardHeader>
            <ReadCardTitle>{today} 할일 목록</ReadCardTitle>
            <CardDeleteBtn onClick={deleteCardHandelr}>
              <TrashIcon />
            </CardDeleteBtn>
            <DragElement {...provided.dragHandleProps}>
              <DragIcon />
            </DragElement>
          </ReadCardHeader>
          <ReadCardListContainer>
            {todos.map((todo) => (
              <ReadCardList done={todo.checked} key={todo.id}>
                <TodoContent>{todo.thing}</TodoContent>
                <ToggleBtn onClick={onToggleHandler(todo.id, todo.checked)}>
                  {todo.checked ? 'uncheck' : 'check'}
                </ToggleBtn>
              </ReadCardList>
            ))}
          </ReadCardListContainer>
        </ReadCardContainer>
      )}
    </Draggable>
  );
};

export default ReadCard;
