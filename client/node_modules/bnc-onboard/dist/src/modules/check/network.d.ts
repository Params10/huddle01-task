import { WalletCheckModal, StateAndHelpers, WalletCheckCustomOptions } from '../../interfaces';
declare function network(options?: WalletCheckCustomOptions): (currentState: StateAndHelpers) => Promise<WalletCheckModal | undefined>;
export default network;
