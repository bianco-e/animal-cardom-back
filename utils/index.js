module.exports = {
  defaultOkResponse: (res, sending) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send(sending);
    res.end();
  },
  defaultErrorResponse: (res, message, error) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.status(400).send({ message, error });
    res.end();
  },
};
