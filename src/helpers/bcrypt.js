const bcrypt = require('bcrypt');

module.exports = {
    async generateHash(password) {
        const hash = await bcrypt.hash(password, 12);
        return hash;
    },

    async comparePassword(password, hash) {
        const compare = await bcrypt.compare(password, hash);
        return compare;
    }
}