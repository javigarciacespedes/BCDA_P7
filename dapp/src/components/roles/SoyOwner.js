import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle} = drizzleReactHooks;

const SoyOwner = ({children}) => {
    const {useCacheCall} = useDrizzle();

    let quiensoy = useCacheCall("Asignatura", "senderMsg");
    let owner = useCacheCall("Asignatura", "owner");

    if (owner !== quiensoy) {
        return null
    }
    return <>
        {children}
    </>

};

export default SoyOwner;
