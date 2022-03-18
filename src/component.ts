import {XMLElement} from './utils/xml-element';

export interface Component {
    readonly softwareVersion: string;
    readonly serialNumber: string;
}

export function componentFromElement(element: XMLElement): Component | undefined {
    if (!element.hasChildren(['softwareVersion', 'serialNumber'])) {
        return undefined;
    }
    const softwareVersion = element.getText('softwareVersion');
    const serialNumber = element.getText('serialNumber');
    if(!softwareVersion || !serialNumber) {
        return undefined
    }
    return {
        softwareVersion,
        serialNumber
    };
}
