const axios = require('axios');

module.exports = {
    getTop: async function getTop(name) {
        const res = await axios.get(`https://www.reddit.com/r/${name}.json`);
        const max = Math.max.apply(Math, res.data.data.children.map(i => i.data.ups));
        const tosubmit = res.data.data.children.filter(i => i.data.ups == max)
        return tosubmit;
    }
}
