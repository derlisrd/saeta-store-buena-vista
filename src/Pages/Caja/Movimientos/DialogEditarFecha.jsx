import {Dialog,DialogActions,DialogTitle,DialogContent,Button, Grid, TextField, LinearProgress} from '@mui/material'
import { useMovimientos } from './MovimientosProvider'
import {useState,useEffect} from 'react'
import { APICALLER } from '../../../Services/api'
import { useLogin } from '../../../Contexts/LoginProvider'
import swal from 'sweetalert'

function DialogEditarFecha() {
    const [selectForm,setSelectForm] = useState({fecha_movimiento:'',detalles_movimiento:''})
    const {userData} = useLogin()
    const { token_user } = userData;
    const {dialog,setDialog,form,getData} = useMovimientos()
    const [loading,setLoading] = useState(false)
    const close = ()=> { 
        setDialog({...dialog,editarFecha:false})
    }
    const change = e=>{
        const {name,value} = e.target
        setSelectForm({...selectForm, [name]:value})
    }
    const confirmar = async()=>{
        console.log(selectForm);
        setLoading(true)
        let res = await APICALLER.update({table:'cajas_movimientos',
        data:{fecha_movimiento:selectForm.fecha_movimiento,detalles_movimiento:selectForm.detalles_movimiento},
        id: form.id_cajas_movimiento,token:token_user
        });
        if(res.response){
            swal({
                text:'Modificado!',
                icon:'success',
                timer:1300
            })
        }else{
            console.log(res);
        }
        close();
        setLoading(false)
        getData()
    }
    useEffect(()=>{
        if(dialog.editarFecha){
            setSelectForm(form)
        }

    },[form,dialog])


    return (<Dialog onClose={close} open={dialog.editarFecha} fullWidth >
        <DialogTitle>Modificar Fecha de movimiento</DialogTitle>
        <DialogContent dividers>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {
                        loading && <LinearProgress />
                    }
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="Detalles" onChange={change} name='detalles_movimiento' value={selectForm.detalles_movimiento} />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Fecha" name='fecha_movimiento' onChange={change} value={selectForm.fecha_movimiento} type='datetime-local' />
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant='contained' onClick={confirmar}>Confirmar</Button>
            <Button variant='outlined' onClick={close}>Cerrar</Button>
        </DialogActions>
    </Dialog>);
}

export default DialogEditarFecha;