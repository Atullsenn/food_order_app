import express, {Request, Response, NextFunction} from 'express';
import { updateVandorProfile, vandorLogin, getVandorProfile, updateVandorService, addFoods, getFoods } from '../controllers/VandorController';
import { authenticate } from '../middlewares';

const router = express.Router();


router.post('/login', vandorLogin);

router.use(authenticate);
router.get('/profile', getVandorProfile);
router.patch('/profile', updateVandorProfile);
router.patch('/service', updateVandorService);
router.post('/food', addFoods);
router.get('/food', getFoods);

export {router as VendorRoute};