const g = globalThis;

if (!g.contatosDB) {
    g.contatosDB = [
        { id: 1, nome: "Ana Silva", email: "ana@email.com", telefone: "11 99999-0000" },
        { id: 2, nome: "Bruno Costa", email: "bruno@email.com", telefone: "11 98888-1111" },
    ];
}

export function getContatos() {
    return g.contatosDB;
}

export function setContatos(lista) {
    g.contatosDB = lista;
}