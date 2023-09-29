const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userModel = require('./models/DataModel');
const bodyParser = require("body-parser");

//middlewares
app.use(express.json());
app.use(bodyParser.json({ limit: "20mb", }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true, }));

// routes
app.get('/', (req, res) => {

    res.send('Hello word!');

});

app.get('/users', async (req, res) => {

    try {

        const data = await userModel.find({});

        res.send({ data });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }

});

app.post('/users', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const data = await userModel.create(req.body);
        res.send({ data });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
})

app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, ...remainFields } = req.body

        const data = await userModel.findByIdAndUpdate(id, remainFields, { new: true });

        res.send({
            msg: `Se ha actualizado el registro`,
            data
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await userModel.findByIdAndDelete(id);

        if (!data) {
            return res.status(404).json({ message: `Cant find any data with that id. ID: ${id}` });
        }

        res.send({
            msg: `Se ha eliminado el registro`,
            data
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
})

const DB_URI = 'mongodb://127.0.0.1:27017/crud-example'
mongoose.set('strictQuery', false)

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(3000, () => {
        console.log(`Node API app is running on port 3000`);
    });
    console.log('**** MONGO DB: CONEXION CORRECTA ****');
}).catch((error) => {
    console.log(error);
})

