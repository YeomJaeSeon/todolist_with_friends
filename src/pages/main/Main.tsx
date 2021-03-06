import React, { useEffect, useState, useRef } from 'react';
import { AuthServiceType } from '../../services/auth_service';
import { DatabaseType } from '../../services/data_service';
import { useHistory, useLocation } from 'react-router-dom';
import * as S from './Main.style';
import List from 'src/components/List/List';
import StartPlan, { RefType } from 'src/components/StartPlan/StartPlan';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { RootType } from '../../modules/index';
import {
  initCardAction,
  sameChangeCardAction,
  diffChangeCardAction,
} from 'src/modules/todos';
import Modal from 'src/components/Modal/Modal';
import Header from 'src/components/Header/Header';
import { CookieSetOptions } from 'universal-cookie';

type LocationState = {
  id: string | null;
};

type PropType = {
  authService: AuthServiceType;
  databaseService: DatabaseType;
  cookies: {
    [name: string]: any;
  };
  setCookie: (
    name: string,
    value: any,
    options?: CookieSetOptions | undefined
  ) => void;
  removeCookie: (name: string, options?: CookieSetOptions | undefined) => void;
};

const Main = ({
  authService,
  databaseService,
  cookies,
  setCookie,
  removeCookie,
}: PropType) => {
  const [pending, setPending] = useState(true);
  const [currentUser, setCurrentUser] = useState('');
  const [modalDisplay, setModalDisplay] = useState(false);
  const cards = useSelector((state: RootType) => state.todoReducer);
  const dispatch = useDispatch();
  const location = useLocation<LocationState>();
  const uid = location.state ? location.state.id : null;
  const moveRef = useRef<RefType>(null);

  const history = useHistory();

  useEffect(() => {
    !cookies.login && authService.logout();
    const unscribe = authService.onAuthStatus((user) => {
      if (!user) {
        history.push('/');
      }
    });

    databaseService.dataSync(uid, (value: any) => {
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

    return () => {
      unscribe();
    };
  }, [databaseService, authService, dispatch, uid, history]);

  useEffect(() => {
    const datasRef = databaseService.getLoginUserData(uid, (character) => {
      setCurrentUser(character);
    });

    return () => datasRef();
  }, [databaseService, uid]);

  const notAuthorize = () => {
    setPending(true);
  };

  const logoutHandler = () => {
    removeCookie('login');
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
          if (result.destination?.droppableId === 'card') {
            const newCards = cards.map((card) => {
              if (card.id === result.draggableId) {
                return { ...card, current: true };
              } else {
                if (card.current === true) {
                  return { ...card, current: false };
                }
                return card;
              }
            });
            dispatch(diffChangeCardAction(newCards));
            databaseService.changeToStart(
              uid,
              result.draggableId,
              true,
              prevCard && prevCard.id
            );
          } else {
            const originIndex = cards.findIndex(
              (card) => card.id === result.draggableId
            );
            const newCards = cards.map((card) => {
              if (card.id === result.draggableId) {
                return { ...card, current: false };
              }
              return card;
            });

            const [reorderedItem] = newCards.splice(originIndex, 1);
            if (destination.index > originIndex)
              newCards.splice(destination.index - 1, 0, reorderedItem);
            else newCards.splice(destination.index, 0, reorderedItem);

            dispatch(diffChangeCardAction(newCards));
            databaseService.changeToStart(
              uid,
              result.draggableId,
              false,
              prevCard && prevCard.id
            );
          }
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

  const goToSection = (id: string) => {
    if (id === 'timer') {
      moveRef.current?.timer();
    } else {
      console.log('clicked');
      moveRef.current?.ranking();
    }
  };

  return (
    <S.Main>
      <Header
        logout={logoutHandler}
        currentUser={currentUser}
        openModal={openModal}
        goToSection={goToSection}
      />
      {pending ? (
        <S.PendingBackground>
          <S.LoadingSpinner></S.LoadingSpinner>
        </S.PendingBackground>
      ) : (
        <S.MainContainer>
          <DragDropContext onDragEnd={cardChangeHandler}>
            <List cards={cards} uid={uid} databaseService={databaseService} />
            <StartPlan
              uid={uid}
              databaseService={databaseService}
              modalDisplay={modalDisplay}
              ref={moveRef}
            />
          </DragDropContext>
        </S.MainContainer>
      )}
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
          removeCookie={removeCookie}
        >
          {currentUser}님의 사용자 관리
        </Modal>
      )}
    </S.Main>
  );
};

export default Main;
