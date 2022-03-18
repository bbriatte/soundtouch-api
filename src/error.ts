import {compactMap, XMLElement} from './utils';

export class APIErrors extends Error {
    readonly deviceId?: string;
    readonly errors: APIError[];

    constructor(errors: APIError[], deviceId?: string) {
        super(`Occured on device ${deviceId}: ${JSON.stringify(errors)}`);
        this.deviceId = deviceId;
        this.errors = errors;
    }

    static fromElement(element: XMLElement): APIErrors | undefined {
        return new APIErrors(
            compactMap(element.getList('error'), errorFromElement),
            element.getAttribute('deviceID')
        );
    }
}

export interface APIError {
    readonly value: number;
    readonly name: string;
    readonly severity: string;
    readonly message?: string;
}

export function errorFromElement(element: XMLElement): APIError | undefined {
    if (!element.hasAttributes(['value', 'name', 'severity'])) {
        return undefined;
    }
    const valueString = element.getAttribute('value');
    const name = element.getAttribute('name');
    const severity = element.getAttribute('severity');
    if(!valueString || !name || !severity) {
        return undefined;
    }
    return {
        value: parseInt(valueString) || 0,
        name,
        severity,
        message: element.getText()
    };
}
