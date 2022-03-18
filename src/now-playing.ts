import {XMLElement} from './utils';
import {PlayStatus, Rate, RepeatStatus, ShuffleStatus, StreamStatus} from './special-types';
import {ConnectionStatusInfo, connectionStatusInfoFromElement} from './connection-status-info';
import {Time, timeFromElement} from './time';
import {Art, artFromElement} from './art';
import {ContentItem, contentItemFromElement} from './content-item';

export interface NowPlaying {
    readonly deviceId: string;
    readonly source: string;
    readonly sourceAccount: string;
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
    const deviceId = element.getAttribute('deviceID');
    const source = element.getAttribute('source');
    const contentItemElement = element.getChild('ContentItem');
    if(!artElement || !timeElement || !csiElement || !deviceId || !source || !contentItemElement) {
        return undefined;
    }
    const rating = element.getText('rating');
    const playStatus = element.getText('playStatus');
    const shuffleSetting = element.getText('shuffleSetting');
    const repeatSetting = element.getText('repeatSetting');
    const streamType = element.getText('streamType');
    const contentItem = contentItemFromElement(contentItemElement);
    if(!contentItem) {
        return undefined;
    }
    return {
        deviceId,
        source,
        sourceAccount: element.getAttribute('sourceAccount') || '',
        contentItem,
        track: element.getText('track'),
        artist: element.getText('artist'),
        album: element.getText('album'),
        genre: element.getText('genre'),
        rating: rating ? rating as Rate : Rate.none,
        stationName: element.getText('stationName'),
        art: artElement ? artFromElement(artElement) : undefined,
        time: timeElement ? timeFromElement(timeElement) : undefined,
        canGoForward: element.hasChild('skipEnabled'),
        canGoBackward: element.hasChild('skipPreviousEnabled'),
        isFavoriteEnabled: element.hasChild('favoriteEnabled'),
        isFavorite: element.hasChild('isFavorite'),
        isRateEnabled: element.hasChild('rateEnabled'),
        playStatus: playStatus ? playStatus as PlayStatus : undefined,
        shuffleSetting: shuffleSetting ? shuffleSetting as ShuffleStatus : undefined,
        repeatSetting: repeatSetting ? repeatSetting as RepeatStatus : undefined,
        streamType: streamType ? streamType as StreamStatus : undefined,
        stationLocation: element.getText('stationLocation'),
        connectionStatusInfo: csiElement ? connectionStatusInfoFromElement(csiElement) : undefined
    };
}
