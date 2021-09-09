import { SdkWalletOptions, WalletModule } from '../../../interfaces';
declare function portis(options: SdkWalletOptions & {
    networkId: number;
}): WalletModule;
export default portis;
