/**
 * Album model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('Album', {
		tableName: 'albums',
		photos() {
			return this.hasMany('photo');
		},
		user() {
			return this.belongsTo('user')
		}
	});
}
