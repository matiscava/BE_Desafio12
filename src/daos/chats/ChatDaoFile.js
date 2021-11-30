
const FileContainer = require("../../containers/FileContainer");

class ChatDaoFile extends FileContainer {
 constructor () {
     super('/db/chat.json')
 }
};

module.exports = ChatDaoFile;