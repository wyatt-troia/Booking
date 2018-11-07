const express = require('express')
const bodyParser = require('body-parser')
const database = require('../database/index.js')
const path = require('path')
const port = 4000;
const morgan = require('morgan');
const cors = require('cors')

var app = express();

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname + '/../client/dist')));

app.get('/bookinglisting', (req, res)=>{ 
	id = req.query.id;
	database.getListing(id)
		.then((dataObj)=>{ res.status(200).send(dataObj)})
		.catch((err)=>{res.send(err)})
})

app.post('/bookinglisting', (req, res)=>{ 
	database.createListing(req.body)
		.then((dataObj)=>{ console.log('success'); console.log(dataObj); res.status(200).send(dataObj)})
		.catch((err)=>{ console.log('failure'); res.send(err)})
})

app.put('/bookinglisting', (req, res)=>{ 
	database.updateListing(1, req.body)
		.then((dataObj)=>{ console.log('success'); console.log(dataObj); res.status(200).send(dataObj)})
		.catch((err)=>{ console.log('failure'); res.send(err)})
})

// app.use('/bundle.js', express.static(path.join(__dirname + '/../client/dist')));

app.get('/*', (req, res)=>{
	res.sendFile(path.join(__dirname + '/../client/dist/index.html'))
})

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})

// app.listen(process.env.PORT)
