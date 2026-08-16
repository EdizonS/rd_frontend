import { useState, useEffect } from "react";
import { obtener_amortizacion_simulada } from "../services/api.js";

function TablaAmortizacion({ datosSimulacion }) {
    const [tabla, setTabla] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const datos = await obtener_amortizacion_simulada(datosSimulacion);
                setTabla(datos);
            } catch (err) {
                setError("No se pudo cargar la tabla de amortización");
            } finally {
                setCargando(false);
            }
        };
        cargarDatos();
    }, [datosSimulacion]);

    if (!datosSimulacion) return null;
    if (cargando) return <p>Cargando tabla de amortización...</p>;
    if (error) return <p className="error">{error}</p>;
    return (
        <div className="tabla-scroll">
            <table>
                <thead>
                    <tr>
                        <th>Cuota</th>
                        <th>Valor cuota</th>
                        <th>Interés</th>
                        <th>Abono a capital</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    {tabla.map((fila) => (
                        <tr key={fila.numero_cuota}>
                            <td>{fila.numero_cuota}</td>
                            <td>{fila.cuota_mensual}</td>
                            <td>{fila.interes}</td>
                            <td>{fila.abono_capital}</td>
                            <td>{fila.saldo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default TablaAmortizacion;