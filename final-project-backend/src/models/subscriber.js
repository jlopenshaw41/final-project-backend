module.exports = (connection, DataTypes) => {
  const schema = {
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    subscribed: DataTypes.BOOLEAN,
  };
  const SubscriberModel = connection.define('Subscriber', schema);
  return SubscriberModel;
};
