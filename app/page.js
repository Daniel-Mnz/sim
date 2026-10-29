"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import ContactCard from "@/components/ContactCard";
import { useContatos } from "@/hooks/useContatos";

export default function Home() {
  const { contatos, carregando, erro, adicionar, remover } = useContatos();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [busca, setBusca] = useState("");
  const nomeRef = useRef(null);

  useEffect(() => {
    nomeRef.current.focus();
  }, []);

  useEffect(() => {
    document.title = `Agenda (${contatos.length})`;
  }, [contatos]);

  const filtrados = useMemo(
    () =>
      contatos.filter((c) =>
        c.nome.toLowerCase().includes(busca.toLowerCase())
      ),
    [contatos, busca]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nome.trim()) return;

    await adicionar({ nome, email, telefone });

    setNome("");
    setEmail("");
    setTelefone("");
    nomeRef.current.focus();
  }

  return (
    <main className="container">
      <h1>Minha Agenda</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input
          ref={nomeRef}
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      <input
        placeholder="Buscar por nome..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {carregando && <p>Carregando contatos...</p>}
      {erro && <p className="erro">{erro}</p>}

      {filtrados.map((c) => (
        <ContactCard key={c.id} {...c} onRemover={remover} />
      ))}
    </main>
  );
}