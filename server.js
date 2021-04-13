require('dotenv/config');
const express = require('express');
const cors = require('cors');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const app = express();
const PORT = process.env.PORT || 8900;
const MONGO_URI = process.env.MONGO_URI;
let db;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	console.log('API is Working');
	res.send('Working');
});

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

app.post('/post', (req, res) => {
	// console.log(req.body);
	var { firstName } = req.body;
	var { lastName } = req.body;
	db.collection('fake_project').insertOne(req.body);
	console.log(`First Name ${firstName} and Last Name ${lastName}`);
	res.send({ message: randomNumber(70, 100) });
});

MongoClient.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
	if (err) throw err;
	db = client.db('test');

	app.listen(PORT, (err) => {
		if (err) throw err;
		console.log(`Server is listening on port ${PORT}`);
	});
});
