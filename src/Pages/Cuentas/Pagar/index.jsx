import AddRegistro from "./AddRegistro";
import Lista from "./Lista";
import Pagar from "./Pagar";
import PagarProvider from "./Provider";

function CuentasPagar() {
    return (<PagarProvider>
        <Lista />
        <AddRegistro />
        <Pagar />
    </PagarProvider>);
}

export default CuentasPagar;