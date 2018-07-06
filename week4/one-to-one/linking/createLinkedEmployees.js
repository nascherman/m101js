const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ResumeFactory = require('./resumeModel');
const EmployeeFactory = require('./employeeModel');

const DB_URL = 'mongodb://localhost:27017';
const DB = 'employee-db';

MongoClient.connect(DB_URL, (err, client) => {
    assert.equal(null, err);

    const db = client.db(DB);

    const resumeEntries = new ResumeFactory().createResumes(1000);

    db.collection('resumes-linked').insertMany(resumeEntries, (err, result) => {
        assert.equal(null, err);

        db.collection('resumes-linked').find({}).toArray((err, resumes) => {
            const empFactory = new EmployeeFactory();
            const resumeIds = resumes.map(resume => {
               return resume._id;
            });

            const emps = empFactory.createEmployees(resumeIds);

            db.collection('employees-linked').insertMany(emps, (err, result) => {
               assert.equal(null, err);

               console.log('Inserted linked employees');

                client.close();
            });
        });
    })
});