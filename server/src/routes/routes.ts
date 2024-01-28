import { Router } from 'express';
import {userRoutes} from "./userRoutes"
import {authRoutes} from "./authRoutes"

export const routes = Router()

routes.use('/auth', authRoutes)
routes.use('/user', userRoutes)