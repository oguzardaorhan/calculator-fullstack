module.exports = (req, res) => {
    const { a, b } = req.body;
    const result = a - b;
    res.json({ result });
};
