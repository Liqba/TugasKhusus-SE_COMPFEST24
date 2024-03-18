const { Router } = require('express')
const {
    getDeadlines,
    postDeadlines,
    getDeadline,
    updateDeadline,
    deleteDeadline,
    convertDate,
} = require('../controllers/app')
const router = Router()
 
router.post('/deadlines', postDeadlines)
router.get('/deadlines', getDeadlines)
router.get('/deadlines/:id', getDeadline)
router.put('/deadlines/:id', updateDeadline)
router.delete('/deadlines/:id', deleteDeadline)
router.get('/convertdate/:id', convertDate)

module.exports = router