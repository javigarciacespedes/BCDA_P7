import {drizzleReactHooks} from '@drizzle/react-plugin'
import {useState} from "react";
import SoyOwner from "../roles/SoyOwner";
import SoyCoordinador from '../roles/SoyCoordinador';

const {useDrizzle} = drizzleReactHooks;

function HomePage() {
     
    const {useCacheCall} = useDrizzle();
    const {drizzle} = useDrizzle();
    let direccion_owner = useCacheCall("Asignatura", "owner");
    let direccion_coordinador = useCacheCall("Asignatura", "coordinador");
    let estadoAsignatura = useCacheCall("Asignatura", "cerrada");
    const [nuevoCoordinador, setNuevoCoordinador] = useState(""); //QUEDAN LOS PERMISOS
    const [cerrarAsignatura, setCerrarAsignatura] = useState(false);
    let quiensoy = useCacheCall("Asignatura", "senderMsg");
    
    return (
        <>
            <h2>Página Home de la Asignatura</h2>
            <section>
            <p>La dirección del <b>sender</b> es: {quiensoy}</p>
            <p>La dirección del <b>owner</b> es: {direccion_owner}</p>
            <p>La dirección del <b>coordinador</b> es: {direccion_coordinador}</p>
            <p>La asignatura está: <b>{estadoAsignatura ? "cerrada" : "abierta"}</b></p>
            </section>

            <SoyOwner>
                <section className="form">
                <form>
                    <p>
                        <b>Introduce una nueva dirección de coordinador: &nbsp; </b>
                        <input key = "coordinador" value = {nuevoCoordinador} placeholder = "Nueva dirección" type = "text" name = "coordinador" onChange = {ev => setNuevoCoordinador(ev.target.value)}></input>
                        <button onClick={
                            ev => {
                                let nuevo_coordinador = drizzle.contracts.Asignatura.methods.setCoordinador.cacheSend(nuevoCoordinador);
                                setNuevoCoordinador(nuevo_coordinador);
                            }
                        }>Enviar</button>
                    </p>
                </form>
                </section>
            </SoyOwner>
            <p><br/></p>
            <SoyCoordinador>
                <p>Pulse para cerrar la asignatura:</p>
                <button onClick= {
                    ev => {
                        if(estadoAsignatura === false){
                            drizzle.contracts.Asignatura.methods.cerrar.cacheSend();
                            setCerrarAsignatura(true);

                        }
                    }
                }>Cerrar Asignatura</button>
            </SoyCoordinador>
        </>
        
    );
}

export default HomePage;
