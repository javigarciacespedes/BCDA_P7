import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle} = drizzleReactHooks;

const SoyAlumno = ({children}) => {
    const {useCacheCall} = useDrizzle();

    const matriculasLength = useCacheCall("Asignatura", "matriculasLength") || 0 ;
    let quiensoy = useCacheCall("Asignatura", "senderMsg");

    let matriculadosList = useCacheCall(['Asignatura'], cacheCall => {
        let auxList = [];
        for (let i = 0; i<matriculasLength; i++) {
            const alumno = cacheCall("Asignatura", "matriculas", i);
            auxList.push(alumno);
        }
        return auxList;
    });

    if (!matriculadosList.includes(quiensoy)) {
        return null
    }
    return <>
        {children}
    </>

};

export default SoyAlumno;
