const getAllUsers = (req, res) => {
  const {limit, offset} = req.query;
  if (limit && offset) {
    res.json({
      'limit': limit,
      'offset': offset
    });
  } else {
    res.status(400).send('Faltan parámetros limit y offset');
  }
};

module.exports = {
  getAllUsers
};