import React, {
  useEffect,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
} from 'react';
import { DatabaseType } from 'src/services/data_service';
import CurrentPlan from '../CurrentPlan/CurrentPlan';
import PlanTimer from '../PlanTimer/PlanTimer';
import Ranking from '../Ranking/Ranking';
import {
  StartPlanContainer,
  TimerTitle,
  RankingContainer,
  AllSection,
  ArrowBtn,
  ArrowIcon,
} from './StartPlan.style';

type PropType = {
  uid: string | null;
  databaseService: DatabaseType;
  modalDisplay: boolean;
};

export type UserStateType = {
  uid: string;
  time: number;
  userName: string;
}[];

export type RefType = {
  timer: () => void;
  ranking: () => void;
};

const StartPlan = forwardRef<RefType, PropType>(
  ({ uid, databaseService, modalDisplay }, ref) => {
    const [usersInfo, setUsersInfo] = useState<UserStateType>([]);
    const [topArrow, setTopArrow] = useState(0);
    const timerRef = useRef<HTMLDivElement>(null);
    const rankingRef = useRef<HTMLDivElement>(null);

    // timerRef와 rankingRef 커스텀하게 부모컴포넌트로 함수 전달.
    // 이 함수는 해당 ref로 스크롤이 가능하게하는 함수임
    useImperativeHandle(
      ref,
      () => ({
        timer: () => {
          timerRef.current?.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
          });
        },
        ranking: () => {
          rankingRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
          });
        },
      }),
      []
    );
    // 유저들정보를 받아오는데 ranking에 따라 소트되서 받아옴
    // data 동기화로 실시간반영됨.
    useEffect(() => {
      const datasSync = databaseService.getUserDatas((datas) => {
        if (datas) {
          const infos = Object.keys(datas)
            .map((key) => ({
              uid: key,
              time: +datas[key].time,
              userName: datas[key].userName,
            }))
            .sort((a, b) => {
              if (a.time > b.time) return -1;
              if (a.time < b.time) return 1;
              else return 0;
            });
          setUsersInfo(infos);
        } else {
          setUsersInfo([]);
        }
      });

      return () => datasSync();
    }, [databaseService]);

    // top arrow button 클릭시 top으로 스크롤되게 하기위해서(top arrow btn의 display를 위해)
    const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const scrollTop = e.currentTarget.scrollTop;
      setTopArrow(scrollTop);
    };

    // timer 업데이트시 데이터베이스 반영
    const increaseTime = () => {
      setUsersInfo((infos) => {
        return infos.map((info) => {
          if (info.uid === uid) {
            databaseService.updateTime(uid, info.time + 1);
            return { ...info, time: info.time + 1 };
          }
          return info;
        });
      });
    };

    // reset타임시 데이터베이스 반영
    const resetTime = () => {
      setUsersInfo((infos) => {
        return infos.map((info) => {
          if (info.uid === uid) {
            return { ...info, time: 0 };
          }
          return info;
        });
      });
      databaseService.updateTime(uid, 0);
    };

    // top으로 스크롤
    const goToTop = () => {
      timerRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    return (
      <StartPlanContainer onScroll={handleScroll}>
        <AllSection ref={timerRef}>
          <TimerTitle>Timer</TimerTitle>
          <PlanTimer
            uid={uid}
            userInfo={usersInfo}
            modalDisplay={modalDisplay}
            increaseTime={increaseTime}
            resetTime={resetTime}
          />
          <CurrentPlan uid={uid} databaseService={databaseService} />
        </AllSection>
        <RankingContainer ref={rankingRef}>
          <Ranking userInfo={usersInfo}></Ranking>
        </RankingContainer>
        <ArrowBtn
          opacityType={topArrow > 500 ? 'show' : undefined}
          isVisible={topArrow > 450 ? 'show' : undefined}
          onClick={goToTop}
        >
          <ArrowIcon />
        </ArrowBtn>
      </StartPlanContainer>
    );
  }
);

export default StartPlan;
