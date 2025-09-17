export async function GET() {
  const roll = Math.floor(Math.random() * 6) + 1
  return Response.json({ roll })
}