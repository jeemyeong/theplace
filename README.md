# Set up ENV for React project

### How to install
1. Install `Node.js` from https://nodejs.org/en/
2. `npm install` Or `yarn`

### How to run
1. `npm start` Or `yarn start`

make `src/database/databse.ts`

```
import * as firebase from 'firebase';

const config = {
  apiKey: 'your api key',
  projectId: 'theplace-5dfe6',
  authDomain: 'theplace-5dfe6.firebaseapp.com',
  databaseURL: 'https://theplace-5dfe6.firebaseio.com/',
  storageBucket: 'gs://theplace-5dfe6.appspot.com/',
  messagingSenderId: 'your messaging sender Id'
};

firebase.initializeApp(config);

export default firebase;
export const database = firebase.database();
export const databaseRef = database.ref();
export const auth = firebase.auth();
export const storage = firebase.storage;
```