require('dotenv').config();
const mongoose = require('mongoose');

const CONNECTION_STRING = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?ssl=true&replicaSet=globaldb`;
const COLLECTION_NAME = 'mycollection';

(async function main() {
  console.log('Started...');

  // Create connection
  await mongoose.connect(
    CONNECTION_STRING,
    {
      auth: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      },
      useFindAndModify: false,
      useNewUrlParser: true,     
    },
  );

  console.log('Connected to Cosmos DB with Mongo API')

  // Create schema and model
  const schema = new mongoose.Schema(
    {
      mykey: { type: Number }, // SHARD KEY
      value: { type: String },
    },
    { 
      strict: false, 
      timestamps: true, 
      collection: COLLECTION_NAME
    },
  );
  const model = mongoose.model(COLLECTION_NAME, schema);

  // Load data (will throw error on first insert)
  for (let i = 0; i < 5; i++) {
    console.log(`Load ${i}`);
    await model.create(
      {
        mykey: i, // SHARD KEY
        value: `value ${i}`,
      }, 
      { upsert: true }
    );
  }

  console.log('Done');
})()
    .catch(err => console.log(err));