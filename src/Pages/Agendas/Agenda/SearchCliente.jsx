import { CircularProgress, Autocomplete, TextField } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import { APICALLER } from "../../../Services/api";
import { useAgenda } from "./AgendaProvider";


const SearchCliente = () => {
  const { dialogs, setDialogs, setCliente } = useAgenda();
  const [listaClientes, setListaClientes] = useState([]);
  const [load, setLoad] = useState(false);
  const [search, setSearch] = useState("");
  const inputBuscaCliente = useRef(null);
  const cerrar = () => setDialogs({ ...dialogs, buscarCliente: false });

  const insertClient = (e, value) => {
    setCliente({
      active: true,
      doc: value.ruc_cliente,
      nombre: value.nombre_cliente,
      id_cliente_agenda: value.id_cliente,
      telefono_cliente: value.telefono_cliente,
    });
    cerrar();
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoad(true);
      let res = await APICALLER.get({
        table: "clientes",
        filtersSearch: search,
        filtersField: "nombre_cliente,ruc_cliente",
        pagesize: "10",
      });
      res.response ? setListaClientes(res.results) : console.log(res);
      setLoad(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <Autocomplete
      loading={load}
      loadingText="Cargando..."
      noOptionsText="No hay clientes con ese nombre"
      onChange={insertClient}
      disableClearable
      options={listaClientes}
      getOptionLabel={(option) =>
        option.nombre_cliente + " " + option.ruc_cliente
      }
      fullWidth
      renderInput={(params) => (
        <TextField
          {...params}
          autoFocus
          label="Buscar cliente"
          inputRef={inputBuscaCliente}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {load ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          fullWidth
          placeholder="Escriba el nombre del cliente"
          variant="outlined"
        />
      )}
    />
  );
};

export default SearchCliente;
