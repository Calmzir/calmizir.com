export async function onRequestPost(context) {
    const headers = new Headers();
    // Clear cookie
    headers.append("Set-Cookie", `auth_token=; HttpOnly; Secure; Path=/; SameSite=Strict; Max-Age=0`);
    return Response.json({ success: true }, { headers });
}
