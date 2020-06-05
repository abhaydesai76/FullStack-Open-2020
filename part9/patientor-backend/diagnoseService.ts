import diagnosisData from '../../data/diagnoses';
import { DiagnosisDetails, NonLatinDiagnosisDetails } from '../../types';

const getDiagnosis = (): DiagnosisDetails[] => {
    return diagnosisData;
};

const getNonLatinDiagnosisDetails = (): NonLatinDiagnosisDetails[] => {
    return diagnosisData.map(({ code, name }) => ({
        code,
        name
    }));
};

const addDiagnosis = () => {
    return null;
};

const findByCode = (code: string): DiagnosisDetails | undefined => {
    const details = diagnosisData.find(d => d.code === code);

    return details;
};

export default { getDiagnosis, addDiagnosis, getNonLatinDiagnosisDetails, findByCode };