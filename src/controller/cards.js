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
    },

    async getBussinessCard(req, res, next) {
        const {
            id
        } = req.params;
        try {
            const card = await Card.findUserCard(id);
            if (!card) {
                return response.errorHelper(res, 404, "You don't have a bussiness card")
            }
            return response.successHelper(res, 200, card)
        } catch (error) {
            next({
                message: "Error getting bussines card"
            })
        }
    },

    async updateBussinesCard(req, res, next) {
        const {
            id
        } = req.params;
        const {
            body
        } = req;
        try {
            const card = await Card.updateCard(id, body);
            if (!card) {
                return response.errorHelper(res, 400, "Card not updated")
            }
            return response.successHelper(res, 200, card);
        } catch (error) {
            next({
                message: "Error cannot update card"
            })
        }
    },

    async deleteBussinessCard(req, res, next) {
        const {
            id
        } = req.params;
        try {
            const card = await Card.deleteCard(id);
            if (!card) {
                return response.errorHelper(res, 400, "Card was not deleted")
            }
            return response.successHelper(res, 200, card)
        } catch (error) {
            next({
                message: "Error card was not deleted"
            })
        }
    }
}