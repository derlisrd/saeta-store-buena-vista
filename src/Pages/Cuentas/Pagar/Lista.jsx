import { Button, Divider, Grid, Stack } from "@mui/material";
import Tablas from "../../../Components/UI/Tablas";
import { usePagar } from "./Provider";
import { columns } from "./columns";
import { DatePickerCustom } from "../../../Components/MuiCustom/DatePickerCustom";
import { funciones } from "../../../Functions";
import { useState } from "react";

function Lista() {

    const {loading,listas, dialogs,setDialogs,setSelectForm,getLista} = usePagar()

    const today = funciones.fechaActualYMD();
    const [desde, setDesde] = useState(today);
    const [hasta, setHasta] = useState(today);

    const changeDatadesde = (e) => setDesde(e)
    const changeDatahasta = (e) => setHasta(e);

    const filtrar = ()=>{
      getLista(funciones.getDateYMD( desde ), funciones.getDateYMD( hasta ));  
    }

    const openRegistro = ()=>{setDialogs({...dialogs,registro:true})}
    const openPagar = (val)=>{ setSelectForm(val); setDialogs({...dialogs,pagar:true})}
    const inputs = (
      <Grid container spacing={{ xs:1, md:2 }}>
        <Grid item xs={12}>
        <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={1}
            divider={<Divider orientation="vertical" flexItem />}
          >
          <Button variant="contained" onClick={openRegistro}>
            AGREGAR
          </Button>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={1}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <DatePickerCustom
              fullWidth
              label="Desde"
              value={desde}
              defaultValue={desde}
              onChange={changeDatadesde}
              name="desde"
            />
            <DatePickerCustom
              fullWidth
              value={hasta}
              label="hasta"
              onChange={changeDatahasta}
              name="hasta"
              defaultValue={hasta}
            />
            <Button variant="contained" onClick={filtrar}>
              FILTRAR POR FECHA
            </Button>
          </Stack>
        </Grid>
      </Grid>
    );

    const Accions = ({rowProps})=>(
        <Stack direction='row' spacing={1}>
          <Button variant="contained" disabled={rowProps.pagado_estado==='1'} onClick={()=>{openPagar(rowProps)}} >{rowProps.pagado_estado==='1' ? 'PAGADO': 'PAGAR'}</Button>
        </Stack>
    )

    return (<Tablas 
        title="Cuentas a pagar"
        subtitle="Modulo de cuentas a pagar"
        icon={{ name:'paid' }}
        loading={loading}
        datas={listas.cuentas}
        columns={columns}
        Accions={Accions}
        inputs={inputs}
        showOptions
    />);
}

export default Lista;