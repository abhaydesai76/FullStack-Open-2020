import React from 'react';
import axios from "axios";
import { useStateValue } from "../state";
import { useParams } from 'react-router-dom';
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";

interface PatientData {
    id?: string;
    name?: string;
}

const PatientDetails: React.FC<PatientData> = () => {    
    const [{ patient }, dispatch] = useStateValue();

    const { id } = useParams<{ id: string }>();
    console.log(id);

    React.useEffect(() => {        
        const fetchPatientDetails = async () => {
            try {
                const { data: details } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

                console.log(details);

                dispatch({ type: "SET_PATIENT", payload: details });
            }
            catch (e) {
                console.error(e);
              }
        };
        fetchPatientDetails();
    }, []);

    return (
        <div>
            Inside Patient Details Form
            {patient}
        </div>
    );
};

export default PatientDetails;