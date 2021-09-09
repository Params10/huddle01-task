import { CommonWalletOptions, WalletModule } from '../../../../interfaces';
declare function keepkey(options: CommonWalletOptions & {
    rpcUrl: string;
    networkId: number;
}): WalletModule;
export default keepkey;
