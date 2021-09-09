import { WalletModule, AuthereumOptions } from '../../../interfaces';
declare function authereum(options: AuthereumOptions & {
    networkId: number;
}): WalletModule;
export default authereum;
