import { XMLElement } from './utils/xml-element';

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
            element.getList('error').compactMap(errorFromElement),
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
    return {
        value: parseInt(element.getAttribute('value')),
        name: element.getAttribute('name'),
        severity: element.getAttribute('severity'),
        message: element.getText()
    };
}