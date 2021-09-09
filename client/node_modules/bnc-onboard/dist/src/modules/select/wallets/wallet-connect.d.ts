import { WalletConnectOptions, WalletModule } from '../../../interfaces';
declare function walletConnect(options: WalletConnectOptions & {
    networkId: number;
}): WalletModule;
export default walletConnect;
