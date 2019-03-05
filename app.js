const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const firebase = require('firebase');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let appUsersArray = [];
let editUser;

app.set('views', path.join(__dirname, 'views'));
app.set ('view engine', 'pug');

app.get('/',(req,res) => {
    res.render('index');
});

app.post('/', (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let email = req.body.email;
    let age = req.body.age;

    let user = {
        userId: id,
        name: name,
        email: email,
        age: age
    };

    appUsersArray.push(user);

    res.redirect('/userList');
});

app.get('/userList', (req,res) => {
    res.render('./userList.pug', {userArray: appUsersArray});
});

app.get('/edit/:userId', (req,res) => {

    appUsersArray.forEach((user) => {
        if(user.userId === req.params.userId) {
            editUser = user;
        }
    });

    res.render('./edit.pug', {userId: req.params.userId, user: editUser});
});

app.post('/edit/:userId', (req,res) => {
    editUser.userId = req.body.id;
    editUser.name = req.body.name;
    editUser.email = req.body.email;
    editUser.age = req.body.age;

    appUsersArray.forEach((user, index) => {
        if(user.userId === req.body.userId) {
            appUsersArray[index] = editUser;
        }
    });

    res.redirect('/userList');
});

app.get('/delete/:userId', (req, res) => {

    appUsersArray.forEach((user, index) => {
        if(user.userId === req.params.userId) {
            appUsersArray.splice(index, 1);
        }
    });

    res.redirect('/userList');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
