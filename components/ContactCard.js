import { memo } from "react";

function ContactCard({ id, nome, email, telefone, onRemover }) {
    console.log("Renderizou:", nome); // para você ver no console quando ele redesenha

    return (
        <div className="card">
            <h2>{nome}</h2>
            <p>{email}</p>
            <p className="telefone">{telefone}</p>
            <button className="btn-remover" onClick={() => onRemover(id)}>
                Remover
            </button>
        </div>
    );
}

export default memo(ContactCard);