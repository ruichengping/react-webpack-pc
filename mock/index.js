const  user = require('./api/user.js');
const author = require('./api/author.js');
const userList = require('./api/userList.js');

module.exports = () => {
  return {
    user,
    author,
    userList
  }
}