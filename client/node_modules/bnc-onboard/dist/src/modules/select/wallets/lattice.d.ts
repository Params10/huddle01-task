import { LatticeOptions, WalletModule } from '../../../interfaces';
declare function lattice(options: LatticeOptions & {
    networkId: number;
}): WalletModule;
export default lattice;
