import { getToken } from "../seguranca/Autenticacao";

export const getProdutoServico = async () => {
    const response = 
    await fetch(`${process.env.REACT_APP_ENDERECO_API}/produto`,
    {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "authorization" : getToken()
        }
    });
    const data = await response.json();
    return data;
}

export const getProdutoServicoPorCodigoAPI = async codigo => {
    const response = 
    await fetch(`${process.env.REACT_APP_ENDERECO_API}/produto/${codigo}`,
    {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "authorization" : getToken()
        }
    });
    const data = await response.json();
    return data;
}

export const deleteProdutoServico = async codigo => {
    const response = 
    await fetch(`${process.env.REACT_APP_ENDERECO_API}/produto/${codigo}`,
    {
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json",
            "authorization" : getToken()
        }
    });
    const data = await response.json();
    return data;
}


export const cadastraProdutoServico = async (objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/produto`, {
        method: metodo,
        headers: { "Content-Type": "application/json",
        "authorization" : getToken() },
        body: JSON.stringify(objeto),
    })
    const data = await response.json();
    return data;
}