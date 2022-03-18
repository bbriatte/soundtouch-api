import {XMLElement} from './utils';

export interface NetworkInfo {
    readonly macAddress: string;
    readonly ipAddress: string;
}

export function networkInfoFromElement(element: XMLElement): NetworkInfo | undefined {
    if (!element.hasChildren(['macAddress', 'ipAddress'])) {
        return undefined;
    }
    const macAddress = element.getText('macAddress');
    const ipAddress = element.getText('ipAddress');
    if(!macAddress || !ipAddress) {
        return undefined;
    }
    return {
        macAddress,
        ipAddress
    };
}
