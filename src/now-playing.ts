import {XMLElement} from './utils/xml-element';
import {PlayStatus, Rate, RepeatStatus, ShuffleStatus, StreamStatus} from './special-types';
import {ConnectionStatusInfo, connectionStatusInfoFromElement} from './connection-status-info';
import {Time, timeFromElement} from './time';
import {Art, artFromElement} from './art';
import {ContentItem, contentItemFromElement} from './content-item';

export interface NowPlaying {
    readonly deviceId: string;
    readonly source: string;
    readonly sourceAccount?: string;
    readonly contentItem: ContentItem;
    readonly track?: string;
    readonly artist?: string;
    readonly album?: string;
    readonly genre?: string;
    readonly stationName?: string;
    readonly art?: Art;
    readonly time?: Time;
    readonly canGoForward: boolean;
    readonly canGoBackward: boolean;
    readonly isFavoriteEnabled: boolean;
    readonly isFavorite: boolean;
    readonly isRateEnabled: boolean;
    readonly rating: Rate;
    readonly playStatus?: PlayStatus;
    readonly shuffleSetting?: ShuffleStatus;
    readonly repeatSetting?: RepeatStatus;
    readonly streamType?: StreamStatus;
    readonly stationLocation?: string;
    readonly connectionStatusInfo?: ConnectionStatusInfo;
}

export function nowPlayingFromElement(element: XMLElement): NowPlaying | undefined {
    if(!element.hasAttributes(['deviceID', 'source'])
        || !element.hasChild('ContentItem')) {
        return undefined
    }
    const artElement = element.getChild('art');
    const timeElement = element.getChild('time');
    const csiElement = element.getChild('ConnectionStatusInfo');
    return {
        deviceId: element.getAttribute('deviceID'),
        source: element.getAttribute('source'),
        sourceAccount: element.getAttribute('sourceAccount'),
        contentItem: contentItemFromElement(element.getChild('ContentItem')),
        track: element.getText('track'),
        artist: element.getText('artist'),
        album: element.getText('album'),
        genre: element.getText('genre'),
        rating: element.getText('rating') as Rate || Rate.none,
        stationName: element.getText('stationName'),
        art: artElement ? artFromElement(artElement) : undefined,
        time: timeElement ? timeFromElement(timeElement) : undefined,
        canGoForward: element.hasChild('skipEnabled'),
        canGoBackward: element.hasChild('skipPreviousEnabled'),
        isFavoriteEnabled: element.hasChild('favoriteEnabled'),
        isFavorite: element.hasChild('isFavorite'),
        isRateEnabled: element.hasChild('rateEnabled'),
        playStatus: element.getText('playStatus') as PlayStatus,
        shuffleSetting: element.getText('shuffleSetting') as ShuffleStatus,
        repeatSetting: element.getText('repeatSetting') as RepeatStatus,
        streamType: element.getText('streamType') as StreamStatus,
        stationLocation: element.getText('stationLocation'),
        connectionStatusInfo: csiElement ? connectionStatusInfoFromElement(csiElement) : undefined
    };
}