import CalificacionesTotal from "./CalificacionesTotal";
import CalificacionesEvaluacion from "./CalificacionesEvaluacion";
import CalificacionesAlumno from "./CalificacionesAlumno";
import CalificacionesFinal from "./CalificacionesFinal";
import Calificar from "./Calificar";
import SoyCoordinador from '../roles/SoyCoordinador';
import SoyProfesor from '../roles/SoyProfesor';
import SoyAlumno from '../roles/SoyAlumno';

import {useState} from "react";
import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle} = drizzleReactHooks;


const CalificacionesPage = () => {
    const [indexEval,setIndexEval]=useState(0);
    //const [selectAl,setSelectAl]=useState(0);
    const {useCacheCall} = useDrizzle();

    const matriculasLength = useCacheCall("Asignatura", "matriculasLength") || 0 ;
    let quiensoy = useCacheCall("Asignatura", "senderMsg") || "";
    let selectAl = -1;

    let matriculadosList = useCacheCall(['Asignatura'], cacheCall => {
        let auxList = [];
        for (let i = 0; i<matriculasLength; i++) {
            const alumno = cacheCall("Asignatura", "matriculas", i);
            auxList.push(alumno);
        }
        return auxList;
    });

    for (let i = 0; i<matriculasLength; i++) {
            if(matriculadosList[i]===quiensoy){
                selectAl=i;
            }
        }

    return (
        <section className="AppCalificaciones">
            <h2>Calificaciones</h2>
            <SoyProfesor>
                <section>
                <CalificacionesTotal/>
                <ul>
                    <li type="square">Posibles <b>tipos</b> de nota: <b>0</b> (Vacío), <b>1</b> (N.P.), <b>2</b> (Nota normal).</li>
                    <li type="square">Valor de <b>nota</b>: el <b>valor introducido</b> será <b>dividido por 100</b> (Para poner un 5 se debe poner un 500).</li>
                </ul>
                </section>
                
                <section>
                    <p><br/></p>
                    <CalificacionesEvaluacion indexEval={indexEval} />
                    <h4>Selecciona el índice de la evaluación a mostrar: &nbsp;
                    <input className="input-edit" key = "indexEval" value = {indexEval} placeholder = "Indice de la evaluacion" type = "number" min="0" name = "indexEval" onChange = {ev => setIndexEval(ev.target.value)}></input>
                    </h4>
                </section>
            </SoyProfesor>

            <SoyCoordinador>
                <section>
                <CalificacionesTotal/>
                <ul>
                    <li type="square">Posibles <b>tipos</b> de nota: <b>0</b> (Vacío), <b>1</b> (N.P.), <b>2</b> (Nota normal).</li>
                    <li type="square">Valor de <b>nota</b>: el <b>valor introducido</b> será <b>dividido por 100</b> (Para poner un 5 se debe poner un 500).</li>
                </ul>
                </section>
                
                <section>
                    <p><br/></p>
                    <CalificacionesEvaluacion indexEval={indexEval} />
                    <h4>Selecciona el índice de la evaluación a mostrar: &nbsp;
                    <input className="input-edit" key = "indexEval" value = {indexEval} placeholder = "Indice de la evaluacion" type = "number" min="0" name = "indexEval" onChange = {ev => setIndexEval(ev.target.value)}></input>
                    </h4>
                </section>
            </SoyCoordinador>

            <SoyCoordinador><CalificacionesFinal/></SoyCoordinador>
            <SoyProfesor><CalificacionesFinal/></SoyProfesor>

            <SoyAlumno>
            <section>
                <p><br/></p>
                <CalificacionesAlumno selectAl={selectAl} />
                {/* <input className="input-edit" key = "selectAl" value = {selectAl} placeholder = "Indice de la evaluacion" type = "number" min="0" name = "selectAl" onChange = {ev => setSelectAl(ev.target.value)}></input> */}
            </section>
            </SoyAlumno>
            <p><br/></p>

            <SoyProfesor>
                <Calificar/>
            </SoyProfesor>
        </section>
    );
};

export default CalificacionesPage;
