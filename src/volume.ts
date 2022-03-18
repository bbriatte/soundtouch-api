import {XMLElement} from './utils';

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
    const deviceId = element.getAttribute('deviceID');
    if(!deviceId) {
        return undefined;
    }
    return {
        deviceId,
        target: targetString ? parseInt(targetString) : 0,
        actual: actualString ? parseInt(actualString) : 0,
        isMuted: element.getText('muteenabled') === 'true'
    }
}
