const server = require('./server');

const PORT = process.env.PORT || 5000;


server.listen(PORT, () => {
    console.log(`server is listening at ${PORT}`)
});

module.exports = server;