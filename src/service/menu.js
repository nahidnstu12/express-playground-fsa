const {AppdataSource} = require('../database/config');
const Menu = require('../model/menu');

const menuRepository = AppdataSource.getRepository(Menu);
const service = {}

service.createMenuHandler = async (input) => {
    return await menuRepository.save(menuRepository.create({ ...input }));
};
service.readAllMenuHandler = async (input) => {
    return await menuRepository.save(menuRepository.create({ ...input }));
};
service.readMenuHandler = async (input) => {
    return await menuRepository.save(menuRepository.create({ ...input }));
};
service.updateMenuHandler = async (input) => {
    return await menuRepository.save(menuRepository.create({ ...input }));
};
service.deleteMenuHandler = async (input) => {
    return await menuRepository.save(menuRepository.create({ ...input }));
};
service.publishMenuHandler = async (input) => {
    return await menuRepository.save(menuRepository.create({ ...input }));
};
service.unpublishMenuHandler = async (input) => {
    return await menuRepository.save(menuRepository.create({ ...input }));
};

module.exports = service;
