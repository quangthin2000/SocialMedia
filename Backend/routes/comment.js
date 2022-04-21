const route = require('express').Router()
const verify = require('../src/middleware/auth')
const commentController = require('../src/controllers/CommentController')

route.post('/', verify, commentController.create)
route.get('/:postId', verify, commentController.showCommentByPost)
route.put('/:id',verify ,commentController.edit)
route.delete('/:id', verify, commentController.destroy)
module.exports = route