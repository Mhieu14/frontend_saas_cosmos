import { BASE_VALIDATOR_SERVICE } from '../BASE_API';

export const url = {
    createNode: `${BASE_VALIDATOR_SERVICE}/nodes`,
    getNode: (nodeId: string) => `${BASE_VALIDATOR_SERVICE}/nodes/${nodeId}`,
    createValidator: (nodeId: string) => `${BASE_VALIDATOR_SERVICE}/nodes/${nodeId}/add_validator`,
};
