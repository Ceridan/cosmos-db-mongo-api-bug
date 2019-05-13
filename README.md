# Cosmos DB with Mongo API. Bug on insert (upsert).

Here I reproduce a bug with Cosmos DB (Mongo API). I catch an error with the following text: `MongoError: document does not contain shard key`, but my insert operation actually has shard key.

## **Important!** Bug reproduced with mongoose ODM

To reproduce the bug I have used [mongoose](https://mongoosejs.com/) a popular object data modeling tool atop of basic Mongo driver.
With original Mongo driver as explained in the Cosmos DB quickstart page all works fine.

## Steps to reproduce the bug

1. Create a database via Azure Portal (I checked in provisioning throuput on the database level).
2. Create a collection and as a `Shard Key` I choose `mykey` field name.
3. Checkout code in the example
4. Create a `.env` file for environments (see example `.env.sample`)
5. Run follwoing commands to install and run the code to reproduce an error:
```
npm install
npm run start
```
