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

router.post('/', (req, res, next) => {
    Campus.create(req.body)
        .then(campus => {
            res.send(campus);
        })
});

router.put('/:campusId', (req, res, next) => {
    Campus.findById(req.params.campusId)
    .then(campus => {
        //update
        res.sendStatus(campus);
    })
})

router.delete('/:campusId', (req, res, next) => {
    Campus.destroy({
        where: {
            id: req.params.studentId
        }
    })
        .then(() => {
            res.sendStatus(200);
        })
})

module.exports = router;