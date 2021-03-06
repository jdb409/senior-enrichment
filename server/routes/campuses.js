const router = require('express').Router();
const Campus = require('../../db/models/Campus')
const Student = require('../../db/models/Student')

router.get('/', (req, res, next) => {
    Campus.findAll({ include: [{ all: true }] })
        .then(campuses => {
            res.send(campuses);
        }).catch(next);
});

router.get('/:campusId', (req, res, next) => {
    Campus.findById(req.params.campusId, { include: [{ all: true }] })
        .then(campus => {
            res.send(campus);
        }).catch(next);
})

router.post('/', (req, res, next) => {
    Campus.create(req.body)
        .then(campus => {
            res.send(campus);
        }).catch(next);
});

router.put('/:campusId', (req, res, next) => {
    //checks if delete flag is false
    if (!req.body.del) {
        Campus.addStudent(req.params.campusId * 1, req.body.studentId.studentId * 1)
            .then(campus => {
                res.send(campus);
            }).catch(next)
    } else {
        Campus.removeStudent(req.params.campusId * 1, req.body.studentId.studentId * 1)
            .then(campus => {
                res.send(campus);
            }).catch(next)
    }
});

router.delete('/:campusId', (req, res, next) => {
    Campus.destroy({
        where: {
            id: req.params.campusId
        }
    })
        .then(() => {
            res.sendStatus(200);
        }).catch(next);
})

module.exports = router;