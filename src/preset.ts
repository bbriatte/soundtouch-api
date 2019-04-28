import {XMLElement} from './utils/xml-element';
import {ContentItem, contentItemFromElement} from './content-item';

export interface Preset {
    readonly id: number,
    readonly createdDate: Date,
    readonly updatedDate: Date,
    readonly contentItem: ContentItem
}

export function presetFromElement(element: XMLElement): Preset | undefined {
    if(!element.hasAttributes(['id', 'createdOn', 'updatedOn'])
        || !element.hasChild('ContentItem')) {
        return undefined;
    }
    return {
        id: parseInt(element.getAttribute('id')),
        createdDate: new Date(parseInt(element.getAttribute('createdOn')) * 1000),
        updatedDate: new Date(parseInt(element.getAttribute('updatedOn')) * 1000),
        contentItem: contentItemFromElement(element.getChild('ContentItem'))
    }
}