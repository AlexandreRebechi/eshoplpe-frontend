import { useState, useEffect } from 'react';
import CategoriaContext from './CategoriaContext';
import {
    getCategoriaServico, getCategoriaServicoPorCodigoAPI,
    deleteCategoriaServico, cadastraCategoriaServico
} from '../../../servicos/CategoriaServico';
import Tabela from './Tabela';
import Form from './Form';
import WithAuth from '../../../seguranca/WithAuth';
import { useNavigate } from 'react-router-dom/dist';

function Categoria() {

    let navigate = useNavigate(); 

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: ""
    })
    const [carregando, setCarregando] = useState(true);
    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: 0,
            nome: ""
        });
    }

    const editarObjeto = async codigo => {
        setObjeto(await getCategoriaServicoPorCodigoAPI(codigo))
        setEditar(true);
        setAlerta({ status: "", message: "" });
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraCategoriaServico(objeto, metodo);
            setAlerta({ 
                status: retornoAPI.status, 
                message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperaCategorias();
    }

    const recuperaCategorias = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getCategoriaServico());
            setCarregando(false);

        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }

    }

    const remover = async codigo => {
        try {
            if (window.confirm('Deseja remover este objeto?')) {
                let retornoAPI = await deleteCategoriaServico(codigo);
                setAlerta({ 
                    status: retornoAPI.status, 
                    message: retornoAPI.message })
                recuperaCategorias();
            }
        } catch (error) {
            window.location.reload();
            navigate("/login", { replace: true });

        }
    }
   

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    
    useEffect(() => {
        recuperaCategorias();
    }, []);

    return (
        <>
            <CategoriaContext.Provider value={
                {
                    alerta, setAlerta,
                    listaObjetos,
                    remover,
                    objeto,
                    editar,
                    acaoCadastrar,
                    handleChange, novoObjeto, editarObjeto
                }
            }>
                <Tabela />
                <Form />
            </CategoriaContext.Provider>
        </>
    );
}

export default WithAuth(Categoria);