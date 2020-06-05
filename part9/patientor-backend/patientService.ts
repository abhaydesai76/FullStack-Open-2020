import patientDetails, { patient } from '../../data/patients';
import { PatientDetails, NewPatientDetails, NewPatient } from '../../types';

const getPatient = (): Array<NewPatient> => {
    return patient;
};

// const getPatient = (): Array<PatientDetails> => {
//     return patientDetails;
// };

const addPatient = (details: NewPatientDetails): PatientDetails => {
    const newPatientEntry = {
        id: Math.random().toString(36).slice(2),
        ...details
    };

    patientDetails.push(newPatientEntry);

    return newPatientEntry;
};

const findById = (id: string): NewPatient | undefined => {
    const details = patient.find(p => p.id === id);

    return details;
};

// const findById = (id: string): PatientDetails | undefined => {
//     const details = patientDetails.find(p => p.id === id);

//     return details;
// };

export default { getPatient, addPatient, findById };