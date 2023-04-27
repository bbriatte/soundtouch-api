import {XMLElement} from './utils';
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
    const id = element.getAttribute('id');
    const createdOn = element.getAttribute('createdOn');
    const updatedOn = element.getAttribute('updatedOn');
    const contentItemElement = element.getChild('ContentItem');
    if(!id || !createdOn || !updatedOn || !contentItemElement) {
        return undefined;
    }
    const contentItem = contentItemFromElement(contentItemElement);
    if(!contentItem) {
        return undefined;
    }
    return {
        id: parseInt(id),
        createdDate: new Date(parseInt(createdOn) * 1000),
        updatedDate: new Date(parseInt(updatedOn) * 1000),
        contentItem
    }
}
