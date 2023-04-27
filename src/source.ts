import {SourceStatus} from './special-types';
import {compactMap, XMLElement} from './utils';

export interface Sources {
    readonly deviceId: string,
    readonly items: Source[];
}

export interface Source {
    readonly name: string;
    readonly source: string;
    readonly sourceAccount: string;
    readonly status: SourceStatus;
    readonly isLocal: boolean;
    readonly isMultiRoomAllowed: boolean;
}

export function sourcesFromElement(element: XMLElement): Sources | undefined {
    if(!element.hasAttribute('deviceID')) {
        return undefined;
    }
    const deviceId = element.getAttribute('deviceID');
    if(!deviceId) {
        return undefined;
    }
    return {
        deviceId,
        items: compactMap(element.getList('sourceItem'), sourceFromElement)
    }
}

export function sourceFromElement(element: XMLElement): Source | undefined {
    if(!element.hasAttributes(['source', 'status'])) {
        return undefined;
    }
    const name = element.getText();
    const source = element.getAttribute('source');
    const status = element.getAttribute('status');
    if(!source || ! status || !name) {
        return undefined
    }
    return {
        source,
        name,
        sourceAccount: element.getAttribute('sourceAccount') || '',
        status: status as SourceStatus,
        isLocal: element.getAttribute('isLocal') === 'true',
        isMultiRoomAllowed: element.getAttribute('multiroomallowed') === 'true'
    }
}
