import { createContext,useState,useEffect,useCallback,useContext } from "react";
import { APICALLER } from "../../../Services/api";

const Contexto = createContext(null)

function PagarProvider({children}) {
    const [loading,setLoading] = useState(true);
    const [dialogs,setDialogs] = useState({pagar:false,registro:false})
    const [listas,setListas] = useState({
        registros:[],
        cuentas:[],
        cajas:[]
    })
    
    const getLista = useCallback(async () => {
        setLoading(true)
        let [cuentas,registros,cajas] = await Promise.all([
            APICALLER.get({table:'cuentas'}),
            APICALLER.get({table:'cuentas_registros'}),
            APICALLER.get({table:'cajas'})
        ])
        if(cuentas.response && registros.response){
            setListas({
                registros: registros.results,
                cuentas: cuentas.results,
                cajas:cajas.results
            })
        }else{
            console.log(cuentas,registros);
        }
        setLoading(false)
    },[])

    useEffect(() => {
        let isActive = true;
        const ca = new AbortController();
        if(isActive){getLista();}
        return ()=> {isActive = false;ca.abort();}
      }, [getLista]);
    const values = {loading,listas,getLista,dialogs,setDialogs}

    return <Contexto.Provider value={values}>{children}</Contexto.Provider> ;
}

export function usePagar(){
    const {loading,listas,getLista,dialogs,setDialogs} = useContext(Contexto)
    return {loading,listas,getLista,dialogs,setDialogs}
}

export default PagarProvider;