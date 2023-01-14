import MisDatos from "./MisDatos";
import MisNotas from "./MisNotas";
import SoyOwner from "../roles/SoyOwner";
import SoyCoordinador from '../roles/SoyCoordinador';
import SoyProfesor from '../roles/SoyProfesor';
import SoyAlumno from '../roles/SoyAlumno';

const MisCosasPage = () => {

    return <section className="AppMisCosas">
        <h2>Mis Cosas</h2>
        <SoyOwner>
            <p>Mi rol es: <b>Owner</b></p>
        </SoyOwner>
        <SoyCoordinador>
            <p>Mi rol es: <b>Coordinador</b></p>
        </SoyCoordinador>
        <SoyProfesor>
            <p>Mi rol es: <b>Profesor</b></p>
        </SoyProfesor>
        <SoyAlumno>
            <p>Mi rol es: <b>Alumno</b></p>
        </SoyAlumno>
        <MisDatos/>
        <MisNotas/>
    </section>;
}

export default MisCosasPage;

