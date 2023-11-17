const express = require('express');
const router = express.Router();

const loginRoutes = require('./loginRoutes');
const chamadosRoutes = require('./chamadosRoutes');

router.use('/header', loginRoutes);
router.use('/login', loginRoutes);
router.use('/chamados', chamadosRoutes);

module.exports = router;
