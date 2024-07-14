import { deleteContact, getAllContacts, getContactById, updateContact } from "../services/contacts.js";
import createHttpError from "http-errors";
import { createContact } from "../services/contacts.js";


export const getAllContactsController = async (req, res, next) => {
    try {
        const contacts = await getAllContacts();
        res.status(200).json({
          status: 200,
            data: contacts,
            });
    } catch (error) {
        next(error);
    }
  };
  
export const getContactByIdController = async (req, res,next) => {
        const { contactId } = req.params;
        const contact = await getContactById(contactId);
        if (!contact) {
            next(createHttpError(404, 'Contact not found'));
            return;
      }
     
      res.json({
        status: 200,
        message:`Successfully found contact with id ${contactId}!`,
        data: contact,
         
        });
};
    
export const createNewContactController = async (req, res) => {
  const contact = await createContact(req.body);
  console.log(req.body);

  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(204).send();
};

export const upsetContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body, {
    upsert: true,
  });
  if (!contact) {
    next(createHttpError(404, "Contact not found"));
    return;
  }
  const status = contact.isNew ? 201 : 200;
  res.status(status).json({
    status: status,
    message: "Contact successfully upserted!",
    data: contact.contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body);
  if (!contact) {
    next(createHttpError(404, "Contact not found"));
    return;
  };
  res.json({
    status: 200,
    message: "Successfully",
    data: contact.contact,
  });
};