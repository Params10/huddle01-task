import { LedgerOptions, WalletModule } from '../../../interfaces';
declare function ledger(options: LedgerOptions & {
    networkId: number;
}): WalletModule;
export default ledger;
