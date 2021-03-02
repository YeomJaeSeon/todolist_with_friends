# 친구들과 함께하는 투두리스트
- 계획을 세워서 오늘할 일정을 체크할수있는 할일 계획서 어플리케이션 입니다.
- DND이 가능해 계획한 일정들 중 오늘할 일정을 DND를 할수 있습니다.
- 로그인, 회원가입, 회원탈퇴, 별명 수정등 사용자 관리를 할수 있습니다.
- 공부를 시작하면 타이머를 킬수 있고 타이머 시간에 따라서 사용자들의 등수를 보여줄수 있습니다.
- 반응형을 통해 모바일 지원이 가능합니다.

## URL
https://jaeseonsite.netlify.app/

## stacks
- React(CRA)
- Typescript
- Firebase

## libraries
- react-router-dom
- redux
- styled-components
- react-datepicker
- react-beautiful-dnd

## UI

### 로그인 화면
![스크린샷(1037)](https://user-images.githubusercontent.com/67785334/109589527-cc95ce00-7b4d-11eb-891f-9e3a95e24d34.png)

#### 모바일 버전
![스크린샷(1038)](https://user-images.githubusercontent.com/67785334/109589855-59d92280-7b4e-11eb-917c-ea138289a778.png)

### 회원가입 화면
![스크린샷(1039)](https://user-images.githubusercontent.com/67785334/109589948-7bd2a500-7b4e-11eb-8d58-b31f8edd39d5.png)

### 메인 화면
![스크린샷(1040)](https://user-images.githubusercontent.com/67785334/109589993-8f7e0b80-7b4e-11eb-9141-5fb07421af4c.png)

#### 모바일 버전
![스크린샷(1041)](https://user-images.githubusercontent.com/67785334/109590082-b3d9e800-7b4e-11eb-8354-d0304cb9a481.png)

## 기능
1. 로그인 기능
- 로그인을 할수 있고 로그인을 하면 바로 메인 페이지로 이동합니다.
- 로그아웃이나 회원 탈퇴를 하지않은 상태에서 창을닫고 다시 페이지를 열면 바로 메인페이지로 이동합니다.

2. 로그아웃 기능
- 로그아웃을 할수 있고 로그아웃을 하면 바로 로그인 페이지로 이동하게 됩니다.
- 로그인을 하지 않은 상태에서 메인페이지로 접근시 다시 로그인페이지로 이동하게 됩니다.

3. 별명 수정 기능
- 로그인을 한 상태에서 (메인페이지에 위치하게 됨) 별명을 수정하면 실시간으로 수정된 내용이 반영됩니다.

4. 회원 탈퇴 기능
- 로그인을 한 상태에서 (메인페이지에 위치하게 됨) 회원 탈퇴를 하면 영구적으로 회원삭제가 되고 로그인 페이지로 이동하게 됩니다.

5. 할일 CRUD
- 하루에 할일을 적을수 있는 카드를 여러개 생성할수 있습니다.
- 할일에 대해선 CRUD가 가능합니다.

6. 카드 DND
- 계획한 카드를 오늘 실행하기 위해서 해당 카드를 오늘 할일 부분으로 드래그하고 드랍 할수 있습니다.

7. 타이머 기능
- 타이머를 통해 공부한 시간을 측정할수 있습니다.
- 실시간으로 파이어베이스에 반영이되서 사용자들이 모두 타이머 시간을 확인할수 있습니다.

8. 랭킹 기능
- 타이머로 측정한 시간을 기준으로 사용자들끼리 등수를 정할수 있습니다.

