function validationMapprer(error){
    const {details} = error;
    let invalidParams = {};
    if(details?.body?.length > 0){
        for (let item of details.body) {
           invalidParams[item.context.key] = item.message?.replace(/\\/g, '').replace(/"/g, '')
        }
        return invalidParams
    }
    return {}
}
module.exports = {
    validationMapprer
}