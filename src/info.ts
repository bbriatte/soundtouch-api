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
    const deviceId = element.getAttribute('deviceID');
    const name = element.getText('name');
    const type = element.getText('type');
    const components = element.getChild('components');
    const networkInfo = element.getList('networkInfo');
    if(!deviceId || !name || !type || !components || !networkInfo) {
        return undefined;
    }
    return {
        deviceId,
        name,
        type,
        components: compactMap(components.getList('component'), componentFromElement),
        networkInfo: compactMap(networkInfo, networkInfoFromElement)
    };
}
