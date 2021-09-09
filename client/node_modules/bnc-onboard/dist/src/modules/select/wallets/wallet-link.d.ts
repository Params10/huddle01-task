import { WalletLinkOptions, WalletModule } from '../../../interfaces';
declare function walletLink(options: WalletLinkOptions & {
    networkId: number;
}): WalletModule;
export default walletLink;
