const express = require('express');
const router = express.Router();
const data = require('../data');
const userApiData = data.userApi;
const path = require('path');
const validation = require('../validation');

router.get('/', async (req, res) => {
    try {
        const data = await userApiData.getAll();
        res.render('shows/home', {shows: data, title: 'Show Finder'});
    } catch (e) {
        res.status(404).render('shows/error', {error: e, class: 'error', title: 'Error'});
    }
});

router.post('/search', async (req, res) => {
    try {
        req.body.showSearchTerm = validation.checkString(req.body.showSearchTerm);

        const data = await userApiData.search(req.body.showSearchTerm);
        res.render('shows/search', {showSearchTerm: req.body.showSearchTerm, shows: data, title: 'Shows Found'});
    } catch (e) {
        res.status(400).render('shows/error', {error: e, title: 'Error'});
    }
});

router.get('/show/:id', async (req, res) => {
    try {
        req.params.id = validation.checkId(req.params.id);

        const data = await userApiData.get(req.params.id);
        res.render('shows/show', {show: data, title: data.name});
    } catch (e) {
        res.status(404).render('shows/error', {error: e, title: 'Error'});
    }
});

module.exports = router;