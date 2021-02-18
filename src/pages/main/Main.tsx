import React, { useEffect } from 'react';
import { AuthServiceType } from '../../services/auth_service';
import { DatabaseType } from '../../services/data_service';
import { useHistory, useLocation } from 'react-router-dom';
import { MainContainer } from './Main.style';
import List from 'src/components/List/List';
import StartPlan from 'src/components/StartPlan/StartPlan';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { RootType } from '../../modules/index';
import { sameChangeCardAction, diffChangeCardAction } from 'src/modules/todos';

type LocationState = {
  id: string;
};

type PropType = {
  authService: AuthServiceType;
  databaseService: DatabaseType;
};

const Main = ({ authService, databaseService }: PropType) => {
  const cards = useSelector((state: RootType) => state.todoReducer);

  const dispatch = useDispatch();
  const location = useLocation<LocationState>();

  // const uid = location.state.id;
  // console.log(uid);
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
    const { source, destination, draggableId } = result;
    // console.log(`드래그한 id : ${draggableId}`);
    // destination &&
    //   console.log(`놓은 곳의 card id :${cards[destination?.index].id}`);

    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const newCards = [...cards];
      const [reorderedItem] = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, reorderedItem);

      dispatch(sameChangeCardAction(newCards));
      databaseService.changeCardSameId(location.state.id, newCards);
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
        <List uid={location.state.id} databaseService={databaseService} />
        <StartPlan
          logout={logoutHandler}
          uid={location.state.id}
          databaseService={databaseService}
        />
      </DragDropContext>
    </MainContainer>
  );
};

export default Main;
