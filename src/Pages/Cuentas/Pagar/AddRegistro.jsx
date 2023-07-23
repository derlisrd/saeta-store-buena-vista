import {Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, TextField} from '@mui/material'
import { usePagar } from './Provider';
import NumberFormatCustom from '../../../Components/thirty/NumberFormatCustom';
import { useState } from 'react';
import { APICALLER } from '../../../Services/api';
import { useLogin } from '../../../Contexts/LoginProvider';
import swal from 'sweetalert';

function AddRegistro() {
    const {dialogs,setDialogs,getLista} = usePagar()
    const {userData} = useLogin()
    const {token_user} = userData
    const [error,setError] = useState({active:false,message:''})
    const [loading,setLoading] = useState(false)
    const initialForm ={
        descripcion_registro:'',
        valor_determinado:0
    }
    const [form,setForm] = useState(initialForm)
    const change = e=>{
        const {value,name} = e.target;
        setForm({...form,[name]:value})
    }

    const enviar = async()=>{
        if(form.descripcion_registro===''){
            setError({active:true,message:'Complete la descripcion.'})
            return false;
        }
        if(parseFloat(form.valor_determinado)<0){
            setError({active:true,message:'Complete el valor correctamente.'})
            return false;
        }
        setError({active:false,message:''})
        setLoading(true)
        let res = await APICALLER.insert({table:'cuentas_registros',data:form, token:token_user})
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
                    <TextField label='Descripcion' fullWidth onChange={change} value={form.descripcion_registro} name='descripcion_registro'  />
                </Grid>
                <Grid item xs={12}>
                    <TextField label='Valor determinado' fullWidth onChange={change} value={form.valor_determinado} name='valor_determinado'  
                    
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