import { Router } from 'express'
import usersRoute from './usersRouter'
import appointmentRouter from './appointmentsRouter'
import postsRouter from './postsRouter'

const indexRouter: Router = Router()

indexRouter.use('/users', usersRoute)
indexRouter.use('/appointments', appointmentRouter)
indexRouter.use('/posts', postsRouter)

export default indexRouter
