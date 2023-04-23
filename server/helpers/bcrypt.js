const bcryptBuiltIn = require('bcryptjs')

const bcryptCompareSync = (dataBasePass, inputtedPass) => {
    return bcryptBuiltIn.compareSync(
        dataBasePass, inputtedPass)
}
const bcryptHashSync = (password, int) => {
    return bcryptBuiltIn.hashSync(
        password, int)
}


module.exports = { bcryptCompareSync, bcryptHashSync }