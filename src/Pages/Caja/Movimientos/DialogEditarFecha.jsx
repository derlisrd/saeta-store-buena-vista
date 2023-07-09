import {Dialog,DialogActions,DialogTitle,DialogContent,Button} from '@mui/material'

function DialogEditarFecha() {


    const close = ()=>{

    }

    return (<Dialog onClose={close} open={true} fullWidth >
        <DialogTitle></DialogTitle>
        <DialogContent>
            
        </DialogContent>
        <DialogActions>
            <Button>Confirmar</Button>
            <Button>Cerrar</Button>
        </DialogActions>
    </Dialog>);
}

export default DialogEditarFecha;