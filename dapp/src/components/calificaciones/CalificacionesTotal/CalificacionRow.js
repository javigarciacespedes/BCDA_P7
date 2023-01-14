import {drizzleReactHooks} from '@drizzle/react-plugin'
import {useState} from "react";
import SoyProfesor from '../../roles/SoyProfesor';

const {useDrizzle} = drizzleReactHooks;

const CalificacionRow = ({alumnoIndex}) => {
    const {useCacheCall} = useDrizzle();
    const {drizzle} = useDrizzle();
    const [editTipo, setEditTipo] = useState(0);
    const [editNota, setEditNota] = useState(0);

    const alumnoAddr = useCacheCall("Asignatura", "matriculas", alumnoIndex);

    let alumnoName = useCacheCall(['Asignatura'],
        call => alumnoAddr && call("Asignatura", "datosAlumno", alumnoAddr)?.nombre
    );

    let cells = useCacheCall(['Asignatura'], call => {
        if (!alumnoAddr) { return []; }

        let cells = [];
        const evaluacionesLength = call("Asignatura", "evaluacionesLength") || 0;
        for (let ei = 0; ei < evaluacionesLength; ei++) {
            const nota = call("Asignatura", "calificaciones", alumnoAddr, ei);
            cells.push(
                <td key={"p2-" + alumnoIndex + "-" + ei}>
                    {nota?.tipo === "0" ? "" : ""}
                    {nota?.tipo === "1" ? "N.P." : ""}
                    {nota?.tipo === "2" ? (nota?.calificacion / 100).toFixed(2) : ""}
                </td>
            );
        }
    
        for (let ei = 0; ei < evaluacionesLength; ei++) {
            cells.push(
                <SoyProfesor>
                <td key={"element-" + alumnoIndex + "-" + ei}>
                    <div key={"div1-" + alumnoIndex + "-" + ei}>
                    <input className="input-edit" placeholder = "Tipo" type = "number" min = "0" max = "2"  onChange = {ev => setEditTipo(ev.target.value)}></input>
                    <script>console.log(editTipo);</script>
                    </div>
                    <div key={"div2-" + alumnoIndex + "-" + ei}>
                    <input className="input-edit" placeholder = "Nota" type = "number" min = "0" max = "1000" onChange = {ev => setEditNota(ev.target.value)}></input>
                    </div>
                    <button onClick={
                    ev => {
                        drizzle.contracts.Asignatura.methods.califica.cacheSend(alumnoAddr, ei, editTipo, editNota);
                        setEditTipo(editTipo);
                        setEditNota(editNota);
                    }
                    }>Enviar</button>
                </td>
                </SoyProfesor>
                
            );
        }
        return cells;
    });

    return <tr key={"d" + alumnoIndex}>
            <th>A<sub>{alumnoIndex}</sub></th>
            <td>{alumnoName}</td>
            {cells}
        </tr>;
};

export default CalificacionRow;
