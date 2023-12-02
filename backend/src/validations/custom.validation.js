const objectId=(value,helper)=>{
    if(!value.match(/^[0-9a-fA-F]{24}$/))
    return helper.message('"{{#label}}" must be a valid mongo id');

    return value;
}

module.exports = {
    objectId
}