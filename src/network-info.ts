import { XMLElement } from './utils/xml-element';

export interface NetworkInfo {
    readonly macAddress: string;
    readonly ipAddress: string;
}

export function networkInfoFromElement(element: XMLElement): NetworkInfo | undefined {
    if (!element.hasChildren(['macAddress', 'ipAddress'])) {
        return undefined;
    }
    return {
        macAddress: element.getText('macAddress'),
        ipAddress: element.getText('ipAddress')
    };
}