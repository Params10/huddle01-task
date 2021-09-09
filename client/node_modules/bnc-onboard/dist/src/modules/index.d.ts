import { WalletCheckModule, WalletCheckInit, WalletSelectModuleOptions } from '../interfaces';
export default function initializeModules(networkId: number, walletSelectOptions: WalletSelectModuleOptions | undefined, walletCheck: Array<WalletCheckModule | WalletCheckInit> | undefined, isMobile: boolean): {
    walletSelect: {
        heading: string;
        description: string;
        wallets: Promise<any[]>;
        explanation: string;
        agreement: import("../interfaces").TermsOfServiceAgreementOptions | undefined;
    };
    walletCheck: Promise<WalletCheckModule[]>;
};
