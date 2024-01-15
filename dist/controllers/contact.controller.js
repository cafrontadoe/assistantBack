"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contact_model_1 = __importDefault(require("../models/contact.model"));
class ContactsController {
    getAllContacts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //   const contacts = await Contact.find();
                res.status(200).json(['holi']);
            }
            catch (error) {
                console.log('holi');
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    createContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, phone } = req.body;
                const contact = new contact_model_1.default({ name, email, phone });
                yield contact.save();
                res.status(201).json(contact);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.default = ContactsController;
