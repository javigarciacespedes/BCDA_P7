import CalificacionesHead from "./CalificacionesHead";
import CalificacionesBody from "./CalificacionesBody";

const CalificacionesPage = ({indexEval}) => {

    return (
        <section className="AppCalificaciones">
            <h3>Calificaciones por Evaluación</h3>
            <table>
                <CalificacionesHead indexEval={indexEval}/>
                <CalificacionesBody indexEval={indexEval}/>
            </table>
        </section>
    );
};

export default CalificacionesPage;
