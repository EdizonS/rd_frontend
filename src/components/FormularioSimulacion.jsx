import { useState } from "react";
import { simular_credito } from "../services/api.js";

function FormularioSimulacion({ onResultado }) {
    const [formData, setFormData] = useState({
        tipo_vehiculo: "",
        valor_vehiculo: "",
        cuota_inicial: "",
        plazo_meses: ""
    });
    const[error, setError] = useState(null);
    const[cargando, setCargando] = useState(false);
    const [errores, setErrores] = useState({});

    // Realizamos las validaciones en vivo para que tambien desde el front mientras el usuario llena los campos vaya teniendo sus correcciones y no al final cuando envia el formulario al back
    const validarCampo = (name, value) => {
        const nuevosErrores = { ...errores};
        if (name === "valor_vehiculo"){
            if (Number(value) < 500000){
                nuevosErrores.valor_vehiculo = "El valor del vehículo debe ser mayor o igual a $500.000 COP";
            }else{
                delete nuevosErrores.valor_vehiculo;
            }
        }
        if (name === "cuota_inicial"){
            if (value >= Number(formData.valor_vehiculo)){
                nuevosErrores.cuota_inicial = "La cuota inicial no puede ser mayor al valor del vehículo";
            }else {
                delete nuevosErrores.cuota_inicial;
            }
        }
        setErrores(nuevosErrores);
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        validarCampo(e.target.name, e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);
        setError(null);

        try {
            const datosConvertidos = {
                tipo_vehiculo: formData.tipo_vehiculo,
                valor_vehiculo: Number(formData.valor_vehiculo),
                cuota_inicial: Number(formData.cuota_inicial),
                plazo_meses: Number(formData.plazo_meses)
            };
            const resultado = await simular_credito(datosConvertidos);
            onResultado(resultado);
        } catch (err) {
            setError("Hubo un error al simular el crédito. Revisa los datos ingresados.");
        } finally {
            setCargando(false);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Simula tu crédito</h2>
            <label>Tipo de vehículo:</label>
            <select name="tipo_vehiculo" value={formData.tipo_vehiculo} onChange={handleChange} required>
                <option value="">Selecciona un tipo</option>
                <option value="bicicleta">Bicicleta eléctrica</option>
                <option value="moto">Moto eléctrica</option>
            </select>

            <label>Valor del vehículo:</label>
            <input type="number" name="valor_vehiculo" value={formData.valor_vehiculo} onChange={handleChange} required />
            {errores.valor_vehiculo && <p className="error">{errores.valor_vehiculo}</p>}
            <label>Cuota inicial:</label>
            <input type="number" name="cuota_inicial" value={formData.cuota_inicial} onChange={handleChange} required />
            {errores.cuota_inicial && <p className = "error">{errores.cuota_inicial}</p>}
            <label>Plazo en meses:</label>
            <input type="number" name="plazo_meses" value={formData.plazo_meses} onChange={handleChange} required />

            {error && <p className="error">{error}</p>}
            
            <button type="submit" disabled={cargando || Object.keys(errores).length > 0 }>{cargando ? "Simulando..." : "Simular"}</button>
        </form>
    );
}
export default FormularioSimulacion;