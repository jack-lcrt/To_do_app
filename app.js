
const express = require('express');
const mongoose = require('mongoose');
const Notes = require('./model/model');
const bodyParser = require('body-parser');

var app = express();

mongoose.connect('mongodb+srv://Test_user:123@firstcluster-zy7kt.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.set('views', './view');
app.set('view engine', 'ejs');
app.use(express.static('./public'));
// app.use(bodyparser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    Notes.find()
        .then(notes => res.render('home', { task: notes,error:"" }))
        .catch(error => res.status(400).json({ error }));

});

app.post('/', (req, res, next) => {
    const note = new Notes({
        title: req.body.title,
        color: req.body.color,
        description: req.body.description
    });
    note.save()
        .then(res.redirect('/'))
        .catch(next);
});

app.delete('/:id', (req, res, next) => {
    Notes.deleteOne({ _id: req.params.id })
        .then(() => res.status(200))
        .catch(error => res.status(400).json({ error }));
});

// error if post request failed

app.use((err,req,res) => {
    Notes.deleteOne({ _id: req.params.id })
        .then(Notes.find()
                    .then(notes => res.render('home', { task: notes, error:'Saisissez un titre'}))
                    .catch(error => res.status(400).json({ error }))
            );
    });


module.exports = app;