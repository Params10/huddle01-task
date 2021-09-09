import { WalletCheckModal, StateAndHelpers, WalletCheckCustomOptions } from '../../interfaces';
declare function balance(options?: WalletCheckCustomOptions & {
    minimumBalance: string;
}): (currentState: StateAndHelpers) => Promise<WalletCheckModal | undefined>;
export default balance;
