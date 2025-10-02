import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET() {
    const data = await db.query("SELECT * FROM cash")
    return Response.json(data.rows)
}

export async function POST(req:Request) {
    const body = await req.json()
    console.log(body)
    try {
const data = await db.query(
  "UPDATE cash SET amount = $1 WHERE id = $2 RETURNING *",
  [body.cash, 1]
);        
console.log(data)
    } catch(err) {
        return Response.json((err as Error).message)
    }
    return Response.json({message: "saved"})
}