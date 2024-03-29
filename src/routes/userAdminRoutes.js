
const express = require("express");
const passport = require("passport");
require("../database/dbUsers/passportConfig")
const router = express.Router();
const User = require("../database/dbUsers/userModel");
const userAdminController = require("../controllers/userAdminController");
const businessController = require("../controllers/businessController");
const { default: requireUserAdmin } = require("../middleware/requireUserAdmin");


router.get("/listings", passport.authenticate("jwt", { session: false }), userAdminController.getUserAdminBusinesses);


router.put("/add", passport.authenticate("jwt", { session: false }),

    async (req, res, next) => {

        try {
            // Extract userem> 

            let existingUser = await User.findOneAndUpdate({ 'google.id': req.user.google.id }, { 'google.data': req.body.data }, { new: true });
            // if user exists return the user with the updated data
            return existingUser

        } catch (error) {
            res.status(400).send({ error: error.message })
        }

    }
);


/// USER ADMIN ROLE ROUTES


router.get("/allbusinesses", requireUserAdmin,   businessController.getAllBusinessesForAdmin)


// BUSINESS PUBLISHED OR NOT

router.put("/publish", requireUserAdmin,   userAdminController.publishBusiness)


// BUSINESS DELETE
router.delete("/business/:id", requireUserAdmin,   userAdminController.deleteBusiness)

module.exports = router;