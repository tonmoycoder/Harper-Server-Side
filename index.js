const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();

// middle ware
app.use(cors());
app.use(express.json());

// Api test
app.get('/', (req,res) => {
    res.send('yay api working')
})

// api port
app.listen(port,()=>{
    console.log(`api working on port ${port}`);
})