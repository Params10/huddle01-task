import { GnosisOptions, WalletModule } from '../../../interfaces';
/**
 * Checks to see if we are are within a Safe App context. If we are it executes
 * the callback function which self-selects this wallet.
 * @param selectWallet - A callback function which can call the `walletSelect` method
 * with the Gnosis wallet name.
 */
export declare const checkGnosisSafeContext: (selectWallet: () => void) => Promise<false | void>;
declare function gnosis(options: GnosisOptions): WalletModule;
export default gnosis;
