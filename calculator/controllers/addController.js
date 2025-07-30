module.exports = (req, res) => {


    const { a, b } = req.body;
    const numA = Number(a);
    const numB = Number(b);

    if (isNaN(numA) || isNaN(numB)) {
        return res.status(400).json({ error: 'Geçersiz sayılar' });
    }

    const result = numA + numB;
    res.json({ result });
};
