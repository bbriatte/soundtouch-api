import { Component, componentFromElement } from './component';
import { NetworkInfo, networkInfoFromElement  } from './network-info';
import { XMLElement } from './utils/xml-element';

export interface Info {
    readonly deviceId: string;
    readonly name: string;
    readonly type: string;
    readonly components: Component[];
    readonly networkInfo: NetworkInfo[];
}

export function infoFromElement(element: XMLElement): Info | undefined {
    if (!element.hasAttributes(['deviceID'])
        || !element.hasChildren(['name', 'type', 'components', 'networkInfo'])) {
        return undefined;
    }
    return {
        deviceId: element.getAttribute('deviceID'),
        name: element.getText('name'),
        type: element.getText('type'),
        components: element.getChild('components').getList('component').compactMap(componentFromElement),
        networkInfo: element.getList('networkInfo').compactMap(networkInfoFromElement)
    };
}
