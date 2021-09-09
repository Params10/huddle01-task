import { TorusOptions, WalletModule } from '../../../interfaces';
declare function torus(options: TorusOptions & {
    networkId: number;
}): WalletModule;
export default torus;
