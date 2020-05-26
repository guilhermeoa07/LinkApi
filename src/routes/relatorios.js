const router = require('express').Router()
const controller = require('../controllers/relatorios')

router.get('/', controller.get)
router.get('/all', controller.getAll)


module.exports = router