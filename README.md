# React 프로젝트 환경 설정

### 설치
1. `Node.js`설치 https://nodejs.org/en/
2. 터미널에서 프로젝트 디렉토리 이동
3. `npm install` 혹은 yarn 사용시 `yarn` 실행 (이후 package.json에 의존 모듈 추가시마다 실행)

### 개발 build 및 개발 서버 실행
1. 터미널에서 프로젝트 디렉토리 이동.
2. `npm start` 혹은 `yarn start` 실행

make `src/database/databse.ts`

```
import * as firebase from 'firebase';

const config = {
  apiKey: 'your api key',
  projectId: 'ss2s2-75a50',
  authDomain: 'ss2s2-75a50.firebaseapp.com',
  databaseURL: 'https://ss2s2-75a50.firebaseio.com/',
  storageBucket: 'gs://ss2s2-75a50.appspot.com',
  messagingSenderId: 'your messaging sender Id'
};

firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth;
export const storage = firebase.storage();
```