const Videos = require('./data');

module.exports = function(req, res) {
  Videos.findById(req.params.id, (err, result) => {
    if (err || !result) {
      return res.status(400).send({
        err: err
      });
    }

    res.status(200).send(result);
  });
};
