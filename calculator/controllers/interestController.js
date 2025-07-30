module.exports = (req, res) => {
    const { principal, rate, time } = req.body;
    const result = (principal * rate * time) / 100;
    res.json({ result });
};
