import "./RegistroUsuario.css";

function RegistroUsuario() {
  return (
    <div className="modal-registro">
      <h2>📄 Registro de Usuario</h2>

      <div className="campo">
        <label>Nombre Completo</label>
        <input type="text" placeholder="Ingrese nombre" />
      </div>

      <div className="campo">
        <label>Correo Institucional</label>
        <input type="email" placeholder="@sena.edu.co" />
      </div>

      <div className="fila">
        <div className="campo">
          <label>Ficha SENA</label>
          <input type="text" />
        </div>

        <div className="campo">
          <label>Rol</label>
          <select>
            <option>Aprendiz</option>
            <option>Administrador</option>
          </select>
        </div>
      </div>

      <div className="campo">
        <label>Contraseña Segura</label>
        <input type="password" />
      </div>

      <div className="botones">
        <button className="cancelar">Cancelar</button>
        <button className="crear">Crear Cuenta</button>
      </div>
    </div>
  );
}

export default RegistroUsuario;