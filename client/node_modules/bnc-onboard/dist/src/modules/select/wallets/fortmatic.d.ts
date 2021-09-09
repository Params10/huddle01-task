import { SdkWalletOptions, WalletModule } from '../../../interfaces';
declare function fortmatic(options: SdkWalletOptions & {
    networkId: number;
    rpcUrl: string;
}): WalletModule;
export default fortmatic;
