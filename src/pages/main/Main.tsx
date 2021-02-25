import React, { useEffect, useState } from 'react';
import { AuthServiceType } from '../../services/auth_service';
import { DatabaseType } from '../../services/data_service';
import { useHistory, useLocation } from 'react-router-dom';
import * as S from './Main.style';
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
import Modal from 'src/components/Modal/Modal';

type LocationState = {
  id: string | null;
};

type PropType = {
  authService: AuthServiceType;
  databaseService: DatabaseType;
};

const Main = ({ authService, databaseService }: PropType) => {
  const [pending, setPending] = useState(true);
  const [currentUser, setCurrentUser] = useState('');
  const [modalDisplay, setModalDisplay] = useState(false);
  const cards = useSelector((state: RootType) => state.todoReducer);
  const dispatch = useDispatch();
  const location = useLocation<LocationState>();
  const uid = location.state ? location.state.id : null;

  const history = useHistory();

  useEffect(() => {
    authService.onAuthStatus((user) => {
      if (!user) {
        history.push('/');
      }
    });

    const stopSync = databaseService.dataSync(uid, (value: any) => {
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
      setPending(false);
    });

    return () => stopSync();
  }, [databaseService]);

  useEffect(() => {
    const datasRef = databaseService.getLoginUserData(uid, (character) => {
      setCurrentUser(character);
    });

    return () => datasRef();
  }, []);

  const notAuthorize = () => {
    setPending(true);
  };

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
            uid,
            result.draggableId,
            !selectedCard.current,
            prevCard && prevCard.id
          );
        }
      }
    }
  };
  const openModal = () => {
    setModalDisplay(true);
  };
  const closeModal = () => {
    setModalDisplay(false);
  };

  return (
    <S.MainContainer>
      <DragDropContext onDragEnd={cardChangeHandler}>
        {pending ? (
          <S.PendingBackground>
            <S.LoadingSpinner></S.LoadingSpinner>
          </S.PendingBackground>
        ) : (
          <>
            <List cards={cards} uid={uid} databaseService={databaseService} />
            <StartPlan
              uid={uid}
              databaseService={databaseService}
              modalDisplay={modalDisplay}
            />
            <S.UserInfoSection>
              <S.CurrentUserInfo>
                {currentUser && (
                  <S.UserInfoContainer>
                    <S.UserCharacterName>{currentUser}</S.UserCharacterName>님
                    접속 중
                  </S.UserInfoContainer>
                )}
                <S.LogoutBtn onClick={logoutHandler}>Logout</S.LogoutBtn>
              </S.CurrentUserInfo>
              <S.UserChangeInfo onClick={openModal}>
                사용자 관리
              </S.UserChangeInfo>
            </S.UserInfoSection>
          </>
        )}
      </DragDropContext>
      {modalDisplay && (
        <Modal
          visible={modalDisplay}
          closable={true}
          onClose={closeModal}
          className="modal"
          uid={uid}
          databaseService={databaseService}
          authService={authService}
          notAuthorize={notAuthorize}
        >
          {currentUser}님 사용자 관리
        </Modal>
      )}
    </S.MainContainer>
  );
};

export default Main;
