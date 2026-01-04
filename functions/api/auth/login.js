import { jwt } from '../../utils/auth';

export async function onRequestPost(context) {
    try {
        const { username, password } = await context.request.json();

        // Retrieve secret from environment or use a default for dev (WARNING: Change this in prod)
        const JWT_SECRET = context.env.JWT_SECRET || "default-dev-secret-CHANGE-ME";

        // Check against D1 'users' table
        // Assumes table 'users' exists with columns: id, username, password
        // Note: Password should be hashed in a real app. For this MVP, we might compare directly 
        // OR assuming the 'admin' user is manually inserted with a known password.

        const user = await context.env.DB.prepare(
            "SELECT * FROM users WHERE username = ? AND password = ?"
        ).bind(username, password).first();

        if (!user) {
            return Response.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Generate Token
        const token = await jwt.sign({ sub: user.id, username: user.username }, JWT_SECRET);

        // Set Cookie
        const headers = new Headers();
        headers.append("Set-Cookie", `auth_token=${token}; HttpOnly; Secure; Path=/; SameSite=Strict; Max-Age=86400`);

        return Response.json({ success: true, user: { username: user.username } }, { headers });
    } catch (e) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}
