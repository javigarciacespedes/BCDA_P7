import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle} = drizzleReactHooks;

const SoyCoordinador = ({children}) => {
    const {useCacheCall} = useDrizzle();

    let quiensoy = useCacheCall("Asignatura", "senderMsg");
    let coordinador = useCacheCall("Asignatura", "coordinador");

    if (coordinador !== quiensoy) {
        return null
    }
    return <>
        {children}
    </>

};

export default SoyCoordinador;
