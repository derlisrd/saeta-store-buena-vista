import {Dialog,DialogActions,DialogTitle,DialogContent,Button} from '@mui/material'
import { useMovimientos } from './MovimientosProvider'
import {useState,useEffect} from 'react'

function DialogEditarFecha() {
    const [selectForm,setSelectForm] = useState({})
    const {dialog,setDialog,form} = useMovimientos()
    const close = ()=> { 
        setDialog({...dialog,editarFecha:false})
    }

    useEffect(()=>{
        if(dialog.editarFecha){
            setSelectForm(form)
        }

    },[form,dialog])


    return (<Dialog onClose={close} open={dialog.editarFecha} fullWidth >
        <DialogTitle></DialogTitle>
        <DialogContent>
            {
                JSON.stringify(selectForm)
            }
        </DialogContent>
        <DialogActions>
            <Button>Confirmar</Button>
            <Button>Cerrar</Button>
        </DialogActions>
    </Dialog>);
}

export default DialogEditarFecha;