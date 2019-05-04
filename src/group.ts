import {GroupLocation} from './special-types';
import {compactMap, XMLElement} from './utils';

export interface Group {
    readonly id: string;
    readonly name: string;
    readonly masterDeviceId: string;
    readonly roles: Role[];
    readonly status: string;
}

export interface Role {
    readonly deviceId: string;
    readonly location: GroupLocation;
    readonly ipAddress: string;
}

export function groupFromElement(element: XMLElement): Group | undefined {
    if(!element.hasAttribute('id')
        || !element.hasChildren(['name', 'masterDeviceId', 'roles', 'status'])) {
        return undefined;
    }
    const roles = element.getChild('roles');
    return {
        id: element.getAttribute('id'),
        name: element.getText('name'),
        masterDeviceId: element.getText('masterDeviceId'),
        status: element.getText('status'),
        roles: compactMap(roles.getList('groupRole'), roleFromElement)
    }
}

export function roleFromElement(element: XMLElement): Role | undefined {
    if(!element.hasChildren(['deviceId', 'role', 'ipAddress'])) {
        return undefined;
    }
    return {
        deviceId: element.getText('deviceId'),
        ipAddress: element.getText('ipAddress'),
        location: element.getText('role') as GroupLocation,
    }
}