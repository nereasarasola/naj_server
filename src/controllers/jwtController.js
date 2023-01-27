require('dotenv').config();
const {generatePermanentToken} = require("../jwt");
const {STATUS, MISSING_EMAIL, MESSAGE } = require('../constants');

const createPermanentToken = async (req, res) => {

    const { email } = req.body;
    console.log({email: email})

    if (!email) {
        return res.status(400).send({status: STATUS, data: { error: MISSING_EMAIL }});
    }

    try {
        let permanentToken = generatePermanentToken(email);
        console.log({permanentToken: permanentToken});
        res.send({ token: permanentToken });

    } catch (error) {
        res.status(error?.status || 500).send({
            status: STATUS,
            message: MESSAGE,
            data: { error: error?.message || error },
        });
    } 
}

exports.createPermanentToken = createPermanentToken;