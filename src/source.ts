import {SourceStatus} from './special-types';
import {XMLElement} from './utils/xml-element';

export interface Sources {
    readonly deviceId: string,
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

export function sourcesFromElement(element: XMLElement): Sources | undefined {
    if(!element.hasAttribute('deviceID')) {
        return undefined;
    }
    return {
        deviceId: element.getAttribute('deviceID'),
        items: element.getList('sourceItem').map(sourceFromElement)
    }
}

export function sourceFromElement(element: XMLElement): Source | undefined {
    if(!element.hasAttributes(['source', 'status'])) {
        return undefined;
    }
    return {
        source: element.getAttribute('source'),
        name: element.getText(),
        sourceAccount: element.getAttribute('sourceAccount'),
        status: element.getAttribute('status') as SourceStatus,
        isLocal: element.getAttribute('isLocal') === 'true',
        isMultiroomAllowed: element.getAttribute('multiroomallowed') === 'true'
    }
}