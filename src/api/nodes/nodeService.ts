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
            monitoring: {
                cpuCount: node.monitoring?.cpu_count || 0,
                cpuPercentage: node.monitoring?.cpu_percentage || 0,
                ramPercentage: node.monitoring?.ram_percentage || 0,
                ramTotal: node.monitoring?.ram_total || '---',
                ramUsed: node.monitoring?.ram_used || '---',
            },
            endpoint: {
                lcd: node.endpoint?.lcd || '---',
                rpc: node.endpoint?.rpc || '---',
            },
            chainStakeInfo: {
                apr: node.chain_stake_info?.apr || 0,
                name: node.chain_stake_info?.name || '---',
                price: node.chain_stake_info?.price || 0,
                tokenBonded: node.chain_stake_info?.tokens_bonded || 0,
                totalToken: node.chain_stake_info?.tokens_total || 0,
            },
            syncInfo: {
                earliestHeight: node.sync_info?.earliest_block_height || '---',
                earliestTime: node.sync_info?.earliest_block_time || '',
                lastestHeight: node.sync_info?.latest_block_height || '---',
                lastestTime: node.sync_info?.latest_block_time || '',
            },
            operatorAddress: node.validator_info?.operatorAddress || '',
            validator: node.validator
                ? {
                      apr: node.validator_info.apr,
                      denom: node.validator_info?.denom?.toUpperCase(),
                      validatorAddress: node.validator.validator_address,
                      totalDelegated: node.validator_info.tokens,
                      commission: {
                          maxChangeRate: node.validator_info.commissionMaxChangeRate || 0,
                          maxRate: node.validator_info.commissionMaxRate || 0,
                          rate: node.validator_info.commissionRate || 0,
                      },
                      price: node.validator_info?.price || 0,
                      uptime: node.validator_info?.uptime || 0,
                      selfBond: node.validator_info?.selfBond || 0,
                      totalBondedToken: node.validator_info?.totalBondedToken || 0,
                      totalNotBondedTokens: node.validator_info?.totalNotBondedTokens || 0,
                      votingPower: node.validator_info?.votingPower || 0,
                      votingPercentage: node.validator_info?.votingPercentage || 0,
                      jailed: node.validator_info?.jailed || false,
                  }
                : null,
        };
    },
    deleteNode: async (nodeId: string): Promise<any> => {
        const response = await callApiNodes.deteleNode(nodeId);
        console.log('deleteNode', response.data);
        return;
    }
};
