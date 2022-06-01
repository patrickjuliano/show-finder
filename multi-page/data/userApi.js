const axios = require('axios');
const validation = require('../validation');

async function get(id) {
    id = validation.checkId(id);

    const {data} = await axios.get('http://api.tvmaze.com/shows/'.concat(id));
    return data;
}

async function getAll() {
    const {data} = await axios.get('http://api.tvmaze.com/shows');
    return data;
}

async function search(term) {
    term = validation.checkString(term);

    const {data} = await axios.get('http://api.tvmaze.com/search/shows?q='.concat(term));
    return data;
}

module.exports = {
    get,
    getAll,
    search
}