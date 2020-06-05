/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientDetails, Gender, NewPatient } from '../../types';

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseName = (name: any): string => {
    if (!name || !isString(name)) 
    {
        throw new Error('Incorrect or missing name: ' + name);
    }

    return name;
};

const parseDateOfBirth = (dateOfBirth: any): string => {
    if (!dateOfBirth || !isString(dateOfBirth)) 
    {
        throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
    }

    return dateOfBirth;
};

const parseSSN = (ssn: any): string => {
    if (!ssn || !isString(ssn)) 
    {
        throw new Error('Incorrect or missing SSN: ' + ssn);
    }

    return ssn;
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) 
    {
        throw new Error('Incorrect or missing gender: ' + gender);
    }

    return gender;
};

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) 
    {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }

    return occupation;
};

const toNewPatientDetails  = (object: any): NewPatientDetails => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        // entries: object.entries
    };
};

export const toNewPatient  = (object: any): NewPatient => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),        
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: object.entries
    };
};

export default toNewPatientDetails;

