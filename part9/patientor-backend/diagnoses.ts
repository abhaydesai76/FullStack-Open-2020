import express from 'express';
import diagnosisService from '../services/diagnoseService';

const diagnosisRouter = express.Router();

diagnosisRouter.get('/', (_req, res) => {
    res.send(diagnosisService.getNonLatinDiagnosisDetails());
});

diagnosisRouter.post('/', (_req, res) => {
    res.send('Saving diagnosis details');
});

diagnosisRouter.get('/:id', (req, res) => {
    const details = diagnosisService.findByCode(req.params.code);

    if (details)
    {
        res.send(details);
    }
    else
    {
        res.sendStatus(404);
    }
});

export default diagnosisRouter;