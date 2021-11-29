const { schema , normalize } = require('normalizr');

const schemaAuthor = new schema.Entity('author')

const schemaMessage = new schema.Entity('message', {
    author: schemaAuthor
})

const schemaMessages = new schema.Entity('messages', {
    messages: [schemaMessage]
})


const normalizeMessages = (messages) => normalize(messages, schemaMessages);


module.exports = {
    normalizeMessages
}