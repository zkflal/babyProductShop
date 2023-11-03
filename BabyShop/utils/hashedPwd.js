const crypto = require('crypto');

module.exports = (password) => {
    const hash = crypto.createHash('sha1')
                        .update(password)
                        .digest('hex');
        return hash;
} 