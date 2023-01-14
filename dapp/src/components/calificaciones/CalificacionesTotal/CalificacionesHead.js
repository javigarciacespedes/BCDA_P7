import {drizzleReactHooks} from '@drizzle/react-plugin'
import SoyProfesor from '../../roles/SoyProfesor';

const {useDrizzle} = drizzleReactHooks;

const CalificacionesHead = () => {
    const {useCacheCall} = useDrizzle();

    let thead = [];
    thead.push(<th key={"chae"}>A-E</th>);
    thead.push(<th key={"chn"}>Nombre</th>);

    const el = useCacheCall("Asignatura", "evaluacionesLength") || 0;
    for (let i = 0; i < el; i++) {
        thead.push(<th key={"chev-" + i}>E<sub>{i}</sub></th>);
    }
    for (let i = 0; i < el; i++) {
        thead.push(
        <SoyProfesor>
            <th key={"editLabel-" + i}>Editar E<sub>{i}</sub></th>
        </SoyProfesor>
        );
    }

    return( <thead><tr>{thead}</tr></thead>);
};

export default CalificacionesHead;
