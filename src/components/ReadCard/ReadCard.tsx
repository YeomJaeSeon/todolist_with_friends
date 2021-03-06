import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import * as S from './ReadCard.style';
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

  const onToggleHandler = (id: number, checked: boolean) => () => {
    dispatch(toggleTodoAction(currentId, id, !checked));
    databaseService.toggleTodo(uid, currentId, id, !checked);
  };

  const deleteCardHandelr = () => {
    dispatch(deleteCardAction(currentId));
    databaseService.removeCard(uid, currentId);
  };
  return (
    <Draggable key={currentId} draggableId={currentId} index={0}>
      {(provided, snapshot) => (
        <S.ReadCardContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          isDragging={snapshot.isDragging}
        >
          <S.ReadCardHeader>
            <S.ReadCardTitle>{today} 할일 목록</S.ReadCardTitle>
            <S.CardDeleteBtn onClick={deleteCardHandelr}>
              <S.TrashIcon />
            </S.CardDeleteBtn>
            <S.DragElement {...provided.dragHandleProps}>
              <S.DragIcon />
            </S.DragElement>
          </S.ReadCardHeader>
          <S.ReadCardListContainer>
            {todos.map((todo) => (
              <S.ReadCardList done={todo.checked} key={todo.id}>
                <S.TodoContent>{todo.thing}</S.TodoContent>
                <S.ToggleBtn onClick={onToggleHandler(todo.id, todo.checked)}>
                  {todo.checked ? 'uncheck' : 'check'}
                </S.ToggleBtn>
              </S.ReadCardList>
            ))}
          </S.ReadCardListContainer>
        </S.ReadCardContainer>
      )}
    </Draggable>
  );
};

export default ReadCard;
