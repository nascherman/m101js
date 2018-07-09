const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { PersonFactory, CityFactory } = require('./models');

const DB_URL = 'mongodb://localhost:27017';
const DB = 'city-db';

MongoClient.connect(DB_URL, (err, client) => {
   assert.equal(null, err);

   const db = client.db(DB);

   db.collection('cities').insertMany(new CityFactory().createCities(), (err, result) => {
      assert.equal(null, err);
      console.log('Completed insert of cities');

      const personCollection = new PersonFactory().createPersonsFromCities(result.ops, 100);

      db.collection('persons').insertMany(personCollection, (err, result) => {
         assert.equal(null, err);

         console.log('Inserted linked persons');

         client.close();
      });
   });

});