export async function onRequestGet(context) {
    const id = context.params.id;

    try {
        // Fetch Project
        const project = await context.env.DB.prepare(
            "SELECT * FROM projects WHERE id = ?"
        ).bind(id).first();

        if (!project) {
            return Response.json({ error: "Project not found" }, { status: 404 });
        }

        // Fetch Images
        const { results: images } = await context.env.DB.prepare(
            "SELECT url FROM images WHERE project_id = ?"
        ).bind(id).all();

        // Combine
        const fullProject = {
            ...project,
            images: images.map(img => img.url)
        };

        return Response.json(fullProject);
    } catch (e) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}

export async function onRequestPut(context) {
    const id = context.params.id;

    // Check Auth
    const cookieHeader = context.request.headers.get("Cookie");
    const token = cookieHeader?.match(/auth_token=([^;]+)/)?.[1];
    if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { title, description, description_es, thumbnail, project_url, date, images } = await context.request.json();

        const statements = [
            // 1. Update Project Details
            context.env.DB.prepare(
                "UPDATE projects SET title = ?, description = ?, description_es = ?, thumbnail = ?, project_url = ?, date = ? WHERE id = ?"
            ).bind(title || 'Untitled', description || '', description_es || '', thumbnail || '', project_url || '#', date || new Date().toISOString(), id),

            // 2. Delete Old Images
            context.env.DB.prepare("DELETE FROM images WHERE project_id = ?").bind(id)
        ];

        // 3. Insert New Images
        if (images && Array.isArray(images)) {
            for (const imgUrl of images) {
                statements.push(
                    context.env.DB.prepare("INSERT INTO images (project_id, url) VALUES (?, ?)").bind(id, imgUrl)
                );
            }
        }

        await context.env.DB.batch(statements);

        return Response.json({ success: true });
    } catch (e) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}

export async function onRequestDelete(context) {
    const id = context.params.id;

    // Check Auth (Simplified)
    const cookieHeader = context.request.headers.get("Cookie");
    const token = cookieHeader?.match(/auth_token=([^;]+)/)?.[1];
    if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });

    try {
        await context.env.DB.prepare("DELETE FROM images WHERE project_id = ?").bind(id).run();
        await context.env.DB.prepare("DELETE FROM projects WHERE id = ?").bind(id).run();

        return Response.json({ success: true });
    } catch (e) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}
