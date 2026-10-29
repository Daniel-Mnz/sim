"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export function useContatos() {
    const [contatos, setContatos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    // Busca os contatos uma única vez, quando o componente aparece
    useEffect(() => {
        async function carregar() {
            try {
                const { data } = await axios.get("/api/contacts");
                setContatos(data);
            } catch {
                setErro("Erro ao carregar contatos");
            } finally {
                setCarregando(false);
            }
        }
        carregar();
    }, []);

    const adicionar = useCallback(async (dados) => {
        const { data } = await axios.post("/api/contacts", dados);
        setContatos((anteriores) => [...anteriores, data]);
    }, []);

    const remover = useCallback(async (id) => {
        await axios.delete(`/api/contacts/${id}`);
        setContatos((anteriores) => anteriores.filter((c) => c.id !== id));
    }, []);

    return { contatos, carregando, erro, adicionar, remover };
}