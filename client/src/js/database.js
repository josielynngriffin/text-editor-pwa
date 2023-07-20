import { openDB } from 'idb';

//Create DB
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    console.log('Put data to database');
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.put({ id: 1, value: content});
    const result = await request;
    console.log(result);
    console.log('Data saved to the database', result);

  } catch (error) {
    console.log('Error saving data to database', error);
  }

};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Get all content from database');
  //Create connection to the database and version
  const jateDb = await openDB('jate', 1);
  //Create new transaction and specify the database and privileges
  const tx = jateDb.transaction('jate', 'readonly');
  //Open to desired object store
  const store = tx.objectStore('jate');
  //Use .getAll() to get all the data in the database
  const request = store.get(1);
  
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

initdb();
