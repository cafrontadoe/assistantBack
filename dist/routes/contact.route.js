"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_controller_1 = __importDefault(require("../controllers/contact.controller"));
const contactsRouter = (0, express_1.Router)();
const controller = new contact_controller_1.default();
contactsRouter.get('/', controller.getAllContacts);
contactsRouter.post('/', controller.createContact);
exports.default = contactsRouter;
