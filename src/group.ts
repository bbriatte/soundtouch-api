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
    const id = element.getAttribute('id');
    const name = element.getText('name');
    const masterDeviceId = element.getText('masterDeviceId');
    const status = element.getText('status');
    if(!roles || !id || !name || !masterDeviceId || !status) {
        return undefined;
    }
    return {
        id,
        name,
        masterDeviceId,
        status,
        roles: compactMap(roles.getList('groupRole'), roleFromElement)
    }
}

export function roleFromElement(element: XMLElement): Role | undefined {
    if(!element.hasChildren(['deviceId', 'role', 'ipAddress'])) {
        return undefined;
    }
    const deviceId = element.getText('deviceId');
    const ipAddress = element.getText('ipAddress');
    const role = element.getText('role');
    if(!deviceId || !ipAddress || !role) {
        return undefined;
    }
    return {
        deviceId,
        ipAddress,
        location: role as GroupLocation,
    }
}
