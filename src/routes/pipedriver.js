const router = require('express').Router()
const controller = require('../controllers/pipedriveRequest')

router.get('/', controller.get)

module.exports = router