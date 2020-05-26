/**
 * picture model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('Photo', {
		tableName: 'photos',
		albums() {
			return this.belongsToMany('Album');   // books.author_id = 3   ->   authors.id = 3 (single author)
		},
		user() {
			return this.belongsTo('User');
		}
	}, {
		fetchById(id, fetchOptions = {}) {
			return new this({ id }).fetch(fetchOptions);
		},
	});
}
