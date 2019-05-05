import {XMLElement} from './utils';

export interface ContentItem {
    readonly source: string;
    readonly sourceAccount: string;
    readonly isPresetable?: boolean;
    readonly location?: string;
    readonly itemName?: string;
    readonly containerArt?: string;
}
export function contentItemFromElement(element: XMLElement): ContentItem | undefined {
    if(!element.hasAttribute('source')) {
        return undefined;
    }
    return {
        source: element.getAttribute('source'),
        sourceAccount: element.getAttribute('sourceAccount') || '',
        location: element.getAttribute('location'),
        isPresetable: element.getAttribute('isPresetable') === 'true',
        itemName: element.getText('itemName'),
        containerArt: element.getAttribute('containerArt'),
    }
}
export function contentItemToElement(contentItem: ContentItem): XMLElement {
    let data: any = {
        $: {
            source: contentItem.source,
            sourceAccount: contentItem.sourceAccount
        }
    };
    if(contentItem.isPresetable !== undefined) {
        data.$.isPresetable = contentItem.isPresetable;
    }
    if(contentItem.location !== undefined) {
        data.$.location = contentItem.location;
    }
    if(contentItem.containerArt !== undefined) {
        data.$.containerArt = contentItem.containerArt;
    }
    if(contentItem.itemName !== undefined) {
        data.itemName = contentItem.itemName;
    }
    return new XMLElement({
        ContentItem: data
    });
}