const express = require('express');

const router = express();

router.use(require('./routes/videos-single')('/videos/:id'));
router.use(require('./routes/videos-all')('/videos'));

module.exports = router;
