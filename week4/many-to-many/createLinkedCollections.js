const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { AuthorFactory, BookFactory } = require('./models');

const DB_URL = 'mongodb://localhost:27017';
const DB = 'books-db';

MongoClient.connect(DB_URL, (err, client) => {
    assert.equal(null, err);

    const db = client.db(DB);
    const booksCollection = new BookFactory().createBooks();

    db.collection('books').insertMany(booksCollection, (err, bookRes) => {
        assert.equal(null, err);
        console.log('Completed insert of books');

        const authorCollection = new AuthorFactory().createAuthors();
        const bookIds = bookRes.ops.map(op => {
            return op._id;
        });

        db.collection('authors').insertMany(authorCollection, (err, authorRes) => {
            assert.equal(null, err);
            console.log('Completed insert of authors');

            const authorIds = authorRes.ops.map(op => {
               return op._id;
            });

            bookIds.forEach((id, i) => {
               db.collection('books').updateOne({_id: id}, {
                   $set: {
                       authors: getRandomIds(authorIds)
                   }
               });

               if (i === bookIds.length - 1) {
                   db.collection('books').find({}).toArray((err, bookRes2) => {
                       bookRes2.forEach(book => {
                          book.authors.forEach(author => {
                              db.collection('authors').updateOne({_id: author}, {
                                  $addToSet: {
                                    books: book._id
                                  }
                              })
                          }) ;
                       });

                       client.close();
                   });
               }
            });
        });
    });
});

function getRandomIds(ids) {
   let randomIds = [];
   let numPick = Math.floor(Math.random() * ids.length - 1);

   for (let i = 0; i < numPick; i++) {
       randomIds.push(ids[Math.floor(Math.random() * ids.length - 1)])
   }

   return randomIds;
}