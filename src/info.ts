import { Component, componentFromElement } from './component';
import { NetworkInfo, networkInfoFromElement  } from './network-info';
import {compactMap, XMLElement} from './utils';

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
        components: compactMap(element.getChild('components').getList('component'), componentFromElement),
        networkInfo: compactMap(element.getList('networkInfo'), networkInfoFromElement)
    };
}
