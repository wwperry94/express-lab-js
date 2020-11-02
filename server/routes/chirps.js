const express = require('express');
const chirpstore = require('../../chirpstore');

let router = express.Router()

router.get('/:id?', function (req, res) {
    let id = req.params.id;
    if (id) {
        res.json(chirpstore.GetChirp(id));
    } else {
        res.status(200).json(chirpstore.GetChirps());
    }
});

router.post('/', (req, res) => {
    chirpstore.CreateChirp(req.body);
    res.sendStatus(200);
});

router.put("/:id", (req, res)=>{
    let id = req.params.id;
    let chirp = req.body;
    chirpstore.UpdateChirp(id, chirp);
    res.sendStatus(200);
});

router.delete("/:id", (req, res) => {
    let id = req.params.id;
    chirpstore.DeleteChirp(id);
    res.sendStatus(200);
});

module.exports = router