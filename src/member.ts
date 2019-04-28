import {XMLElement} from './utils/xml-element';

export interface Member {
    readonly deviceId: string,
    readonly ipAddress: string
}

export function memberFromElement(element: XMLElement): Member | undefined {
    if(!element.hasAttribute('ipaddress')) {
        return undefined;
    }
    return {
        deviceId: element.getText(),
        ipAddress: element.getAttribute('ipaddress')
    }
}