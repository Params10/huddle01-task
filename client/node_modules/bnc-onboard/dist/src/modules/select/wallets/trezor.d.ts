import { TrezorOptions, WalletModule } from '../../../interfaces';
declare function trezor(options: TrezorOptions & {
    networkId: number;
}): WalletModule;
export default trezor;
