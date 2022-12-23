import { DataSaverOnOutlined, KeyboardDoubleArrowUp, NavigateNext } from '@mui/icons-material';
import { Box, Breadcrumbs, Button, Chip, Grid, Skeleton, Tooltip, Typography } from '@mui/material';
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
import { imagePath } from 'src/constants/ImagePath';
import { useModalContext } from 'src/contexts/modal-context';
import ModalDelegate from './Delegate/ModalDelegate';
import LineData from 'src/common/LineData';
import { formatDate } from 'src/utils/format';

export default function DetailNode() {
    const { projectId, nodeId } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const { address, chainConnectedInfo } = useWalletSlice().state;
    const [data, setData] = useState<IDataNodeDetail>({} as IDataNodeDetail);
    const notifier = useNotifier();
    const { openModal } = useModalContext();
    const { notifyError } = notifier;
    const dispatch = useAppDispatch();
    const { setChainConnectedInfo, connectWallet } = useWalletSlice().action;

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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
                    <Link to={'/projects'} style={{ textDecoration: 'none' }}>
                        <Typography color="text.secondary">Projects</Typography>
                    </Link>
                    <Link to={`/projects/${projectId}`} style={{ textDecoration: 'none' }}>
                        {loading ? <Skeleton variant="text" animation="wave" width={150} height={22} /> : <Typography color="text.secondary">{data.project?.name || '---'}</Typography>}
                    </Link>

                    {loading ? <Skeleton variant="text" animation="wave" width={150} height={22} /> : <Typography color="text.primary">{data.nodeName || '---'}</Typography>}
                </Breadcrumbs>
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
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap' }}>
                <Box>
                    {loading ? (
                        <Skeleton variant="rounded" animation="wave" width={120} height={35} sx={{ mb: 1 }} />
                    ) : (
                        <Typography variant="h3" sx={{ mb: 1 }}>
                            {data.nodeName || '---'}
                        </Typography>
                    )}
                    <Box sx={{ mb: 1 }}>
                        <ChipNodeStatus status={data.status} sx={{ mr: 1 }} />
                        <Chip variant="filled" color={data.mode === 'Full Node' ? 'secondary' : 'info'} label={data.mode || 'Loading...'} size="small" sx={{ mr: 1 }} />
                        <Tooltip title="Cloud Provider" placement="right">
                            <Chip size="small" label={data.cloudProvider?.name || 'Loading...'} />
                        </Tooltip>
                    </Box>
                </Box>
                {data.canCreateValidator ? (
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ color: 'white', marginLeft: 'auto' }}
                        startIcon={<KeyboardDoubleArrowUp />}
                        onClick={() => openModal('Upgrade to validator', <CreateValidator nodeId={nodeId || ''} nodeName={data.nodeName} nodePublicKey={data.publicKey} updateData={getNode} />)}
                    >
                        Upgrade
                    </Button>
                ) : null}
                {data.validator ? (
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ color: 'white', marginLeft: 'auto' }}
                        startIcon={<DataSaverOnOutlined />}
                        onClick={() => openModal('Delegate', <ModalDelegate />)}
                    >
                        Delegate
                    </Button>
                ) : null}
            </Box>
            {data.validator ? <Delegate data={data} /> : null}
            <Box sx={{ mt: 2 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} xsm={6} lg={4}>
                        <BoxWrapper sx={{ bgcolor: 'background.paper', boxShadow: 3 }}>
                            <Typography variant="h4" color={'text.primary'} sx={{ mb: 2 }}>
                                Network
                            </Typography>
                            {loading ? (
                                <Skeleton variant="rounded" animation="wave" width={'100%'} height={124} sx={{ mt: 1 }} />
                            ) : (
                                <Box>
                                    <LineData title="Name:" sx={{ mt: 1.5 }} value={data.chainStakeInfo.name} />
                                    <LineData title="Bonded Tokens:" sx={{ mt: 1.5 }} value={`${data.chainStakeInfo.tokenBonded} / ${data.chainStakeInfo.totalToken}`} />
                                    <LineData title="Staking APR:" sx={{ mt: 1.5 }} value={`${data.chainStakeInfo.apr}`} />
                                    <LineData title="Token price:" sx={{ mt: 1.5 }} value={`$${data.chainStakeInfo.price}`} />
                                </Box>
                            )}
                        </BoxWrapper>
                    </Grid>
                    <Grid item xs={12} xsm={6} lg={4}>
                        {loading ? (
                            <Skeleton variant="rounded" animation="wave" width={'100%'} height={'100%'} sx={{ mt: 1, minHeight: '135px' }} />
                        ) : (
                            <>
                                {data.status == 'CREATED' ? (
                                    <>
                                        <BoxWrapper sx={{ bgcolor: 'background.paper', boxShadow: 3 }}>
                                            <Typography variant="h4" color={'text.primary'} sx={{ mb: 2 }}>
                                                Monitoring
                                            </Typography>
                                            <Box>
                                                <LineData title="CPU:" sx={{ mt: 1.5 }} value={`${data.monitoring.cpuPercentage}%`} />
                                                <LineData title="RAM:" sx={{ mt: 1.5 }} value={`${data.monitoring.ramPercentage}%`} />
                                                <LineData title="Cores:" sx={{ mt: 1.5 }} value={`${data.monitoring.cpuCount}`} />
                                                <LineData title="Total ram:" sx={{ mt: 1.5 }} value={`${data.monitoring.ramTotal}`} />
                                            </Box>
                                        </BoxWrapper>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </>
                        )}
                    </Grid>
                    <Grid item xs={12} xsm={6} lg={4}>
                        {loading ? (
                            <Skeleton variant="rounded" animation="wave" width={'100%'} height={'100%'} sx={{ mt: 1, minHeight: '135px' }} />
                        ) : (
                            <>
                                {data.status == 'CREATED' ? (
                                    <>
                                        <BoxWrapper sx={{ bgcolor: 'background.paper', boxShadow: 3, height: '100%' }}>
                                            <Typography variant="h4" color={'text.primary'} sx={{ mb: 2 }}>
                                                Endpoint
                                            </Typography>
                                            <Box>
                                                <LineData title="LCD:" sx={{ mt: 1.5 }} value={`${data.endpoint.lcd}`} />
                                                <LineData title="RPC:" sx={{ mt: 1.5 }} value={`${data.endpoint.rpc}`} />
                                            </Box>
                                        </BoxWrapper>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </>
                        )}
                    </Grid>
                    <Grid item xs={12} xsm={6} lg={4}>
                        {loading ? (
                            <Skeleton variant="rounded" animation="wave" width={'100%'} height={'100%'} sx={{ mt: 1, minHeight: '135px' }} />
                        ) : (
                            <>
                                {data.status == 'CREATED' ? (
                                    <>
                                        <BoxWrapper sx={{ bgcolor: 'background.paper', boxShadow: 3, height: '100%' }}>
                                            <Typography variant="h4" color={'text.primary'} sx={{ mb: 2 }}>
                                                Sync
                                            </Typography>
                                            <Box>
                                                <LineData title="Status:" sx={{ mt: 1.5 }} value={`Synced`} />
                                                <LineData title="Lastest Height:" sx={{ mt: 1.5 }} value={`${data.syncInfo.lastestHeight}`} />
                                                <LineData title="Lastest Time:" sx={{ mt: 1.5 }} value={`${formatDate(data.syncInfo.lastestTime, 'hh:mm b, d/M/yyyy')}`} />
                                                <LineData title="Earliest Height:" sx={{ mt: 1.5 }} value={`${data.syncInfo.earliestHeight}`} />
                                                <LineData title="Earliest Time:" sx={{ mt: 1.5 }} value={`${formatDate(data.syncInfo.earliestTime, 'hh:mm b, d/M/yyyy')}`} />
                                            </Box>
                                        </BoxWrapper>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </>
                        )}
                    </Grid>
                </Grid>
            </Box>

            {loading ? (
                <>
                    <Skeleton variant="rounded" animation="wave" height={300} width="100%" sx={{ mt: 3 }} />
                </>
            ) : (
                <>
                    {data.syncing ? (
                        <BoxWrapper sx={{ bgcolor: 'background.paper', mt: 3, boxShadow: 3, textAlign: 'center' }}>
                            <img src={imagePath.DATA_SYNC} alt="Node is syncing" style={{ margin: '24px auto', display: 'block', width: '300px' }} />
                            Node is syncing! This process take a long time!
                        </BoxWrapper>
                    ) : null}
                </>
            )}
        </Box>
    );
}
