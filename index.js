const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

// middle ware
app.use(cors());
app.use(express.json());

// assignment11
// 6WAg58tIHTcSSOMl

// mongodb url


const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Password}@cluster0.vtstx9a.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
  const productCollections = client.db("User_main").collection("ProductsDetails");
  // perform actions on the collection object
  console.log('mongodb connected');
  client.close();
});




// Api test
app.get('/', (req,res) => {
    res.send('yay api working')
})

// api port
app.listen(port,()=>{
    console.log(`api working on port ${port}`);
})