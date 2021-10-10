const express = require('express');
const application = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
application.use(express.json());
require('dotenv').config();

mongoose.connect(process.env.DATABASE_PASSWORD)
    .then(console.log('Connected to database'));

const db = mongoose.connection;

const port = process.env.PORT || 8080;

application.post('/register', (request, response) => {
    const username = request.body.username;
    const password = request.body.password;
    const hashPassword = bcrypt.hashSync(password, 10);
    const favorites = [];
    db.collection('data').insertOne({
        username: username,
        password: hashPassword,
        favorites: favorites,
    });
    response.send('Registering done');
});

application.post('/login', async (request, response) => {
    const username = request.body.username;
    const password = request.body.password;
    const findUser = await db.collection('data').findOne({
        username: username,
    });
    let logInSuccessful;
    if (findUser) {
        logInSuccessful = bcrypt.compareSync(password, findUser.password);
    }
    if (findUser === null) {
        response.send({ message: 'Username not found', loggedIn: false });
    }
    
    else if (logInSuccessful) {
        response.send({ message: 'Welcome, ' + username + "!", user: username, favorites: findUser.favorites, loggedIn: true });
    } else {
        response.send({ message: 'Login unsuccessful', loggedIn: false });
    }
});

application.post('/addFavorite', (request, response) => {
    const userNow = request.body.username;
    const favoritesHere = request.body.favoritesCopy;
    db.collection('data').updateOne(
        { username: userNow },
        { $set: { favorites: favoritesHere }},
    );
    response.send('Favorites updated');
});

application.post('/deleteFavorite', (request, response) => {
    const userNow = request.body.username;
    const favoritesHere = request.body.theData;
    db.collection('data').updateOne(
        { username: userNow },
        { $set: { favorites: favoritesHere }},
    );
    response.send('Favorites updated');
});

application.use(express.static('frontend/build'));
application.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});

application.listen(port, () => {
    console.log('Application listening');
});
