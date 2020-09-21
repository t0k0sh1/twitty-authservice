const healthcheck = (req, res) => {
  res.status(200).send({ message: 'OK' });
};

export default {
  healthcheck,
};
