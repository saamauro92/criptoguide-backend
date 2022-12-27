// we'll be handling our api logic like transforming data structures and communicating with our Database Layer.

const Business = require("../database/dbBusiness/businessModel");
const BusinessDB = require("../database/business.js");

const getAllBusinesses = async (filterParams) => {

    try {

        const allBusinesses = await BusinessDB.getAllBusinesses(filterParams);
        return allBusinesses;
    } catch (error) {
        throw error;
    }

}

const createBusiness = (business) => {

    try {

        return BusinessDB.createBusiness(business);

    } catch (error) {
        throw error;
    }

}


const deleteBusiness =  (params) => {

    try {
         BusinessDB.deleteBusiness(params);
    } catch (error) {
        throw error;

    }
}


module.exports = {
    getAllBusinesses,
    createBusiness,
    deleteBusiness
}