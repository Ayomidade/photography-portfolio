import { Router } from 'express'
import { sendContactMessage } from '../controllers/contact.controller.js'

const contact_route = Router()

contact_route.post('/', sendContactMessage)

export default contact_route