import {compactMap, XMLElement} from './utils';
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
        members: compactMap(element.getList('member'), memberFromElement)
    }
}

export function zoneToElement(zone: Zone): XMLElement {
    const data = {
        $: {
            master: zone.master
        },
        member: zone.members.map((member: Member) => {
            return {
                $: {
                    ipaddress: member.ipAddress
                },
                _: member.deviceId
            }
        })
    };
    return new XMLElement({
        zone: data
    });
}