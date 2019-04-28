import {XMLElement} from './utils/xml-element';

export interface Time {
    readonly current: number;
    readonly total: number;
}

export function timeFromElement(element: XMLElement): Time {
    const totalString = element.getAttribute('total');
    const currentString = element.getText();
    const total = totalString ? parseInt(totalString) : 0;
    const current = currentString ? parseInt(currentString) : 0;
    return {
        current,
        total
    }
}