import { Initialization, WalletCheckModule, WalletModule, ConfigOptions, WalletCheckModal, WalletInterface, WalletInitOptions } from './interfaces';
export declare function validateType(options: {
    name: string;
    value: any;
    type: string;
    optional?: boolean;
}): never | void;
export declare function validateInit(init: Initialization): never | void;
export declare function isWalletModule(obj: any): obj is WalletModule;
export declare function isWalletInit(obj: any): obj is WalletInitOptions;
export declare function validateWallet(obj: WalletModule | WalletInitOptions): never | void;
export declare function isWalletCheckModule(obj: any): obj is WalletCheckModule;
export declare function validateWalletCheckModule(module: WalletCheckModule): void;
export declare function validateConfig(configuration: ConfigOptions): never | void;
export declare function validateModal(modal: WalletCheckModal): never | void;
export declare function validateWalletInterface(walletInterface: WalletInterface): never | void;
export declare function validateWalletInit(walletInit: WalletInitOptions): void | never;
