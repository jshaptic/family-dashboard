const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get albums
router.get('/', async (req, res) => {
    const albums = await loadAlbumsCollection();
    res.send(await albums.find({}).toArray());
});

// Add album
router.post('/', async (req, res) => {
    const albums = await loadAlbumsCollection();
    await albums.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

// Delete album
router.delete('/:id', async (req, res) => {
    const albums = await loadAlbumsCollection();
    await albums.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadAlbumsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb://butler:butler123@ds143593.mlab.com:43593/family_dashboard', {
        useNewUrlParser: true
    });

    return client.db('family_dashboard').collection('albums');
}

module.exports = router;