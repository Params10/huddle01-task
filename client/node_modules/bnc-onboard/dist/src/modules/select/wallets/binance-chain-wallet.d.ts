import { CommonWalletOptions, WalletModule } from '../../../interfaces';
declare function binanceChainWallet(options: CommonWalletOptions & {
    isMobile: boolean;
}): WalletModule;
export default binanceChainWallet;
