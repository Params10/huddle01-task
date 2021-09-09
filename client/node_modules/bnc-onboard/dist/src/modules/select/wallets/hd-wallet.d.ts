export declare function generateAddresses(account: {
    publicKey: string;
    chainCode: string;
    path: string;
}, offset: number): {
    dPath: string;
    address: any;
}[];
export declare function isValidPath(path: string): boolean;
