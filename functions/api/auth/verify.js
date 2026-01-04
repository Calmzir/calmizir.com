import { jwt } from '../../utils/auth';

export async function onRequestGet(context) {
    const cookieHeader = context.request.headers.get("Cookie");
    const token = cookieHeader?.match(/auth_token=([^;]+)/)?.[1];
    const JWT_SECRET = context.env.JWT_SECRET || "default-dev-secret-CHANGE-ME";

    if (!token) {
        return Response.json({ authenticated: false }, { status: 401 });
    }

    const payload = await jwt.verify(token, JWT_SECRET);
    if (!payload) {
        return Response.json({ authenticated: false }, { status: 401 });
    }

    return Response.json({ authenticated: true, user: payload });
}
