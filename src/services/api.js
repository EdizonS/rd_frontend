import axios from 'axios';

const API_URL = "http://127.0.0.1:8000";

export const simular_credito = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/simular`, data);
        return response.data;
    } catch (error) {
        console.error("Error al simular su credito:", error);
        throw error;
}
}

export const obtener_amortizacion_simulada = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/amortizacion`, data);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la amortización:", error);
        throw error;
    }
}

export const registrar_solicitud = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/solicitudes`, data);
        return response.data;
    } catch (error) {
        console.error("Error al registrar la solicitud:", error);
        throw error;
    }
}

// Esta funcion sirve para cuando se quiera consultar la amortización de una solicitud ya registrada
export const obtener_amortizacion = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/solicitudes/${id}/amortizacion`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la amortización:", error);
        throw error;
    }
}