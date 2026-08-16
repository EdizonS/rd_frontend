import { useState } from "react";
import FormularioSimulacion from "./components/FormularioSimulacion";
import ResumenCredito from "./components/ResumenCredito";
import FormularioSolicitud from "./components/FormularioSolicitud";
import TablaAmortizacion from "./components/TablaAmortizacion"

function App() {
  const [resultado, setResultado] = useState(null);
  function manejarResultado(data) {
    setResultado(data);
  }

  const [solicitud, setSolicitud] = useState(null);
  function manejarSolicitud(data){
    setSolicitud(data);
  }

  return (
    <div className="contenedor">
      <h1>Simulador de crédito Roda</h1>
      
      <div>
        <FormularioSimulacion onResultado={manejarResultado} />
        <ResumenCredito resultado= {resultado} />
      </div>
      <div>
        <h2>Tabla Amortización</h2>
        {resultado && <TablaAmortizacion datosSimulacion={resultado} />}
        </div>
      <div>
        <h2>Solicitud</h2>
        <FormularioSolicitud datosSimulacion={resultado} onSolicitudCreada={manejarSolicitud}/>
        {solicitud && <p>Solicitud registrada con éxito. #Solicitud: {solicitud.id}</p>}
      </div>
    </div>
  )

}

export default App;