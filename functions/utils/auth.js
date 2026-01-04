export const jwt = {
    async sign(payload, secret) {
        const encoder = new TextEncoder();
        const key = await crypto.subtle.importKey(
            "raw",
            encoder.encode(secret),
            { name: "HMAC", hash: "SHA-256" },
            false,
            ["sign"]
        );

        const header = { alg: "HS256", typ: "JWT" };
        const encodedHeader = btoa(JSON.stringify(header));
        const encodedPayload = btoa(JSON.stringify(payload));
        const data = encoder.encode(`${encodedHeader}.${encodedPayload}`);

        const signature = await crypto.subtle.sign("HMAC", key, data);
        const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
            .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

        return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
    },

    async verify(token, secret) {
        try {
            const [encodedHeader, encodedPayload, encodedSignature] = token.split('.');
            if (!encodedHeader || !encodedPayload || !encodedSignature) return null;

            const encoder = new TextEncoder();
            const key = await crypto.subtle.importKey(
                "raw",
                encoder.encode(secret),
                { name: "HMAC", hash: "SHA-256" },
                false,
                ["verify"]
            );

            const data = encoder.encode(`${encodedHeader}.${encodedPayload}`);
            const signature = Uint8Array.from(atob(encodedSignature.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));

            const valid = await crypto.subtle.verify("HMAC", key, signature, data);
            if (!valid) return null;

            return JSON.parse(atob(encodedPayload));
        } catch (e) {
            return null;
        }
    }
};
