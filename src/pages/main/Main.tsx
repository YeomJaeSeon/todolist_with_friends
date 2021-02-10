import React, { useEffect, useState } from 'react';
import { AuthServiceType } from '../../services/auth_service';
import { useHistory, useLocation } from 'react-router-dom';
import { MainContainer } from './Main.style';
import List from 'src/components/List/List';
import StartPlan from 'src/components/StartPlan/StartPlan';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { sameChangeCardAction } from 'src/modules/todos';

type PropType = {
  authService: AuthServiceType;
};

const Main = ({ authService }: PropType) => {
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
