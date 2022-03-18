import {XMLElement} from './utils';

export interface Member {
    readonly deviceId: string,
    readonly ipAddress: string
}

export function memberFromElement(element: XMLElement): Member | undefined {
    if(!element.hasAttribute('ipaddress')) {
        return undefined;
    }
    const deviceId = element.getText();
    const ipAddress = element.getAttribute('ipaddress');
    if(!deviceId || !ipAddress) {
        return undefined;
    }
    return {
        deviceId,
        ipAddress
    }
}
