const express = require('express');
const port = 8000;
const app = express();
const db = require('./config/mongoose');
const MongoStore = require('connect-mongo');
const session = require('express-session');

app.use(express.urlencoded());

app.use(
    session({
        name: 'polling-Api',
        secret: 'Secret-Key',
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 100,
        },
        store: MongoStore.create(
            {
                mongoUrl: 'mongodb://localhost/polling',
                mongooseConnection: db,
                autoRemove: false,
            },
            function (err) {
                if (err) {
                    console.log('Error in connect-mongodb setup:', err);
                } else {
                    console.log('connect-mongodb setup ok');
                }
            }
        ),
    })
);

// use express router
app.use('/', require('./routes'));

// port listening on port
app.listen(port, function (err) {
    if (err) {
        console.log(`Error in connecting to the database: ${err}`);
        return;
    }
    console.log(`Server is running at port ${port}`);
});
