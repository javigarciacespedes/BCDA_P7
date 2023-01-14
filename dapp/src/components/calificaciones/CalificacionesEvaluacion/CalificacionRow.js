import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle} = drizzleReactHooks;

const CalificacionRow = ({alumnoIndex, indexEval}) => {
    const {useCacheCall} = useDrizzle();

    const alumnoAddr = useCacheCall("Asignatura", "matriculas", alumnoIndex);

    let alumnoName = useCacheCall(['Asignatura'],
        call => alumnoAddr && call("Asignatura", "datosAlumno", alumnoAddr)?.nombre
    );

    let cells = useCacheCall(['Asignatura'], call => {
        if (!alumnoAddr) { return []; }

        let cells = [];
        const nota = call("Asignatura", "calificaciones", alumnoAddr, indexEval);
        cells.push(
            <td key={"p2-" + alumnoIndex}>
                {nota?.tipo === "0" ? "" : ""}
                {nota?.tipo === "1" ? "N.P." : ""}
                {nota?.tipo === "2" ? (nota?.calificacion / 100).toFixed(2) : ""}
            </td>
        );
        
        return cells;
    });

    return <tr key={"d" + alumnoIndex}>
            <th>A<sub>{alumnoIndex}</sub></th>
            <td>{alumnoName}</td>
            {cells}
        </tr>;
};

export default CalificacionRow;
