const router = require('express').Router();
const Campus = require('../../db/models/Campus')

router.get('/', (req, res, next) => {
    Campus.findAll({ include: [{ all: true }] })
        .then(campuses => {
            res.send(campuses);
        })
});

router.get('/:campusId', (req, res, next) => {
    console.log(req.params);
    Campus.findById(req.params.campusId)
        .then(campus => {
            res.send(campus);
        })
})

module.exports = router;