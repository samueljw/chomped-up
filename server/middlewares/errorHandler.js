const errorHandler = (err, req, res, next) => {
    let code = 500
    let msg = 'Internal Server Error'
    const { name } = err
    
    if (name === 'Error not found') {
        code = 404
        msg = 'Error Not Found'
    } else if (name === 'SequelizeValidationError' || name === 'SequelizeUniqueConstraintError') {
        code = 400
        msg = err.errors[0].message
        // msg = []
        // err.errors.forEach (el => msg.push(el.message))
    } else if (name === 'User not found') {
        code = 401
        msg = 'Invalid Email / Password'
    } else if (name === 'InvalidToken' || name === "JsonWebTokenError") {
        code = 401
        msg = "Access Token is Invalid"
    } else if (name === 'Forbidden') {
        code = 403
        msg = "You do not have access"
    } else if (name === 'BadRequest') {
        code = 400
        msg = "Params Id Must Be Number"
    } else if (name === 'notCustomer') {
        code = 403
        msg = "You are not a customer"
    } 
    // else if (name === 'SequelizeUniqueConstraintError') {
    //     code = 401
    //     msg = 'Email has to be unique'
    // }
    res.status(code).send({
        statusCode: code,
        error: {
            message: msg,
        },
    })
}

module.exports = errorHandler