import { Router } from "express";
import {getAllContactsController, getContactByIdController, createNewContactController,
        deleteContactController, updateContactController, patchContactController } from "../controllers/contacts.js"; 
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema,updateContactSchema  } from "../validation/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/multer.js";        
const contactRouter = Router();
contactRouter.use(authenticate);
        
contactRouter.get('/contacts', ctrlWrapper (getAllContactsController));
contactRouter.get('/contacts/:contactId',isValidId,  ctrlWrapper (getContactByIdController));
contactRouter.post('/contacts', upload.single('photo'), validateBody(createContactSchema) ,ctrlWrapper(createNewContactController));  
contactRouter.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactController));
contactRouter.put('/contacts/:contactId', upload.single('photo'), isValidId, ctrlWrapper(updateContactController));
contactRouter.patch('/contacts/:contactId', upload.single('photo'), isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));
contactRouter.use('*', (req, res, next) => {
  res.status(404).json({
      status: 404,
      message: 'Not found ',
    });
    next();
  });
        
        
export default contactRouter;