export const columns = [
    {
        field:"id_cuenta",
        title:"#",
        style:{fontWeight:"bold"}
    },
    {
      field:"fecha_registro",
      title:"FECHA",
  },
    {
        field:"descripcion_cuenta",
        title:"DESCRIPCION",
    },
    {
        field:"valor_cuenta",
        title:"Valor",
        isNumber:true
    },
    {
        field:"pagado_estado",
        title:"ESTADO",
        compareField:"pagado_estado",
      items: {
        "0": "PENDIENTE...",
        "1": "PAGADO",
      },
      styleFieldCondition: "pagado_estado",
      styleCondition: {
        "0": {
          backgroundColor: "#ff7c6b",
          padding: "6px",fontWeight:"bold",
          borderRadius: "5px",
          color: "#780c00",
        },
        "1": {
          backgroundColor: "#2dec76",
          padding: "6px", fontWeight:"bold",
          borderRadius: "5px",
          color: "#007b02",
        },
      },
    },
]