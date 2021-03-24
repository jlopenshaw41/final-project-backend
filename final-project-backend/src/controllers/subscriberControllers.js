const { Subscriber } = require('../models');

const create = (req, res) => {
  console.log(req.body);
  Subscriber.create(req.body).then((subscriber) =>
    res.status(201).json(subscriber)
  );
};

const list = (req, res) => {
  Subscriber.findAll().then((subscribers) => res.status(200).json(subscribers));
};

const update = (req, res) => {
  const { id } = req.params;
  Subscriber.update(req.body, { where: { id } }).then(([numOfRowsUpdated]) => {
    if (numOfRowsUpdated === 0) {
      res.status(404).json({ error: 'The subscriber does not exist.' });
    } else {
      res.status(200).json([numOfRowsUpdated]);
    }
  });
};

const deleteSubscriber = (req, res) => {
  const { id } = req.params;
  Subscriber.destroy({ where: { id } }).then((numOfRowsDeleted) => {
    if (numOfRowsDeleted === 0) {
      res.status(404).json({ error: 'The subscriber does not exist.' });
    } else {
      res.status(204).json(numOfRowsDeleted);
    }
  });
};

module.exports = {
  create,
  list,
  update,
  deleteSubscriber,
};
