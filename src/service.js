const {faker} = require("@faker-js/faker")

const services = {}

services.getRandomValues = (min, max) => {
    return  faker.datatype.number({
        'min': min,
        'max': max
    });
}

services.generateFakePerson =  () => {
    return {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        age: faker.datatype.number({
            min: 18, max: 55
        }),
        image_path: faker.image.avatar(),
        address: faker.address.streetAddress()
    };
}

services.processString =  (text) => {
    const obj = {chars: 0, digits: 0, special: 0, words: 0}

    const regChars = /[A-Za-z]/g;
    const regDigits = /\d/g;
    const regWords = /(?:\w|['-]\w)+/g;
    const regSpecials = /[^((0-9)|(a-z)|(A-Z)|\s)]/g;

    obj.chars = text.match(regChars)?.length;
    obj.digits = text.match(regDigits)?.length;
    obj.words = text.match(regWords)?.length;
    obj.special = text.match(regSpecials)?.length;


    return obj;
}
module.exports = services;