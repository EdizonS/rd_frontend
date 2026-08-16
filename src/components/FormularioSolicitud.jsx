import { useState } from "react";
import { registrar_solicitud } from "../services/api";

function FormularioSolicitud ({datosSimulacion, onSolicitudCreada}){
    const [formPersonal, setFormPersonal] = useState ({
        nombre: "",
        apellido: "", 
        correo: "", 
        telefono: "", 
        ciudad: ""
    });
    const[error, setError] = useState(null);
    const[cargando, setCargando] = useState(false); 
    const[errores, setErrores] = useState({});
    // Expresión regular para validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validarCampo = (name, value) => {
        const nuevosErrores = { ...errores};
        if(name === "correo"){
            if (!emailRegex.test(value)){
                nuevosErrores.correo = "El correo electrónico debe tener formato válido";
            }else{
                delete nuevosErrores.correo;
            }
        }
        if(name === "telefono"){
            if (!/^\d+$/.test(value)){
                nuevosErrores.telefono = "El teléfono debe contener únicamente números";
            }else{
                delete nuevosErrores.telefono
            }
        }
        setErrores(nuevosErrores);
    }

    const handleChange = (e) =>{
        setFormPersonal({
            ...formPersonal,
            [e.target.name]: e.target.value
        });
        validarCampo(e.target.name, e.target.value);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setCargando(true);
        setError(null);
        try{
            const datos_convertidos = {
                ...datosSimulacion,
                nombre: formPersonal.nombre,
                apellido: formPersonal.apellido,
                correo: formPersonal.correo,
                telefono: formPersonal.telefono,
                ciudad: formPersonal.ciudad
            };
            const resultado = await registrar_solicitud(datos_convertidos);
            onSolicitudCreada(resultado);
        }
        catch (err){
            setError("Hubo un error al generar la solicitud. Revisa los datos ingresados");
        }
        finally{
            setCargando(false);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Completa tu solicitud</h2>

            <label>Nombre</label>
            <input type="text" name="nombre" value={formPersonal.nombre} onChange={handleChange} required />
            <label>Apellido</label>
            <input type="text" name="apellido" value={formPersonal.apellido} onChange={handleChange} required />
            <label>Correo electrónico</label>
            <input type="email" name="correo" value={formPersonal.correo} onChange={handleChange} required />
            {errores.correo && <p className="error">{errores.correo}</p>}
            <label>Teléfono</label>
            <input type="text" name="telefono" value={formPersonal.telefono} onChange={handleChange}  required />
            {errores.telefono && <p className="error">{errores.telefono}</p>}
            <label>Ciudad</label>
            <input type="text" name="ciudad" value={formPersonal.ciudad} onChange={handleChange} required />
        
            {error && <p className="error">{error}</p>}
            <button type="submit" disabled={cargando || Object.keys(errores).length > 0 }>{cargando ? "Enviando Solicitud..." : "Enviar Solicitud"}</button>
        </form>
    );
}

export default FormularioSolicitud;