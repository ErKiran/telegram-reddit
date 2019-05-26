const axios = require('axios');

module.exports = {
    getTop: async function getTop(name) {
        const res = await axios.get(`https://www.reddit.com/r/${name}.json`);
        if (res.length == 0) {
            return false;
        } else {
            const max = Math.max.apply(Math, res.data.data.children.map(i => i.data.ups));
            const tosubmit = res.data.data.children.filter(i => i.data.ups == max)
            return tosubmit;
        }
    },
    getRandom: async function getRandom(name) {
        const res = await axios.get(`https://www.reddit.com/r/${name}.json`);
        if (res.length == 0) {
            return false;
        } else {
            let max = [];
            max = res.data.data.children.map(i => i.data.ups);
            const rand = Math.floor(Math.random() * max.length);
            const tosubmit = res.data.data.children.filter(i => i.data.ups == max[rand])
            return tosubmit;
        }
    },
    getSub: async function getSub() {
        const res = await axios.get(`https://www.reddit.com/reddits.json`);
        const subs = res.data.data.children.map(i => i.data.display_name);
        const rand = Math.floor(Math.random() * subs.length);
        const recommend = subs[rand];
        return recommend;
    },
    stalk: async function stalk(name) {
        const res = await axios.get(`https://www.reddit.com/user/${name}.json`);
        return res.data.data.children.filter(i => i.kind == 't1');
    }

}
