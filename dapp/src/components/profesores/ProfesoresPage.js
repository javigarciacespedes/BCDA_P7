import ProfesoresList from "./ProfesoresList";
import {drizzleReactHooks} from '@drizzle/react-plugin'
import {useState} from "react";
import SoyOwner from "../roles/SoyOwner";

const {useDrizzle} = drizzleReactHooks;

function ProfesoresPage() {

    const [actualiza, setActualiza] = useState(true); //QUEDAN LOS PERMISOS
    const {drizzle} = useDrizzle();
    let addr = "";
    let nombre = "";

    return(
    <section className="AppProfesores">
        <h2>Profesores</h2>

        <ProfesoresList/>

        <SoyOwner>
        <p><br/></p>
        <p><b>Matricular a un alumno:</b></p>
        <form>
            <p>
                Intruduce la dirección del profesor: &nbsp;
                <input placeholder = "Direccion Ethereum" type = "text"  onChange = {ev => addr = ev.target.value}></input>
            </p>
            <p>
                Intruduce el nombre: &nbsp;
                <input placeholder = "Nombre" type = "text"  onChange = {ev => nombre = ev.target.value}></input>
            </p>
            <button onClick={
                ev => {
                    drizzle.contracts.Asignatura.methods.addProfesor.cacheSend(addr,nombre);
                    setActualiza(!actualiza);
                }
            }>Matricular</button>
        </form>
        </SoyOwner>
    </section>
    );
};

export default ProfesoresPage;
