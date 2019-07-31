const Card = require('../models/cards');
const QRCode = require('qrcode');
const response = require('../helpers/response');

module.exports = {
    async generateBusiness(req, res, next) {
        const {
            body
        } = req;
        const {
            id
        } = req.params;
        try {
            const qrcode = await QRCode.toDataURL(body.qr_code)
            body.qr_code = qrcode;
            const card = await Card.generateCard(id, body);
            if (!card) {
                return response.errorHelper(res, 400, "Card was not generated")
            }
            return response.successHelper(res, 201, card)
        } catch (error) {
            next({
                message: "Error generating card"
            })
        }
    }
}