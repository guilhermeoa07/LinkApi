const router = require('express').Router()
const controller = require('../controllers/webhook')

router.post('/', controller.post)

module.exports = router