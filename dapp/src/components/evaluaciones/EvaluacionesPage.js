import EvaluacionesList from "./EvaluacionesList";
import {drizzleReactHooks} from '@drizzle/react-plugin'
import {useState} from "react";
import SoyCoordinador from '../roles/SoyCoordinador';

const {useDrizzle} = drizzleReactHooks;

function EvaluacionesPage() {
    const {drizzle} = useDrizzle();
    let nombreEvaluacion = "";
    let fechaEvaluacion = "";
    let porcentajeEvaluacion = "";
    let minimoEvaluacion = "";

    const [actualiza, setActualiza] = useState(true); //QUEDAN LOS PERMISOS

    let n_nombreEvaluacion = "";
    let n_fechaEvaluacion = "";
    let n_porcentajeEvaluacion = "";
    let n_minimoEvaluacion = "";
    let posicion = -1;

    return (
    <>
        <SoyCoordinador>
        <section className="AppEvaluaciones">
            <h2>Evaluaciones</h2>

            <EvaluacionesList/>
        </section>
        <form>
                <input placeholder = "Introduce el nombre de la evaluación" type = "text"  onChange = {ev => nombreEvaluacion = ev.target.value}></input>
                <input placeholder = "Introduce la fecha de la evaluación" type = "number"  onChange = {ev => fechaEvaluacion = ev.target.value}></input>
                <input placeholder = "Introduce el porcentaje de la evaluación" type = "number"  onChange = {ev => porcentajeEvaluacion = ev.target.value}></input>
                <input placeholder = "Introduce la nota mínima de la evaluación" type = "number"  onChange = {ev => minimoEvaluacion = ev.target.value}></input>

                <button onClick={
                    ev => {
                        drizzle.contracts.Asignatura.methods.creaEvaluacion.cacheSend(nombreEvaluacion,fechaEvaluacion,porcentajeEvaluacion,minimoEvaluacion);
                        setActualiza(!actualiza);
                    }
                }>Añadir</button>
            </form>

        <p>Edita una evaluación</p>
        <form>
                <input placeholder = "Id de la evaluación" type = "number"  onChange = {ev => posicion = ev.target.value}></input>
                <input placeholder = "Introduce el nombre de la evaluación" type = "text"  onChange = {ev => n_nombreEvaluacion = ev.target.value}></input>
                <input placeholder = "Introduce la fecha de la evaluación" type = "number"  onChange = {ev => n_fechaEvaluacion = ev.target.value}></input>
                <input placeholder = "Introduce el porcentaje de la evaluación" type = "number"  onChange = {ev => n_porcentajeEvaluacion = ev.target.value}></input>
                <input placeholder = "Introduce la nota mínima de la evaluación" type = "number"  onChange = {ev => n_minimoEvaluacion = ev.target.value}></input>

                <button onClick={
                    ev => {
                        drizzle.contracts.Asignatura.methods.cambiarEvaluacion.cacheSend(posicion,n_nombreEvaluacion,n_fechaEvaluacion,n_porcentajeEvaluacion,n_minimoEvaluacion);
                        setActualiza(!actualiza);
                    }
                }>Añadir</button>
            </form>
            </SoyCoordinador>
    </>
)};

export default EvaluacionesPage;
