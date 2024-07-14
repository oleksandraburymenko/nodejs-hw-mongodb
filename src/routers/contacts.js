import { Router } from "express";
import {getAllContactsController, getContactByIdController, createNewContactController,
        deleteContactController, upsetContactController, patchContactController } from "../controllers/contacts.js"; 
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const contactRouter = Router();

contactRouter.get('/contacts', ctrlWrapper (getAllContactsController));
contactRouter.get('/contacts/:contactId',  ctrlWrapper (getContactByIdController));
contactRouter.post('/contacts', ctrlWrapper(createNewContactController));  
contactRouter.delete('/contacts/:contactId',  ctrlWrapper(deleteContactController));
contactRouter.put('/contacts/:contactId',  ctrlWrapper(upsetContactController));
contactRouter.patch('/contacts/:contactId',  ctrlWrapper(patchContactController));
contactRouter.use('*', (req, res, next) => {
  res.status(404).json({
      status: 404,
      message: 'Not found',
    });
    next();
  });


export default contactRouter;