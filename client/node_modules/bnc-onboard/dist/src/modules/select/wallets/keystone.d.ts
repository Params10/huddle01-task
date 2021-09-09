import { KeystoneOptions, WalletModule } from '../../../interfaces';
declare function keystone(options: KeystoneOptions & {
    networkId: number;
}): WalletModule;
export default keystone;
