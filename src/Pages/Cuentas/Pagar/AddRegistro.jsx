import {Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, TextField} from '@mui/material'
import { usePagar } from './Provider';
import NumberFormatCustom from '../../../Components/thirty/NumberFormatCustom';
import { useState } from 'react';
import { APICALLER } from '../../../Services/api';
import { useLogin } from '../../../Contexts/LoginProvider';
import swal from 'sweetalert';
import { funciones } from '../../../Functions';

function AddRegistro() {
    const {dialogs,setDialogs,getLista} = usePagar()
    const {userData} = useLogin()
    const {token_user} = userData
    const [error,setError] = useState({active:false,message:''})
    const [loading,setLoading] = useState(false)
    const initialForm ={
        descripcion_cuenta:'',
        valor_cuenta:0,
        fecha_registro: funciones.getFechaHorarioString()
    }
    const [form,setForm] = useState(initialForm)
    const change = e=>{
        const {value,name} = e.target;
        setForm({...form,[name]:value})
    }
    const enviar = async()=>{   
        setError({active:false,message:''})
        setLoading(true)
        let res = await APICALLER.insert({table:'cuentas',data:form, token:token_user})
        if(res.response){
            close()
            swal({title:'Agregado', text:'Agregado correctamente', timer:1300});
            getLista()
        }else{
            console.log(res);
        }
        setLoading(false)
    }

    const close = () => {
      setDialogs({ ...dialogs, registro: false });
      setForm(initialForm);
    };

    return (<Dialog open={dialogs.registro} onClose={close} fullWidth>
        <DialogTitle>Agregar registro</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                
                <Grid item xs={12}>
                    {loading && <LinearProgress />}
                    {error.active && <Alert severity='error' icon={false}>{error.message}</Alert>}
                </Grid>
                <Grid item xs={12}>
                    <TextField label='Descripcion' fullWidth onChange={change} value={form.descripcion_cuenta} name='descripcion_cuenta'  />
                </Grid>
                <Grid item xs={12}>
                    <TextField label='Valor' fullWidth onChange={change} value={form.valor_cuenta} name='valor_cuenta'  
                    InputProps={{
                        inputComponent: NumberFormatCustom,
                        inputProps: { min: 0 },
                      }} 
                    />
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant='contained' onClick={enviar}>Agregar</Button>
            <Button variant='outlined' onClick={close}>Cancelar</Button>
        </DialogActions>
    </Dialog>  );
}

export default AddRegistro;