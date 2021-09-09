import { LatticeOptions, WalletModule } from '../../../interfaces';
declare function cobovault(options: LatticeOptions & {
    networkId: number;
}): WalletModule;
export default cobovault;
