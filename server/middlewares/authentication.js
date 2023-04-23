const { convertTokenToPayload } = require('../helpers/jwt')
const { User }  = require('../models')

const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        if (!access_token) {
            throw {name: 'InvalidToken'}
        }
        const payload = convertTokenToPayload(access_token)
        const { id } = payload
        const userCheck = await User.findByPk(id)
        if (!userCheck) {
            throw {name: 'InvalidToken'}
        }
        req.user = {
            id: userCheck.id,
        }
        next()

    } catch (err) {
        next(err)
    }
}


module.exports = { authentication }