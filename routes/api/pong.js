const router = require('express').Router();

router.use('/', (req, res) => {
    console.log('The user has pinged');
    res.send('Therefore, I must pong');
});

module.exports = router;
