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
import {
  initCardAction,
  sameChangeCardAction,
  diffChangeCardAction,
} from 'src/modules/todos';

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

  const history = useHistory();

  useEffect(() => {
    console.log('mounted');
    const stopSync = databaseService.dataSync(
      location.state.id,
      (value: any) => {
        console.log(value);
        if (!value) dispatch(initCardAction([]));
        else {
          const initState = Object.keys(value).map((key: string) => ({
            id: key,
            current: value[key].current,
            today: value[key].today,
            todos: value[key].todos
              ? Object.keys(value[key].todos).map((todoKey) => ({
                  id: value[key].todos[todoKey].id,
                  thing: value[key].todos[todoKey].thing,
                  checked: value[key].todos[todoKey].checked,
                }))
              : [],
          }));
          dispatch(initCardAction(initState));
        }
      }
    );

    authService.onAuthStatus((user) => {
      if (!user) {
        history.push('/');
      }
    });
    return () => stopSync();
  }, [databaseService]);

  const logoutHandler = () => {
    authService.logout();
  };

  const cardChangeHandler = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const newCards = [...cards];
      const [reorderedItem] = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, reorderedItem);

      dispatch(sameChangeCardAction(newCards));
    } else {
      const selectedCard = cards.find((card) => card.id === result.draggableId);
      const prevCard = cards.find((card) => card.current);

      if (selectedCard) {
        if (
          selectedCard?.todos.length === 0 &&
          destination.droppableId === 'card'
        )
          alert('할일을 먼저 입력해주세요!');
        else {
          dispatch(
            diffChangeCardAction(
              result.draggableId,
              source.index,
              destination.index
            )
          );
          databaseService.changeToStart(
            location.state.id,
            result.draggableId,
            !selectedCard.current,
            prevCard && prevCard.id
          );
        }
      }
    }
  };

  return (
    <MainContainer>
      <DragDropContext onDragEnd={cardChangeHandler}>
        <List
          cards={cards}
          uid={location.state.id}
          databaseService={databaseService}
        />
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
