import {  Router } from 'express'
import {  parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/createAppointmentServices';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

//appointmentsRouter.get('/', async (request, response) => {
//    const appointments = await appointmentsRepository.find();

//    return response.json(appointments);
//});

appointmentsRouter.post('/', async (request, response) =>{
   try {
        const { provider_id, date } = request.body;

        const parsedDate = parseISO(date);

        const CreateAppointment = container.resolve(CreateAppointmentService);

        const appointment = await CreateAppointment.execute({ 
            date: parsedDate,
            provider_id,
        });
        

        return response.json(appointment);
   } catch (err) {
        if (err instanceof Error) {
        return response.status(400).json({ error: err.message });
        }
    }
});

export default appointmentsRouter;