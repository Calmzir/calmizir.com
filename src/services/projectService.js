// Project Data Service (Connected into Cloudflare D1 via Pages Functions)

export const projectService = {
    async getAll() {
        try {
            const response = await fetch('/api/projects');
            if (!response.ok) throw new Error('Failed to fetch projects');
            return await response.json();
        } catch (e) {
            console.error("API Error:", e);
            return []; // Fail gracefully
        }
    },

    async getById(id) {
        try {
            const response = await fetch(`/api/projects/${id}`);
            if (!response.ok) throw new Error('Failed to fetch project detail');
            return await response.json();
        } catch (e) {
            console.error("API Error:", e);
            return null;
        }
    }
};
