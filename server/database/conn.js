import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

async function connect() {
  const mongod = await MongoMemoryServer.create();
  const uriMongo = mongod.getUri();

  mongoose.set('strictQuery', true);
  const db = await mongoose.connect(uriMongo);
  console.log('Database connected!!!');
  return db;
}

export default connect;
