import { WalletCheckModal, StateAndHelpers } from '../../interfaces';
declare function derivationPath(options?: {
    heading?: string;
    description?: string;
    icon?: string;
}): {
    (stateAndHelpers: StateAndHelpers): WalletCheckModal | undefined;
    reset: () => void;
};
export default derivationPath;
