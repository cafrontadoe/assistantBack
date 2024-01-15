"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ContactSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
});
const Contact = (0, mongoose_1.model)('Contact', ContactSchema);
exports.default = Contact;
