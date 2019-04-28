import {XMLElement} from './utils/xml-element';

export interface BassCapabilities {
    readonly deviceId: string,
    readonly isAvailable: boolean,
    readonly min?: number,
    readonly max?: number,
    readonly default?: number
}

export function bassCapabilitiesFromElement(element: XMLElement): BassCapabilities | undefined {
    if(!element.hasAttribute('deviceID')) {
        return undefined;
    }
    const bassMinString = element.getText('bassMin');
    const bassMaxString = element.getText('bassMax');
    const bassDefaultString = element.getText('bassDefault');
    return {
        deviceId: element.getAttribute('deviceID'),
        isAvailable: element.getText('bassAvailable') === 'true',
        min: bassMinString ? parseInt(bassMinString) : undefined,
        max: bassMaxString ? parseInt(bassMaxString) : undefined,
        default: bassDefaultString ? parseInt(bassDefaultString) : undefined
    }
}