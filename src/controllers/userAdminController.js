const Business = require("../database/dbBusiness/businessModel");
const userAdminService = require("../services/userAdminService")



const getUserAdminBusinesses = async (req, res) => {

    const { location, country, lang, category } = req.query;

    let userPOC = req.user._id.toString();


    try {
        const allUserAdminBusinesses = await userAdminService.getUserAdminBusinesses({ location, country, lang, category, userPOC });
        res.send({ status: "OK", data: allUserAdminBusinesses });
    }

    catch (error) {
        res.status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });

    }

}

const publishBusiness = async (req, res) => {
    console.log(req.query);
    const { id } = req.query;
    try {
        userAdminService.publishBusiness(id);

        res.send("BUSINESS PUBLISHED NOW")


    } catch (e) {
        res.status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }

}



module.exports = {
    getUserAdminBusinesses,
    publishBusiness,

}