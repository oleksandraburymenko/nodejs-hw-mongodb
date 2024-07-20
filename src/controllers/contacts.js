import {
  deleteContact,
  getAllContacts,
  getContactById,
  upsertContact
} from "../services/contacts.js";
import createHttpError from "http-errors";
import { createContact } from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { fieldList } from "../constants/index.js";
import { parseContactFilterParems } from "../utils/parseContactFilterParams.js";

export const getAllContactsController = async (req, res) => {
  const{_id: userId} = req.user;
  const { query } = req;
  const { page, perPage } = parsePaginationParams(query);
  const { sortBy, sortOrder } = parseSortParams(query, fieldList);
  const filter = {...parseContactFilterParems(query), userId};
  
  const data = await getAllContacts({
    page,
    perPage,
    sortBy, 
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    data,
    message:"Success found contacts",
  });
     };
  
export const getContactByIdController = async (req, res) => {
   const { _id: userId } = req.user;
  const { contactId } = req.params;
  
        const data = await getContactById({_id: contactId, userId});
        if (!data) {
            throw createHttpError(404, `Contact with id=${contactId} not found`);
           
      }
     
      res.json({
        status: 200,
        message:`Successfully found contact with id ${contactId}!`,
        data,
        });
};
    
export const createNewContactController = async (req, res) => {
  const { _id: userId } = req.user;

  const data = await createContact({...req.body, userId});
 
 
  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data,
  });
};


export const updateContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;
  const data = await upsertContact({_id: contactId, userId}, req.body, {upsert: true});
 
  const status = data.isNew ? 201 : 200;
  const message = data.isNew ? "Contact success add!" : "Contact successfully updated!";
  
  res.json({
    status,
    message,
    data: data.value,
  });
};

export const patchContactController = async (req, res) =>{
const { _id: userId } = req.user;
  const { contactId } = req.params;
  const result = await upsertContact({_id:contactId, userId}, req.body);
  
  if (!result) {
   throw createHttpError(404, `Contact with id=${contactId} not found`);
   };
  
  res.json({
    status: 200,
    message: "Successfully updated contact",
    data: result.data,
  });
};



export const deleteContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;
  const result = await deleteContact({_id: contactId, userId});
  
  if (!result) {
    throw createHttpError(404, `Contact with id=${contactId} not found`);

  }
  res.json({
    status: 204,
    });
};