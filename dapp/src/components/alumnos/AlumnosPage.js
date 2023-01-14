import AlumnosList from "./AlumnosList";
import {drizzleReactHooks} from '@drizzle/react-plugin'
import {useState} from "react";
import SoyOwner from "../roles/SoyOwner";
import SoyCoordinador from '../roles/SoyCoordinador';
import SoyProfesor from '../roles/SoyProfesor';

const {useDrizzle} = drizzleReactHooks;

function AlumnosPage() {

    const [actualiza, setActualiza] = useState(true);
    const {drizzle} = useDrizzle();
    let addr = "";
    let nombre = "";
    let dni = "";
    let email = "";

    return(
    <section className="AppAlumnos">
        <h2>Alumnos</h2>
        <SoyOwner><AlumnosList/></SoyOwner>
        <SoyCoordinador><AlumnosList/></SoyCoordinador>
        <SoyProfesor><AlumnosList/></SoyProfesor>

        <p><br/></p>
        <p><b>Matricularme como alumno:</b></p>
        <form>
            <p>
                Introduce el nombre: &nbsp;
                <input placeholder = "Nombre" type = "text"  onChange = {ev => nombre = ev.target.value}></input>
                <script>{console.log(nombre)}</script>
            </p>
            <p>
                Introduce el DNI: &nbsp;
                <input placeholder = "DNI" type = "text"  onChange = {ev => dni = ev.target.value}></input>
            </p>
            <p>
                Introduce el email: &nbsp;
                <input placeholder = "email" type = "text"  onChange = {ev => email = ev.target.value}></input>
            </p>
            <button onClick={
                ev => {
                    drizzle.contracts.Asignatura.methods.automatricula.cacheSend(nombre,dni,email);
                    setActualiza(!actualiza);
                }
            }>Matricular</button>
        </form>

        <SoyOwner>
        <p><br/></p>
        <p><b>Matricular a un alumno:</b></p>
        <form>
            <p>
                Introduce la dirección del alumno: &nbsp;
                <input placeholder = "Direccion Ethereum" type = "text"  onChange = {ev => addr = ev.target.value}></input>
            </p>
            <p>
                Intruduce el nombre: &nbsp;
                <input placeholder = "Nombre" type = "text"  onChange = {ev => nombre = ev.target.value}></input>
            </p>
            <p>
                Introduce el DNI: &nbsp;
                <input placeholder = "DNI" type = "text"  onChange = {ev => dni = ev.target.value}></input>
            </p>
            <p>
                Intruduce el email: &nbsp;
                <input placeholder = "email" type = "text"  onChange = {ev => email = ev.target.value}></input>
            </p>

            <button onClick={
                ev => {
                    drizzle.contracts.Asignatura.methods.matricular.cacheSend(addr,nombre,dni,email);
                    setActualiza(!actualiza);
                }
            }>Matricular</button>
        </form>
        </SoyOwner>
    </section>
    );
};

export default AlumnosPage;
