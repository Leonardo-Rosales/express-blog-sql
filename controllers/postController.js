const connection = require('../data/db.js')
const { json } = require('express')



function index(req, res) {

	console.log('ecco l\'elenco dei post')

	const callback = (err, results) => {

		if (err) {

			res.status(500).json({ error: 'Database query failed' })
		} else {

			res.json(results)
		}
	}

	if (req.query.tags) {

		const sql = `

		SELECT posts.* 
		FROM posts
		JOIN post_tag
		ON posts.id = post_tag.post_id
		JOIN tags
		ON post_tag.tag_id = tags.id
		WHERE tags.label = ?`

		connection.query(sql, [req.query.tags], callback)

	} else {

		const sql = `SELECT * FROM posts`

		connection.query(sql, callback)
	}

}


function show(req, res) {


}


function store(req, res) {



}


function update(req, res) {


}



function modify(req, res) {

}


function destroy(req, res) {


}


module.exports = { index, show, store, update, modify, destroy }



function validate(req) {

	const { title, content, image, tags } = req.body

	const errors = []

	if (!title) {
		errors.push('titolo is required')
	}
	if (!content) {
		errors.push('contenuto is required')
	}
	if (!image) {
		errors.push('Immagine is required')
	}
	if (!tags) {
		errors.push('tags is required')
	}
	return errors

}