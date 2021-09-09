import type { KeepKeyHDWallet } from '@shapeshiftoss/hdwallet-keepkey';
export declare enum ModalType {
    Pin = 0,
    Passphrase = 1
}
export declare const renderModal: (wallet: KeepKeyHDWallet, modalType: ModalType) => void;
