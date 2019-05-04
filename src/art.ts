import {ArtStatus} from './special-types';
import {XMLElement} from './utils/xml-element';

export interface Art {
    readonly status: ArtStatus,
    readonly url: string
}

export function artFromElement(element: XMLElement): Art | undefined {
    const url = element.getText();
    if(!element.hasAttribute('artImageStatus') || !url) {
        return undefined;
    }
    return {
        url,
        status: element.getAttribute('artImageStatus') as ArtStatus
    }
}