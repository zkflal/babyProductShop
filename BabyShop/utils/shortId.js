const { nanoid } = require('nanoid');

const shortId = {
  type: String,
  default: () => {
    return nanoid()
  },
  index: true,
}

module.exports = shortId;