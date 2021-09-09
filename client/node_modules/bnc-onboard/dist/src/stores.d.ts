import { WritableStore, ReadableStore, WalletInterfaceStore, WalletStateSliceStore, BalanceStore, CancelablePromise } from './interfaces';
export declare const app: WritableStore;
export declare const stateSyncStatus: {
    [key: string]: null | CancelablePromise | Promise<Array<string>> | Promise<string> | Promise<void>;
    balance: null | CancelablePromise;
    address: null | Promise<Array<string>>;
    network: null | Promise<string>;
};
export declare let address: WalletStateSliceStore;
export declare let network: WalletStateSliceStore;
export declare let balance: BalanceStore | WalletStateSliceStore;
export declare let wallet: WritableStore;
export declare let state: ReadableStore;
export declare let walletInterface: WalletInterfaceStore;
export declare function initializeStores(): void;
export declare function resetWalletState(options?: {
    disconnected: boolean;
    walletName: string;
}): void;
