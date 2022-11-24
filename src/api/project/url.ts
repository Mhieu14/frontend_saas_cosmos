const BASE_VALIDATOR_SERVICE = process.env.REACT_APP_VALIDATOR_SERVICE;

export const url = {
    getListProjects: (page: number = 1, itemPerPage: number = 12) => {
        const offset = (page - 1) * itemPerPage;
        return `${BASE_VALIDATOR_SERVICE}/projects?offset=${offset}&limit=${itemPerPage}`;
    },
    createProject: `${BASE_VALIDATOR_SERVICE}/projects`,
    getProject: (projectId: string) => `${BASE_VALIDATOR_SERVICE}/projects/${projectId}`,
    deleteProject: (projectId: string) => `${BASE_VALIDATOR_SERVICE}/projects/${projectId}`,
};
