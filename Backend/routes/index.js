const auth = require('./auth')
const user = require('./user')
const post = require('./post')
const comment = require('./comment')
const notification = require('./notification')
// const upload = require('./upload')
function route(app){
    app.use('/api/auth', auth),
    app.use('/api/user', user),
    app.use('/api/post', post),
    app.use('/api/comment', comment)
    app.use('/api/notification', notification)
    // app.use('/api', upload)
}
module.exports = route