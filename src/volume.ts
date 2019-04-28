import {XMLElement} from './utils/xml-element';

export interface Volume {
    readonly deviceId: string,
    readonly target: number,
    readonly actual: number,
    readonly isMuted: boolean
}

export function volumeFromElement(element: XMLElement): Volume | undefined {
    const targetString = element.getText('targetvolume');
    const actualString = element.getText('actualvolume');
    if(!element.hasAttribute('deviceID') || !targetString || !actualString) {
        return undefined;
    }
    return {
        deviceId: element.getAttribute('deviceID'),
        target: targetString ? parseInt(targetString) : 0,
        actual: actualString ? parseInt(actualString) : 0,
        isMuted: element.getText('muteenabled') === 'true'
    }
}