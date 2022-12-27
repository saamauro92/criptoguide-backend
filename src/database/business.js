
const Business = require("../database/dbBusiness/businessModel");
const DB = require("./db.json");
const mongoose = require("mongoose");


const getAllBusinesses = async (filterParams) => {

    try {

        let business = await Business.find();

        if (!business) {
            throw new Error;
        }

 
        if (filterParams.location) {
            return business.filter((bs) => bs.location.toLowerCase().includes(filterParams.location))
        }
        if (filterParams.country) {
            return business.filter((bs) => bs.location.toLowerCase().includes(filterParams.country))
        }

        if (filterParams.category) {
            return business.filter((bs) => bs.location.toLowerCase().includes(filterParams.category))
        }

      return business;

    } catch (error) {

        res.status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } })
    }

}


const createBusiness = (business) => {

    try {
        console.log('Creating new business...');
        const newBusiness = new Business({
            // add the rest of the schema  ** name, location, translation, address, description, category, lat, long, poc, lang
            name: business.name,
            location: business.location,
            poc: business.POC,
            translation: business.translation,


        });

        return newBusiness.save().then(() => console.log("sucess!!"));
    } catch (error) {
        return error;
    }


}

const deleteBusiness = async (params) => {
    try {

        Business.findById({ _id: params.id }, async function (error, bs) {
            if (error) {
                console.log(error)
            } else if (bs.poc === params.POC) {
                console.log('deleting...');
                Business.findByIdAndDelete(params.id).exec().catch((err) => console.log(err));
                // return console.log("successfuly  deleted");
            } else {
                return;
            }
        })


    } catch (error) {
        throw Error;
    }
}

module.exports = { getAllBusinesses, createBusiness, deleteBusiness }