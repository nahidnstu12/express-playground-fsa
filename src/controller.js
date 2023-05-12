const {getRandomValues, generateFakePerson, processString} = require("./service")
const controller = {}

controller.getRandomValues =  async (req, res) => {
    const {min,max} = req.query;
    const getNumber = getRandomValues(min||0, max||100)
    res.json({number: getNumber})
}


controller.getPerson =  async (req, res) => {
    const personInfo = generateFakePerson()
    res.send({person: personInfo})
}

controller.calculateString =  async (req, res) => {
    const {text} = req.query;
    const processText = processString(text)
    res.send({data: processText})
}

module.exports = controller;