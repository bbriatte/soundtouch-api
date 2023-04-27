import * as initBonjour from 'bonjour';
import {Bonjour, RemoteService} from 'bonjour';
import {API} from './api';

export class APIDiscovery {

    private constructor() {}

    static async search(duration: number = 10000): Promise<API[]> {
        const apis: API[] = [];
        const bonjour: Bonjour = initBonjour();
        bonjour.find({
            type: 'soundtouch',
            protocol: 'tcp',
        }, (service) => {
            const api = _APIFromService(service);
            if(api) {
                apis.push(api);
            }
        });
        await new Promise((resolve) => setTimeout(resolve, duration));
        bonjour.destroy();
        return apis;
    }

    static async find(name: string, duration: number = 10000): Promise<API | undefined> {
        return new Promise<API | undefined>((resolve) => {
            const bonjour: Bonjour = initBonjour();
            let timer = setTimeout(() => {
                bonjour.destroy();
                resolve(undefined);
            }, duration);
            bonjour.find({
                type: 'soundtouch',
                protocol: 'tcp',
            }, (service) => {
                if (service && service.name === name) {
                    const api = _APIFromService(service);
                    if (api) {
                        clearTimeout(timer);
                        bonjour.destroy();
                        resolve(api);
                    }
                }
            });
        });
    }
}

function _APIFromService(service?: RemoteService): API | undefined {
    if(service && service.addresses.length > 0) {
        const ipAddress = service.addresses[0];
        return new API({
            ip: ipAddress,
            host: service.host,
            port: service.port,
            name: service.name,
            mac: service.txt['mac'],
            manufacturer: service.txt['manufacturer'],
            model: service.txt['model']
        });
    }
    return undefined;
}
