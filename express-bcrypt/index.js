// Package Imports
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcryptjs');

// Database Connection
const db = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, './db.db'),
    },
    useNullAsDefault: true,
});

// App Definition
const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes
app.post('/register', async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            res.status(400).json(`Missing ${!email ? "email" : 'password'}!`)
        }

        const hash = await bcrypt.hash(password, 10);
        await db('users').insert({email: email, hash: hash});
    
        res.status(200).json('All good!');
    } catch(e) {
        // console.log(e); // Uncomment if needed for debug
        // If a SQLITE_CONSTRAINT has been violated aka. row with that email already exists. You can read more: https://www.sqlite.org/c3ref/c_abort.html
        if(e.errno === 19) {
            res.status(400).json('A user with that email already exists!');
        } else {
            res.status(400).json('Something broke!');
        }
    }
});

app.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            res.status(400).json(`Missing ${!email ? "email" : 'password'}!`)
        }

        const user = await db('users').first('*').where({email: email});

        if(user) {
            const validPass = await bcrypt.compare(password, user.hash);
            if(validPass) {
                res.status(200).json('Valid Email and pass!');
            } else {
                res.status(400).json('Wrong password!');
            }
        } else {
            res.status(404).json('User not found!');
        }

    } catch(e) {
        // console.log(e); // Uncomment if needed for debug
        res.status(400).json('Something broke!');
    }
});

// Error handling
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
  
app.listen(3000, () => console.log(`Running for my life on 3000`));
  