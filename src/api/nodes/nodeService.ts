import { callApiNodes } from './callApi';
import { IDataNodeDetail } from './type';

export const nodeService = {
    getNode: async (nodeId: string): Promise<IDataNodeDetail> => {
        const response = await callApiNodes.getNode(nodeId);
        console.log('getNode', response.data);
        const node = response.data.data.node;
        return {
            nodeId: node.node_id,
            nodeName: node.moniker,
            network: node.network,
            address: node.address,
            message: node.message,
            status: node.status,
            syncing: node.syncing,
            publicKey: node.public_key,
            createdAt: node.created_at,
            canCreateValidator: node.can_create_validator,
            chainInfo: node.chain_info,
            mode: node.validator ? 'Validator' : 'Full Node',
            project: {
                projectId: node.project.project_id,
                createdAt: node.project.created_at,
                name: node.project.name,
                totalNodes: node.project.total_nodes,
                status: node.project.status,
            },
            cloudProvider: {
                id: node.cloud_provider.id,
                name: node.cloud_provider.name,
            },
            operatorAddress: node.validator_info?.operator_address || '',
            validator: node.validator
                ? {
                      validatorAddress: node.validator.validator_address,
                      totalDelegated: node.validator_info.tokens,
                      commission: {
                          maxChangeRate: node.validator_info.commission.commission_rates.max_change_rate,
                          maxRate: node.validator_info.commission.commission_rates.max_rate,
                          rate: node.validator_info.commission.commission_rates.rate,
                      },
                  }
                : null,
        };
    },
};
