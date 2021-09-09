import { WalletCheckModule, WalletCheckInit } from '../../interfaces';
declare function check(walletChecks: Array<WalletCheckInit | WalletCheckModule> | undefined, networkId: number): Promise<WalletCheckModule[]>;
export default check;
