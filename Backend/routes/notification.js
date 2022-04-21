const route = require('express').Router()
const verify = require('../src/middleware/auth')
const notificationController = require('../src/controllers/NotificationController')

route.post('/', verify, notificationController.create)
route.get('/', verify, notificationController.showNotificationByToUser)
route.delete('/:id', verify, notificationController.delete)
route.delete('/', verify, notificationController.deleteAll)
route.put('/:id', verify, notificationController.editIsRead)
module.exports = route