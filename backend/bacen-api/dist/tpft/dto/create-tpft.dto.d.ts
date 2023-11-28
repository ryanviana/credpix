export declare class CreateTpftDto {
    readonly name: string;
    readonly address: string;
    readonly balance: number;
    readonly value: {
        initial: number;
        final: number;
        current: number;
    };
    readonly assetType: string;
}
