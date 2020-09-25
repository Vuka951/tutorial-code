const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const FileType = require('file-type');

const app = express()
const port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(fileUpload());

// DB
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./img.db"
    },
    useNullAsDefault: true
});

app.get('/', async (req, res) => {
    res.send('Hello vro!')
})

app.post('/upload', async (req, res) => {
    const {name, data} = req.files.pic;
    if (name && data) {
        await knex.insert({name: name, img: data}).into('img');
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
})

app.get('/img/:id', async (req, res) => {
    const id = req.params.id;
    const img = await knex('img').where({id: id}).first();
    if (img) {
        const contentType = await FileType.fromBuffer(img.img); // get the mimetype of the buffer (in this case its gonna be jpg but can be png or w/e)
        res.type(contentType.mime); // not always needed most modern browsers including chrome will understand it is an img without this
        res.end(img.img);
    } else {
        res.end('No Img with that Id!');
    }
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
