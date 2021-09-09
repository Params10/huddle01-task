import { WalletModule, CommonWalletOptions } from '../../../interfaces';
declare function metamask(options: CommonWalletOptions & {
    isMobile: boolean;
}): WalletModule;
export default metamask;
