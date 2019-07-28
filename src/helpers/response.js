module.exports = {
    successHelper(res, status, data) {
        return res.status(status).json({
            status,
            data: [data]
        })
    },

    errorHelper(res, status, message) {
        return res.status(status).json({
            status,
            message
        })
    }
}