import __dirname from "./dirname.js";

const options = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "E-commerce"
        }
    },
    apis: [__dirname + "/docs/*.yaml"]
}

export default options