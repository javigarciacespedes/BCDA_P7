
import ProfesoresHead from "./ProfesorHead";
import ProfesorBody from "./ProfesorBody";


const ProfesoresList = () => (
    <section className="AppProfesores">
        <h3>Todos los profesores</h3>
        <table>
            <ProfesoresHead/>
            <ProfesorBody/>
        </table>
    </section>
);

export default ProfesoresList;