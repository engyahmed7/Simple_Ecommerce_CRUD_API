const Ajv = require("ajv")
const ajv = new Ajv()

const user = {
    type: "object",
    properties: {
        name: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
        age: { type: "number" }
    },
    required: ["name", "email", "password", "age"],
    additionalProperties: false
    }

    const item = {
    type: "object",
    properties: {
        name: { type: "string" },
        price: { type: "number" },
        desc:{type:"string"}
    },
    required: ["name", "price","desc"],
    additionalProperties: false
    }
    const order = {
    type: "object",
    properties: {
        items: { type: "array" }
    },
    additionalProperties: false
    }



const validateUser = (req, res, next) => {
    const validate = ajv.compile(user)
    const valid = validate(req.body)
    if (!valid) return res.status(400).json({message:validate.errors[0].message})
    next()
}

const validateOrder= (req, res, next) => {
    const validate = ajv.compile(order)
    const valid = validate(req.body)
    if (!valid) return res.status(400).json({message:validate.errors[0].message})
    next()
}
const validateItem = (req, res, next) => {
    const validate = ajv.compile(item)
    const valid = validate(req.body)
    if (!valid) return res.status(400).json({message:validate.errors[0].message})
    next()
}

module.exports = {validateUser,validateOrder,validateItem}