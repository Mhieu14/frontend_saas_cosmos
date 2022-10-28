import { AccountBalanceWallet } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useWalletContext } from 'src/contexts/wallet-context/wallet-context';
import { formatAddress } from 'src/utils/format';

export default function ConnectWalletBtn() {
    const { address, connectKeplrWallet } = useWalletContext();

    return (
        <Button variant="contained" onClick={() => connectKeplrWallet()}>
            {address ? formatAddress(address) : 'Connect Wallet'} <AccountBalanceWallet sx={{ ml: 1 }} />
        </Button>
    );
}
