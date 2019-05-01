import { XMLElement } from './utils/xml-element';

export interface ContentItem {
    readonly source: string;
    readonly sourceAccount?: string;
    readonly isPresetable: boolean;
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
        sourceAccount: element.getAttribute('sourceAccount'),
        location: element.getAttribute('location'),
        isPresetable: element.getAttribute('isPresetable') === 'true',
        itemName: element.getText('itemName'),
        containerArt: element.getAttribute('containerArt'),
    }
}