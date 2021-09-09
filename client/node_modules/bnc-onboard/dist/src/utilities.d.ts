import bowser from 'bowser';
import { WalletInterface, Ens } from './interfaces';
export declare function getNetwork(provider: any): Promise<number | any>;
export declare function getAddress(provider: any): Promise<string | any>;
export declare function getEns(provider: any, address: string): Promise<Ens>;
export declare function getBalance(provider: any, address?: string): Promise<string | any>;
export declare function createModernProviderInterface(provider: any): WalletInterface;
export declare function createLegacyProviderInterface(provider: any): WalletInterface;
export declare function getProviderName(provider: any): string | undefined;
export declare function getDeviceInfo(): {
    isMobile: boolean;
    os: bowser.Parser.OSDetails;
    browser: bowser.Parser.Details;
};
export declare function networkName(id: number): string;
export declare function wait(time: number): Promise<unknown>;
export declare function makeCancelable(promise: any): any;
export declare function isPromise(val: any): val is Promise<any>;
export declare function createInterval(func: any, interval: number): {
    status: {
        active: boolean;
    };
    clear: () => void;
};
export declare function openLink(url: string): void;
