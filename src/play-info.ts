export interface PlayInfo {
    readonly appKey: string;
    readonly url: string;
    readonly service: string;
    readonly reason?: string;
    readonly message?: string;
    readonly volume?: number;
}