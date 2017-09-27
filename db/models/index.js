'use strict';
const db = require('../index');
const Student = require('./Student');
const Campus = require('./Campus');

const seed = () => {
	return Promise.all([
		Student.create({ name: 'Jon', email: 'jbrandwein@gmail.com' }),
		Student.create({ name: 'Gus', email: 'gbrandwein@gmail.com' }),
		Student.create({ name: 'Carolyn', email: 'currbrandwein@gmail.com' }),
		Campus.create({ name: 'Mars', image: 'https://www.nasa.gov/sites/default/files/thumbnails/image/exo-neptune_art_1080.jpg' }),
		Campus.create({ name: 'Pluto', image: 'https://www.nasa.gov/sites/default/files/thumbnails/image/exo-neptune_art_1080.jpg' }),
		Campus.create({ name: 'Earth', image: 'https://www.nasa.gov/sites/default/files/thumbnails/image/exo-neptune_art_1080.jpg' })
	]
	).then(([Jon, Gus, Carolyn, Mars, Pluto]) => {
		Jon.setCampus(Mars);
		Gus.setCampus(Pluto);
	})
}

Student.belongsTo(Campus);
Campus.hasMany(Student);

module.exports = seed;
