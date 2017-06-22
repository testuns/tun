const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

var db 

app.set('view engine', 'ejs')
app.use(express.static('public'))

MongoClient.connect('mongodb://127.0.0.1:27017', (err ,test) => {

	if(err) return console.log(err)
		db = test
		app.listen(3000, () => {
			console.log('listening on 3000');
		})
})

app.use(bodyParser.urlencoded({extended:true}))

app.post('/quotes', (req,res) => {
	db.collection('quotes').save(req.body, (err, result) => 
		{

		if (err) return console.log(err)

		console.log('save to database')
		res.redirect('/')	
		}
	)
})

app.get('/', (req, res) => {
	  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})
