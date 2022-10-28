import React from 'react';
import { useWalletContext } from 'src/contexts/wallet-context/wallet-context';

type Props = {};

export default function Header({}: Props) {
    const { address } = useWalletContext();
    return <div>address: {address}</div>;
}
