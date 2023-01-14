import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle} = drizzleReactHooks;

const SoyProfesor = ({children}) => {
    const {useCacheCall} = useDrizzle();

    const profesoresLength = useCacheCall("Asignatura", "profesoresLength") || 0 ;
    let quiensoy = useCacheCall("Asignatura", "senderMsg");

    let profesoresList = useCacheCall(['Asignatura'], cacheCall => {
        let auxList = [];
        for (let i = 0; i<profesoresLength; i++) {
            const profesor = cacheCall("Asignatura", "profesores", i); 
            auxList.push(profesor);
        }
        return auxList;
    });

    if (!profesoresList.includes(quiensoy)) {
        return null
    }
    return <>
        {children}
    </>

};

export default SoyProfesor;
