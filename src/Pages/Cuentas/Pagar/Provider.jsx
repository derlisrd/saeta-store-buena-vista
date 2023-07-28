import { createContext,useState,useEffect,useCallback,useContext } from "react";
import { APICALLER } from "../../../Services/api";
import { funciones } from "../../../Functions";

const Contexto = createContext(null)

function PagarProvider({children}) {
    const [loading,setLoading] = useState(true);
    const [dialogs,setDialogs] = useState({pagar:false,registro:false})
    const [selectForm,setSelectForm] = useState({})
    const [listas,setListas] = useState({
        registros:[],
        cuentas:[],
        cajas:[]
    })
    
    const getLista = useCallback(async (desde=null,hasta=null,detalles='') => {
        let whereFilter = '';

        if(desde && hasta){
            whereFilter = `fecha_registro,between,'${desde} 00:00:00',and,'${hasta} 23:59:59'`;
        }else{
            let firstday = funciones.getFirstDayYMD();
            let today = funciones.getDateYMD(new Date());
            whereFilter = `fecha_registro,between,'${firstday} 00:00:00',and,'${today} 23:59:59'`;
        }

        setLoading(true)
        let [cuentas,registros,cajas] = await Promise.all([
            APICALLER.get({table:'cuentas',filtersField:'descripcion_cuenta',filtersSearch:`${detalles}`,where:whereFilter}),
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
    const values = {selectForm,setSelectForm,loading,listas,getLista,dialogs,setDialogs}

    return <Contexto.Provider value={values}>{children}</Contexto.Provider> ;
}

export function usePagar(){
    const {selectForm,setSelectForm,loading,listas,getLista,dialogs,setDialogs} = useContext(Contexto)
    return {selectForm,setSelectForm,loading,listas,getLista,dialogs,setDialogs}
}

export default PagarProvider;