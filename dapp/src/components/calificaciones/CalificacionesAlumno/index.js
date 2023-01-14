import CalificacionesHead from "./CalificacionesHead";
import CalificacionesBody from "./CalificacionesBody";

const CalificacionesPage = ({selectAl}) => {

    return (
        <section className="AppCalificaciones">
            <h3>Mis calificaciones de alumno</h3>
            <table>
                <CalificacionesHead selectAl={selectAl}/>
                <CalificacionesBody selectAl={selectAl}/>
            </table>
        </section>
    );
};

export default CalificacionesPage;
