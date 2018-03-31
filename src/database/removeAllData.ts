import { database } from './database';

const removeAllReviews = async () => {
  const databaseRef = database.ref();
  await databaseRef.remove();
  process.exit()
};

removeAllReviews();
