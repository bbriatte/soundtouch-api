import {XMLElement} from './utils';

export interface ConnectionStatusInfo {
    readonly status?: string;
    readonly deviceName?: string;
}

export function connectionStatusInfoFromElement(element: XMLElement): ConnectionStatusInfo {
    return {
        status: element.getAttribute('status'),
        deviceName: element.getAttribute('deviceName')
    }
}