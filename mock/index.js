const  user = require('./api/user.js');
const author = require('./api/author.js');
module.exports = () => {
  return {
    user,
    author
  }
}