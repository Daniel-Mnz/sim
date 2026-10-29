import { NextResponse } from "next/server";
import { getContatos, setContatos } from "@/lib/db";

export async function DELETE(request, { params }) {
    const { id } = await params;
    setContatos(getContatos().filter((c) => c.id !== Number(id)));
    return NextResponse.json({ ok: true });
}