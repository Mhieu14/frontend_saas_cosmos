import { createContext, useContext, useEffect, useState } from 'react';
import { FetchingStatus } from '../../constants/FetchingStatus';
import { BaseContextProps } from '../../global.config';

interface WalletContextData {
    status: FetchingStatus;
    isConnecting: boolean;
    address: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: any;
    // fetch: () => Promise<void>;
    connectKeplrWallet: () => Promise<void>;
}

const WalletContext = createContext({} as WalletContextData);

export function WalletProvider({ children }: BaseContextProps) {
    const [status, setStatus] = useState<FetchingStatus>(FetchingStatus.IDLE);
    const [error, setError] = useState<Error | undefined>();
    const [address, setAddress] = useState('');
    const [isConnecting, setConnecting] = useState(false);

    async function connectKeplrWallet() {
        setConnecting(true);
        if (!(await window.keplr)) {
            alert('You must install Keplr to continue');
            setConnecting(false);
            return;
        }

        const chainId = 'Oraichain-testnet';
        const offlineSigner = window.keplr?.getOfflineSigner(chainId);
        console.log('Hello');
        try {
            const accounts = await offlineSigner?.getAccounts();
            console.log(accounts);
            setAddress(accounts ? accounts[0].address : '');
        } catch (err) {
            console.log(err);
            setError(err as Error);
        }

        console.log('Success: Update Information');
        setConnecting(false);
    }
    useEffect(() => {
        // connectKeplrWallet();
    }, []);
    return (
        <WalletContext.Provider
            value={{
                status,
                error,
                isConnecting,
                address,
                connectKeplrWallet,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
}

export const useWalletContext = () => useContext(WalletContext);
