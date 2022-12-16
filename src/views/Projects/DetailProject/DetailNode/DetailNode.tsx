import { NavigateNext } from '@mui/icons-material';
import { Box, Breadcrumbs, Chip, Grid, Skeleton, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { BoxWrapper } from 'src/common/BoxWrapper';
import CreateValidator from './CreateValidator/CreateValidator';
import Delegate from './Delegate/Delegate';
import { useEffect, useState } from 'react';
import { IDataNodeDetail } from 'src/api/nodes/type';
import useNotifier from 'src/hooks/useNotifier';
import { nodeService } from 'src/api/nodes/nodeService';
import ChipNodeStatus from 'src/common/ChipNodeStatus';
import { useAppDispatch } from 'src/redux-toolkit/stores';
import { useWalletSlice } from 'src/redux-toolkit/slice/walletSilce/walletSlice';

export default function DetailNode() {
    const { projectId, nodeId } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const {
        state: { address, chainConnectedInfo },
    } = useWalletSlice();
    const [data, setData] = useState<IDataNodeDetail>({} as IDataNodeDetail);
    const notifier = useNotifier();
    const { notifyError } = notifier;
    const dispatch = useAppDispatch();
    const {
        action: { setChainConnectedInfo, connectWallet },
    } = useWalletSlice();

    async function getNode(): Promise<boolean> {
        try {
            const response = await nodeService.getNode(nodeId || '');
            setData(response);
            if (response.chainInfo) {
                if (chainConnectedInfo.chainId != response.chainInfo.chainId || !address) {
                    //TODO: set chain info will connected with client
                    dispatch(setChainConnectedInfo(response.chainInfo));
                    return true;
                }
            }
            return false;
        } catch (err) {
            console.log(err);
            notifyError((err as Error).message || '');
            return false;
        }
    }

    useEffect(() => {
        (async () => {
            const willConnectWallet = await getNode();
            setLoading(false);

            if (willConnectWallet) {
                //TODO: create client
                dispatch(connectWallet({ notifier: notifier }));
            }
        })();
        return () => {};
    }, []);

    return (
        <Box>
            <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
                <Link to={'/projects'} style={{ textDecoration: 'none' }}>
                    <Typography color="text.secondary">Projects</Typography>
                </Link>
                <Link to={`/projects/${projectId}`} style={{ textDecoration: 'none' }}>
                    {loading ? <Skeleton variant="text" animation="wave" width={150} height={22} /> : <Typography color="text.secondary">{data.project?.name || '---'}</Typography>}
                </Link>

                {loading ? <Skeleton variant="text" animation="wave" width={150} height={22} /> : <Typography color="text.primary">{data.nodeName || '---'}</Typography>}
            </Breadcrumbs>

            <BoxWrapper sx={{ mt: 2, bgcolor: 'background.paper', boxShadow: 3 }}>
                <Typography variant="body1" color="text.secondary" sx={{ mr: 1 }}>
                    Detail node
                </Typography>
                <Box sx={{ display: 'flex', placeItems: 'center', flexWrap: 'wrap' }}>
                    {loading ? (
                        <Skeleton variant="rounded" animation="wave" width={120} height={35} sx={{ mr: 1 }} />
                    ) : (
                        <Typography variant="h3" sx={{ mr: 1 }}>
                            {data.nodeName || '---'}
                        </Typography>
                    )}
                    <ChipNodeStatus status={data.status} />

                    <Typography variant="body1" sx={{ marginLeft: 'auto' }}>
                        <Box component={'span'} sx={{ color: 'text.secondary', mr: 1 }}>
                            Created at:
                        </Box>
                        {loading ? (
                            <Skeleton sx={{ display: 'inline-block', mt: 1 }} variant="rounded" animation="wave" width={73} height={22} />
                        ) : (
                            <b>{data.createdAt ? new Date(data.createdAt).toLocaleDateString() : '---'}</b>
                        )}
                    </Typography>
                </Box>
                <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <Box>
                                <Typography variant="body1" color={'text.secondary'}>
                                    Network
                                </Typography>
                                {loading ? (
                                    <Skeleton variant="rounded" animation="wave" width={120} height={24} sx={{ mt: 1 }} />
                                ) : (
                                    <Typography variant="h5" color={'text.primary'} sx={{ mt: 1 }}>
                                        {data.network}
                                    </Typography>
                                )}
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={3} sx={{ borderLeft: { xs: 'none', xsm: '1px solid' }, borderColor: { xsm: 'divider' } }}>
                            <Box>
                                <Typography variant="body1" color={'text.secondary'}>
                                    Mode
                                </Typography>
                                {loading ? (
                                    <Skeleton variant="rounded" animation="wave" width={120} height={24} sx={{ mt: 1 }} />
                                ) : (
                                    <Typography variant="h5" color={'text.primary'} sx={{ mt: 1 }}>
                                        {data.mode}
                                    </Typography>
                                )}
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={3} sx={{ borderLeft: '1px solid', borderColor: 'divider' }}>
                            <Box>
                                <Typography variant="body1" color={'text.secondary'}>
                                    Hosting
                                </Typography>
                                {loading ? (
                                    <Skeleton variant="rounded" animation="wave" width={120} height={24} sx={{ mt: 1 }} />
                                ) : (
                                    <Typography variant="h5" color={'text.primary'} sx={{ mt: 1 }}>
                                        {data.cloudProvider?.name}
                                    </Typography>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </BoxWrapper>
            {loading ? (
                <>
                    <Skeleton variant="rounded" animation="wave" height={300} width="100%" sx={{ mt: 3 }} />
                </>
            ) : (
                <>
                    {data.canCreateValidator ? <CreateValidator nodeId={nodeId || ''} nodeName={data.nodeName} nodePublicKey={data.publicKey} updateData={getNode} /> : null}
                    {data.syncing ? <div>Node is syncing! This process take a long time!</div> : null}
                    {data.validator ? <Delegate data={data} /> : null}
                </>
            )}
        </Box>
    );
}
