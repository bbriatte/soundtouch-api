import {XMLElement} from './utils/xml-element';
import {Member, memberFromElement} from './member';

export interface Zone {
    readonly master: string,
    readonly members: Member[]
}

export function zoneFromElement(element: XMLElement): Zone | undefined {
    if(!element.hasAttribute('master')) {
        return undefined;
    }
    return {
        master: element.getAttribute('master'),
        members: element.getList('member').compactMap(memberFromElement)
    }
}