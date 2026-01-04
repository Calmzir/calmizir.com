// Project Data Service (Connected into Cloudflare D1 via Pages Functions)


export const projectService = {
    async login(username, password) {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            if (!response.ok) throw new Error('Login failed');
            return await response.json();
        } catch (e) {
            console.error("Auth Error:", e);
            throw e;
        }
    },

    async verify() {
        try {
            const response = await fetch('/api/auth/verify');
            return response.ok;
        } catch (e) {
            return false;
        }
    },

    async logout() {
        await fetch('/api/auth/logout', { method: 'POST' });
    },

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
    },

    async create(project) {
        const response = await fetch('/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project)
        });
        if (!response.ok) throw new Error('Failed to create project');
        return await response.json();
    },

    async update(id, project) {
        const response = await fetch(`/api/projects/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project)
        });
        if (!response.ok) throw new Error('Failed to update project');
        return await response.json();
    },

    async delete(id) {
        const response = await fetch(`/api/projects/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete project');
        return await response.json();
    }
};

