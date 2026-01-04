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
        // API returns array of strings for images to match frontend expectation
        const fullProject = {
            ...project,
            images: images.map(img => img.url)
        };

        return Response.json(fullProject);
    } catch (e) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}
