const  user = require('./api/user.js');
const author = require('./api/author.js');
const teacherList = require('./api/teacherList.js');

module.exports = () => {
  return {
    user,
    author,
    teacherList
  }
}