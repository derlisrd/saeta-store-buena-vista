import DialogDetallesMovimientos from './DialogDetallesMovimientos'
import DialogEditarFecha from './DialogEditarFecha'
import ListaMovimientos from './ListaMovimientos'
import MovimientosProvider from './MovimientosProvider'
import RegistrarMovimiento from './RegistrarMovimiento'

const Movimientos = () => {
  return (
    <MovimientosProvider>
      <DialogEditarFecha />
      <ListaMovimientos />
      <RegistrarMovimiento />
      <DialogDetallesMovimientos />
    </MovimientosProvider>
  )
}

export default Movimientos
