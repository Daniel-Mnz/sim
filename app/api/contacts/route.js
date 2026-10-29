import { NextResponse } from "next/server";
import { getContatos } from "@/lib/db";

export async function GET() {
    return NextResponse.json(getContatos());
}

export async function POST(request) {
    const body = await request.json();

    if (!body.nome || !body.nome.trim()) {
        return NextResponse.json({ erro: "Nome é obrigatório" }, { status: 400 });
    }

    const novo = {
        id: Date.now(),
        nome: body.nome,
        email: body.email || "",
        telefone: body.telefone || "",
    };

    getContatos().push(novo);
    return NextResponse.json(novo, { status: 201 });
}