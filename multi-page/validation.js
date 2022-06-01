function checkId(id) {
    if (!id) throw 'Error: You must provide an id to search for';
    if (typeof id !== 'string') throw 'Error: Parameter must be a string';
    id = id.trim();
    if (id.length === 0) throw 'Error: id cannot be an empty string or just spaces';
    if (!Number(id) || !Number.isInteger(Number(id)) || Number(id) <= 0) throw 'Error: id must be a positive whole number';
    return id;
}

function checkString(term) {
    if (!term || typeof term != 'string' || term.trim().length == 0) throw 'Error: Search cannot be empty'
    return term.trim();
}

module.exports = {
    checkId,
    checkString
}