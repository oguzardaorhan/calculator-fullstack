const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    const metasPath = path.join(__dirname, '../metas');
    const files = fs.readdirSync(metasPath);

    const result = {};

    files.forEach(file => {
        if (file.endsWith('.js')) {
            const key = path.basename(file, '.js'); // örnek: add
            const data = require(path.join(metasPath, file));
            result[key] = data;
        }
    });

    res.json(result);
});

module.exports = router;
