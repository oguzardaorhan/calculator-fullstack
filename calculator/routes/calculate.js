const express = require('express');
const router = express.Router();
const path = require('path');
const metasPath = path.join(__dirname, '../metas');
const fs = require('fs');


router.post('/', (req, res) => {
    const {operation} = req.body;

    if (!operation || typeof operation !== 'string') {
        return res.status(400).json({error: 'Geçerli bir işlem türü gerekli.'});
    }


    const availableMetaFiles = fs.readdirSync(metasPath).map(file => file.replace('.js', ''));
    if (!availableMetaFiles.includes(operation)) {
        return res.status(400).json({error: 'Operation required'});
    }


    const meta = require(path.join(metasPath, `${operation}.js`));

    for (const input of meta.inputs) {
        const value = req.body?.[input.name];

        console.log(req.body);

        if (value === undefined || value === null ||  String(value).trim() === '') {
            return res.status(400).json({error: `${input.label} alanı zorunludur.`});
        }
        if (input.type === 'number' && isNaN(value)) {
            return res.status(400).json({error: `${input.label} geçerli bir sayı olmalıdır.`});
        }
    }
    const controllerName = operation + "Controller";

    const controller = require(path.join(__dirname, `../controllers/${controllerName}`));
    return controller(req, res);
});

module.exports = router;
