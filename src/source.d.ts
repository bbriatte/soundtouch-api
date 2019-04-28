import { SourceStatus } from './special-types';
import { XMLElement } from './utils/xml-element';
export interface Sources {
    readonly deviceId: string;
    readonly items: Source[];
}
export interface Source {
    readonly name: string;
    readonly source: string;
    readonly sourceAccount?: string;
    readonly status: SourceStatus;
    readonly isLocal: boolean;
    readonly isMultiroomAllowed: boolean;
}
export declare function sourcesFromElement(element: XMLElement): Sources | undefined;
export declare function sourceFromElement(element: XMLElement): Source | undefined;
