import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle} = drizzleReactHooks;

function ProfesorRow({profesorIndex}){
    const {useCacheCall} = useDrizzle();

    const addr = useCacheCall("Asignatura", "profesores", profesorIndex) || "cargando...";
    const nombreProfesor =useCacheCall("Asignatura", "datosProfesor", addr) || "cargando...";

    return <tr key={"PROF-" + profesorIndex}>
        <th>P<sub>{profesorIndex}</sub></th>
        <td>{nombreProfesor}</td>
    </tr>;
};

export default ProfesorRow;
