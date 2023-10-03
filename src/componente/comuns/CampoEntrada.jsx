function CampoEntrada({ id, label, tipo, nome, value, handlechange, requerido, reaonly, texto }) {
    return (
        <div className="form-group">
        <label htmlFor="txtCodido" className="form-label">
            Código
        </label>
        <input
            type="text"
            readOnly
            className="form-control"
            id="txtCodido"
            name="codigo"
            value={objeto.codigo}
            onChange={handleChange}
        />
    </div>
    
    )
}