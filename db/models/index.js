'use strict';
const db = require('../index');
const Student = require('./Student');
const Campus = require('./Campus');

const seed = () => {
	return Promise.all([
		Student.create({ name: 'Jon', email: 'jbrandwein@gmail.com' }),
		Student.create({ name: 'Gus', email: 'gbrandwein@gmail.com' }),
		Student.create({ name: 'Carolyn', email: 'currbrandwein@gmail.com' }),
		Campus.create({ name: 'Mars' }),
		Campus.create({ name: 'Pluto' }),
		Campus.create({ name: 'Earth' })
	]
	).then(([Jon, Gus, Carolyn, Mars, Pluto]) => {
		Jon.setCampus(Mars);
		Gus.setCampus(Pluto);
	})
}

Student.belongsTo(Campus);
Campus.hasMany(Student);

module.exports = seed;
