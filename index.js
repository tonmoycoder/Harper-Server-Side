const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

// middle ware
app.use(cors());
app.use(express.json());

// assignment11
// 6WAg58tIHTcSSOMl

// mongodb url

const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Password}@cluster0.vtstx9a.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const productCollections = client.db('User_main').collection('ProductsDetails');
    const commentCollection = client.db('User_main').collection('userComment');
    // get all products api
    app.get('/products', async (req, res) => {
      const query = {};
      const sort = { time: -1 };
      const curser = productCollections.find(query).sort(sort);
      const result = await curser.toArray();
      res.send(result);
    });
    // limited product get api
    app.get('/products/limit', async (req, res) => {
      const query = {};
      const limit = 3;
      const sort = { time: -1 };
      const courser = productCollections.find(query).sort(sort).limit(limit);
      const result = await courser.toArray();
      res.send(result);
    });
    // get single product api
    app.get('/products/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const user = await productCollections.findOne(query);
      res.send(user);
    });

    // get user comments by product id
    app.get('/comment/:id', async (req, res) => {
      const productID = req.params.id;
      const query = { productID: productID };
      const sort = { time: -1 };
      const curser = commentCollection.find(query).sort(sort);
      const result = await curser.toArray();
      res.send(result);
    });

    // post api start

    //post product user review
    app.post('/comment', async (req, res) => {
      const commentData = await req.body;
      const result = await productCollections.insertOne(commentData);
      res.send(result);
    });

    // post user individual comment api
    app.post('/comments', async (req, res) => {
      const productData = await req.body;
      const result = await commentCollection.insertOne(productData);
      res.send(result);
    });

    // post products or service
    app.post('/products', async (req, res) => {
      const productData = await req.body;
      const result = await productCollections.insertOne(productData);
      res.send(result);
    });
  } finally {
  }
}

run().catch((error) => {
  console.log(error);
});

// Api test
app.get('/', (req, res) => {
  res.send('yay api working');
});

// api port
app.listen(port, () => {
  console.log(`api working on port ${port}`);
});
