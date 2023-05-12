const {
  getRandomValues,
  generateFakePerson,
  processString,
} = require("./service");
const controller = {};

controller.getRandomValues = async (req, res) => {
  try {
    const { min, max } = req.query;
    const getNumber = getRandomValues(min, max);
    console.log(getNumber);
    res.json({ number: getNumber });
  } catch (err) {
    res.send(err?.message);
  }
};

controller.getPerson = async (req, res) => {
  try {
    const personInfo = generateFakePerson();
    res.send({ person: personInfo });
  } catch (err) {
    res.send(err?.message);
  }
};

controller.calculateString = async (req, res) => {
  try {
    const { text } = req.query;
    const processText = processString(text);
    res.send({ data: processText });
  } catch (err) {
    res.send(err?.message);
  }
};

module.exports = controller;
