import {XMLElement} from './utils';

export interface Bass {
    readonly deviceId: string;
    readonly target: number,
    readonly actual: number,
}

export function bassFromElement(element: XMLElement): Bass | undefined {
    if(!element.hasAttribute('deviceID')) {
        return undefined;
    }
    const deviceId = element.getAttribute('deviceID');
    if(!deviceId) {
        return undefined;
    }
    const targetBassString = element.getText('targetbass');
    const actualBassString = element.getText('actualbass');
    return {
        deviceId,
        target: targetBassString ? parseInt(targetBassString) : 0,
        actual: actualBassString ? parseInt(actualBassString) : 0,
    }
}
