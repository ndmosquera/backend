import { Router } from 'express'
import UserManager from '../dao/MongoDB/usersManager.js';

const userRouter = Router()

const manager = new UserManager();