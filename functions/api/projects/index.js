export async function onRequestGet(context) {
    try {
        const { results } = await context.env.DB.prepare(
            "SELECT * FROM projects ORDER BY date DESC"
        ).all();

        return Response.json(results);
    } catch (e) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}

export async function onRequestPost(context) {
    // Simple protection: check for a header secret (optional, for now open or basic auth)
    // For standard portfolio updates, you'd likely run this locally or protect via Cloudflare Access.

    try {
        const { title, description, thumbnail, project_url, date, images } = await context.request.json();

        // Insert Project
        const { meta } = await context.env.DB.prepare(
            "INSERT INTO projects (title, description, thumbnail, project_url, date) VALUES (?, ?, ?, ?, ?) RETURNING id"
        ).bind(title, description, thumbnail, project_url, date).run();

        const projectId = meta.last_row_id;

        // Insert Images if any
        if (images && images.length > 0) {
            const stmt = context.env.DB.prepare("INSERT INTO images (project_id, url) VALUES (?, ?)");
            const batch = images.map(url => stmt.bind(projectId, url));
            await context.env.DB.batch(batch);
        }

        return Response.json({ success: true, id: projectId }, { status: 201 });
    } catch (e) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}
