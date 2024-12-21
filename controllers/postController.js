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

	const { id } = req.params

	console.log('post id:', id)

	const sql = `
	SELECT *
	FROM posts
	WHERE id = ?`


	const sqlTags = `
	SELECT tags.* 
	FROM tags
	JOIN post_tag
	ON tags.id = post_tag.tag_id
	WHERE post_tag.post_id = ?`

	connection.query(sql, [id], (err, results) => {

		if (err) return res.status(500).json({ error: 'Database query failed' })

		if (results.length === 0) return res.status(404).json({ error: 'Post not found' })

		const posts = results[0]

		connection.query(sqlTags, [id], (err, tags) => {

			if (err) return res.status(500).json({ error: 'Database query failed' })

			posts.tags = tags

			res.json(posts)
		})

	})


}


function store(req, res) {



}


function update(req, res) {


}



function modify(req, res) {

}


function destroy(req, res) {

	const { id } = req.params

	const sql = `DELETE FROM posts WHERE id = ?`

	connection.query(sql, [id], (err) => {

		if (err) return res.status(500).json({ error: 'Failed to delete posts' })

		res.sendStatus(204)
	})


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