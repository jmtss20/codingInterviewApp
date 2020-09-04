import express = require('express');
import { controllers } from './controllers';
export const router = express.Router();

router.get('/:room', controllers.joinRoom);
router.post('/room', controllers.createRoom);
