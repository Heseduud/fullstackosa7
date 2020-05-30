const logger = require('./logger')

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
    logger.error(err.message)

    if (err.name === 'ValidationError') {
        return res.status(400).send({ error: 'Bad request' })
    } else if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'invalid token'
        })
    }

    next(error)
}

const tokenExtractor = (req, res, next) => {
    const auth = req.get('authorization')
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        req.token = auth.substring(7)
    }

    next()
}

module.exports = { unknownEndpoint, errorHandler, tokenExtractor }