import {Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, LinearProgress, MenuItem, Select, TextField} from '@mui/material'
import { usePagar } from './Provider';
import NumberFormatCustom from '../../../Components/thirty/NumberFormatCustom';
import { useState } from 'react';
import { funciones } from '../../../Functions';
import { APICALLER } from '../../../Services/api';
import { useLogin } from '../../../Contexts/LoginProvider';
import swal from 'sweetalert';

function Pagar() {
    const {dialogs,setDialogs,getLista,listas,selectForm} = usePagar();
    const {userData} = useLogin()
    const {token_user,id_user} = userData
    const [error,setError] = useState({active:false,message:'',code:0})
    const [loading,setLoading] = useState(false)
    const initialForm = {
        caja_id_cuenta:'',
        cuenta_registro_id:'',
        valor_cuenta:0,
        detalles_cuenta:'',
        fecha_pago: funciones.fechaActualYMD()
    }
    const onChange = e=>{
        const {value,name} = e.target
        setForm({...form,[name]:value})
    }
    const [form,setForm] = useState(initialForm)

    const enviar = async()=>{
        
        if(form.caja_id_cuenta ===''){
            setError({active:true,message:'Seleccione caja',code:1})
            return false;
        }
       
        if(parseFloat(selectForm.valor_cuenta) > parseFloat(form.valor_cuenta)){
            setError({active:true,message:'El campo valor no alcanza el valor de la cuenta',code:2})
            return false;
        }
        setError({active:false,message:'',code:0})
        setLoading(true);
        
        
        let fecha_pago = form.fecha_pago +' '+funciones.getHorarioActualString();
        let dataMovimientos = {
            id_moneda_movimiento:1, //este es de 1 de guaranies
            id_caja_movimiento: form.caja_id_cuenta,
            id_user_movimiento: id_user,
            id_tipo_registro: 8, // este es el 8 de otros pagos
            monto_movimiento: form.valor_cuenta,
            monto_sin_efectivo:0,
            fecha_movimiento: fecha_pago,
            detalles_movimiento: `Pago de cuenta. ${selectForm.descripcion_cuenta}. ${form.detalles_cuenta}`
        }
        
         
        let dataCuenta = {
            pagado_estado:1
        }
        let [cuenta,movimiento] = await Promise.all([
            APICALLER.update({table:'cuentas',data:dataCuenta,token:token_user,id:selectForm.id_cuenta}),
            APICALLER.insert({table:'cajas_movimientos',data:dataMovimientos,token:token_user})
        ])
        if(cuenta.response && movimiento.response){
            swal({timer:1400, title:"Pagado", text:"Cuenta pagada correctamente."})
            getLista();
            close();
        }else{ console.log(cuenta,movimiento);} 

        setLoading(false)
    }
    const close = ()=>{ setDialogs({...dialogs,pagar:false}); setForm(initialForm)}

  return (
    <Dialog open={dialogs.pagar} onClose={close} fullWidth maxWidth="md">
      <DialogTitle>Pagar cuenta</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {loading && <LinearProgress />}
                {error.active && <Alert severity='error' icon={false}>{error.message}</Alert>}
            </Grid>
            <Grid item xs={12}>
                <h3>{selectForm?.descripcion_cuenta} | Valor: {funciones.numberFormat(selectForm?.valor_cuenta)}</h3>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                    <InputLabel>
                        Seleccionar caja
                    </InputLabel>
                    <Select
                        error={error.code===1}
                        name="caja_id_cuenta"
                        value={form.caja_id_cuenta}
                        onChange={onChange}
                    >
                        {listas.cajas.map((d, index) => (
                        <MenuItem key={index} value={d.id_caja}>
                            {d.nombre_caja}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <TextField label='Valor' fullWidth onChange={onChange} value={form.valor_cuenta} name='valor_cuenta' error={error.code===2}
                    InputProps={{
                        inputComponent: NumberFormatCustom,
                        inputProps: { min: 0 },
                      }} 
                    />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <TextField label="fecha" fullWidth onChange={onChange} value={form.fecha_pago} name='fecha_pago' type='date' />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <TextField label="Detalles" helperText="Escriba los detalles y observaciones" fullWidth onChange={onChange} value={form.detalles_cuenta} name='detalles_cuenta' />
            </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
            <Button variant='contained' onClick={enviar}>PAGAR</Button>
            <Button variant='outlined' onClick={close}>Cancelar</Button>        
      </DialogActions>
    </Dialog>
  );
}

export default Pagar;
