'use strict';

import {Info, infoFromElement} from './info';
import * as request from 'request-promise';
import {APIErrors, errorFromElement} from './error';
import {Endpoints} from './endpoints';
import {Builder, convertableToString, OptionsV2, parseString} from 'xml2js';
import {compactMap, XMLElement} from './utils';
import {PlayInfo} from './play-info';
import {KeyState, KeyValue} from './special-types';
import {NowPlaying, nowPlayingFromElement} from './now-playing';
import {Volume, volumeFromElement} from './volume';
import {Sources, sourcesFromElement} from './source';
import {Zone, zoneFromElement, zoneToElement} from './zone';
import {BassCapabilities, bassCapabilitiesFromElement} from './bass-capabilities';
import {Bass, bassFromElement} from './bass';
import {Preset, presetFromElement} from './preset';
import {Group, groupFromElement} from './group';
import {promisify} from 'util';
import {ContentItem, contentItemToElement} from './content-item';

const XMLParsePromise = promisify((xml: convertableToString, options: OptionsV2, cb: (err: Error, res: any) => void) => parseString(xml, options, cb));

export class API {

    readonly host: string;
    readonly port: number;
    private readonly XMLBuilder: Builder;

    constructor(host: string, port: number = 8090) {
        this.host = host;
        this.port = port;
        this.XMLBuilder = new Builder();
    }

    async getInfo(): Promise<Info | undefined> {
        const element = await this._get(Endpoints.info);
        if(element.hasChild('info')) {
            return infoFromElement(element.getChild('info'));
        }
        return undefined;
    }

    async setVolume(value: number): Promise<boolean> {
        const element = await this._post(Endpoints.volume, {
            volume: value
        });
        return element ? element.getText('status') !== undefined : false;
    }

    async getVolume(): Promise<Volume | undefined> {
        const element = await this._get(Endpoints.volume);
        if(element.hasChild('volume')) {
            return volumeFromElement(element.getChild('volume'));
        }
        return undefined;
    }

    async speaker(playInfo: PlayInfo): Promise<boolean> {
        const element = await this._post(Endpoints.speaker, {
            play_info: playInfo
        });
        return element ? element.getText('status') !== undefined : false;
    }

    async pressKey(value: KeyValue): Promise<boolean> {
        return this.holdKey(value, 0);
    }

    async holdKey(value: KeyValue, duration: number = 5000): Promise<boolean> {
        const success = await this._key(KeyState.press, value);
        if(!success) {
            return false;
        }
        if(duration > 0) {
            await new Promise((resolve) => setTimeout(resolve, duration));
        }
        return this._key(KeyState.release, value);
    }

    async getNowPlaying(): Promise<NowPlaying | undefined> {
        const element = await this._get(Endpoints.nowPlaying);
        if(element.hasChild('nowPlaying')) {
            return nowPlayingFromElement(element.getChild('nowPlaying'));
        }
        return undefined;
    }

    async selectSource(contentItem: ContentItem): Promise<boolean> {
        const element = await this._post(Endpoints.select, contentItemToElement(contentItem).data);
        return element ? element.getText('status') !== undefined : false;
    }

    async getSources(): Promise<Sources | undefined> {
        const element = await this._get(Endpoints.sources);
        if(element.hasChild('sources')) {
            return sourcesFromElement(element.getChild('sources'));
        }
        return undefined;
    }

    async getZone(): Promise<Zone | undefined> {
        const element = await this._get(Endpoints.getZone);
        if(element.hasChild('zone')) {
            return zoneFromElement(element.getChild('zone'));
        }
        return undefined;
    }

    async setZone(zone: Zone): Promise<boolean> {
        return this._updateZone(zone, Endpoints.setZone);
    }

    async addZoneSlave(zone: Zone): Promise<boolean> {
        return this._updateZone(zone, Endpoints.addZoneSlave);
    }

    async removeZoneSlave(zone: Zone): Promise<boolean> {
        return this._updateZone(zone, Endpoints.removeZoneSlave);
    }

    async getBassCapabilities(): Promise<BassCapabilities | undefined> {
        const element = await this._get(Endpoints.bassCapabilities);
        if(element.hasChild('bassCapabilities')) {
            return bassCapabilitiesFromElement(element.getChild('bassCapabilities'));
        }
        return undefined;
    }

    async getBass(): Promise<Bass | undefined> {
        const element = await this._get(Endpoints.bass);
        if(element.hasChild('bass')) {
            return bassFromElement(element.getChild('bass'));
        }
        return undefined;
    }

    async setBass(value: number): Promise<boolean> {
        const element = await this._post(Endpoints.bass, {
            bass: value
        });
        return element ? element.getText('status') !== undefined : false;
    }

    async getPresets(): Promise<Preset[] | undefined> {
        const element = await this._get(Endpoints.presets);
        if(element.hasChild('presets')) {
            const presets = element.getChild('presets');
            if(presets.hasChild('preset')) {
                return compactMap(presets.getList('preset'), presetFromElement);
            }
        }
        return undefined;
    }

    async setName(value: string): Promise<Info | undefined> {
        const element = await this._post(Endpoints.name, {
            name: value
        });
        if(element.hasChild('info')) {
            return infoFromElement(element.getChild('info'));
        }
        return undefined;
    }

    async getGroup(): Promise<Group | undefined> {
        const element = await this._get(Endpoints.getGroup);
        if(element.hasChild('group')) {
            return groupFromElement(element.getChild('group'));
        }
        return undefined;
    }

    // PRIVATE FUNCTIONS

    private static _throwAPIErrors(root: XMLElement) {
        if(root.hasChild('errors')) {
            throw APIErrors.fromElement(root.getChild('errors'));
        } else if(root.hasChild('Error')) {
            const err = errorFromElement(root.getChild('Error'));
            if(err) {
                throw new APIErrors([err]);
            }
        }
    }

    private async _req(method: string, endpoint: Endpoints, body?: object): Promise<XMLElement> {
        const url = `http://${this.host}:${this.port}/${endpoint}`;
        let xml;
        try {
            if(method === 'GET') {
                xml = await request.get(url);
            } else {
                xml = await request.post(url, {
                    headers: {
                        'Content-Type': 'application/xml'
                    },
                    body: this.XMLBuilder.buildObject(body)
                });
            }
        } catch(err) {
            if(!err.response) {
                throw err;
            }
            xml = err.response.body;
        }
        const data = await XMLParsePromise(xml, {
            trim: true
        });
        const root = new XMLElement(data);
        API._throwAPIErrors(root);
        return root;
    }

    private async _get(endpoint: Endpoints): Promise<XMLElement> {
        return this._req('GET', endpoint);
    }

    private async _post(endpoint: Endpoints, body: object): Promise<XMLElement> {
        return this._req('POST', endpoint, body);
    }

    private async _key(state: KeyState, value: KeyValue): Promise<boolean> {
        const element = await this._post(Endpoints.key, {
            key: {
                $: {
                    state: state,
                    sender: 'Gabbo'
                },
                _: value
            }
        });
        return element ? element.getText('status') !== undefined : false;
    }

    private async _updateZone(zone: Zone, endpoint: Endpoints): Promise<boolean> {
        const element = await this._post(endpoint, zoneToElement(zone).data);
        return element ? element.getText('status') !== undefined : false;
    }
}