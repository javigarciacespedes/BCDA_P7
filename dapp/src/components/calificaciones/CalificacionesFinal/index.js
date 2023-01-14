import CalificacionesHead from "./CalificacionesHead";
import CalificacionesBody from "./CalificacionesBody";

const CalificacionesPage = ({indexEval}) => {

    return (
        <section className="AppCalificaciones">
            <h3>Calificaciones Finales</h3>
            <table>
                <CalificacionesHead/>
                <CalificacionesBody/>
            </table>
        </section>
    );
};

export default CalificacionesPage;
