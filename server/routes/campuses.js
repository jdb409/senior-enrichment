const router = require('express').Router();
const Campus = require('../../db/models/Campus')
const Student = require('../../db/models/Student')

router.get('/', (req, res, next) => {
    Campus.findAll({ include: [{ all: true }] })
        .then(campuses => {
            res.send(campuses);
        })
});

router.get('/:campusId', (req, res, next) => {
    console.log(req.params);
    Campus.findById(req.params.campusId, { include: [{ all: true }] })
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
    Promise.all([Campus.findById(req.params.campusId * 1, { include: [{ all: true }] }), Student.findById(req.body.studentId * 1)])
        .then(([campus, student]) => {
            console.log(campus.students.length);
            return campus.addStudent(student)
                .then(campus => {
                    return Campus.findById(req.params.campusId * 1, { include: [{ all: true }] })
                        .then(campus => {
                            console.log(campus.students);
                            res.send(campus);
                        })
                })


        }).catch(next)
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