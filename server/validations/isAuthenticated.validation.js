const passport = require('passport')

module.exports = function (req, res, next) {
  passport.authenticate('jwt', function (err, user) {
    if (err || !user) {
      res.status(403).send({
        error: 'Não tem acesso a este recurso'
      })
    } else {
      req.user = user
      next()
    }
  })(req, res, next)
}
