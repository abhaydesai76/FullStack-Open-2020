import express from 'express';
import patientService from '../services/patientService';
import toNewPatientDetails from '../utils/utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
    res.send(patientService.getPatient());
});

patientRouter.get('/:id', (req, res) => {    
    
    const details = patientService.findById(req.params.id);

    if (details)
    {
        res.send(details);
    }
    else
    {
        res.sendStatus(404);
    }
});

patientRouter.post('/', (req, res) => {
    const newPatientDetails = toNewPatientDetails(req.body);

    const newPatient = patientService.addPatient(newPatientDetails);

    res.json(newPatient);
});

export default patientRouter;
