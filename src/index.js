const server = require('./server');

const PORT = process.env.PORT || 5000;

server.use(function errors(err, req, res, next) {
    res.status(500).json(err)
});



server.listen(PORT, () => {
    console.log(`server is listening at ${PORT}`)
});