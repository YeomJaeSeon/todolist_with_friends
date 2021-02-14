import React, { useEffect } from 'react';
import { AuthServiceType } from '../../services/auth_service';
import { useHistory, useLocation } from 'react-router-dom';
import { MainContainer } from './Main.style';
import List from 'src/components/List/List';
import StartPlan from 'src/components/StartPlan/StartPlan';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { RootType } from '../../modules/index';
import { sameChangeCardAction, diffChangeCardAction } from 'src/modules/todos';

type PropType = {
  authService: AuthServiceType;
};

const Main = ({ authService }: PropType) => {
  const cards = useSelector((state: RootType) => state.todoReducer);

  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location.state);
  //  로그인한 사람의 uid를받음

  const history = useHistory();
  useEffect(() => {
    authService.onAuthStatus((user) => {
      if (!user) {
        history.push('/');
      }
    });
  }, []);
  const logoutHandler = () => {
    authService.logout();
  };

  const cardChangeHandler = (result: DropResult) => {
    console.log(result);
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      dispatch(sameChangeCardAction(source.index, destination.index));
    } else {
      const selectedCard = cards.find((card) => card.id === result.draggableId);
      if (selectedCard)
        selectedCard?.todos.length === 0 && destination.droppableId === 'card'
          ? alert('할일을 먼저 입력해주세요!')
          : dispatch(
              diffChangeCardAction(
                result.draggableId,
                source.index,
                destination.index
              )
            );
    }
  };

  return (
    <MainContainer>
      <DragDropContext onDragEnd={cardChangeHandler}>
        <List />
        <StartPlan logout={logoutHandler} />
      </DragDropContext>
    </MainContainer>
  );
};

export default Main;
