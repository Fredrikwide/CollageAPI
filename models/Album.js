/**
 * Album model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('Album', {
		tableName: 'albums',
		books() {
			return this.hasMany('photo');
		},
	});
}
