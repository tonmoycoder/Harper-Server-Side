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
