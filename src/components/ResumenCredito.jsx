import React from 'react';

const formatearMoneda = (valor) => 
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(valor);

function ResumenCredito({ resultado }) {
    if (!resultado) {
        return null;
    }else{
        return (
        <div className="tabla-scroll">
            <table>
                <thead>
                    <tr>
                        <th>Valor del vehículo</th>
                        <th>Cuota inicial</th>
                        <th>Valor financiado</th>
                        <th>Cuota mensual</th>
                        <th>Total intereses</th>
                        <th>Total a pagar</th>
                    </tr>
                </thead>    
                <tbody>
                    <tr>
                        <td>{formatearMoneda(resultado.valor_vehiculo)}</td>
                        <td>{formatearMoneda(resultado.cuota_inicial)}</td>
                        <td>{formatearMoneda(resultado.valor_financiado)}</td>
                        <td>{formatearMoneda(resultado.cuota_mensual)}</td>
                        <td>{formatearMoneda(resultado.total_intereses)}</td>
                        <td>{formatearMoneda(resultado.total_a_pagar)}</td>
                    </tr>
                </tbody>
            </table>
        </div>);
    }
}

export default ResumenCredito;