export enum KeyState {
    press = 'press',
    release = 'release'
}

export enum KeyValue {
    play = 'PLAY',
    pause = 'PAUSE',
    playPause = 'PLAY_PAUSE',
    prevTrack = 'PREV_TRACK',
    nextTrack = 'NEXT_TRACK',
    power = 'POWER',
    mute = 'MUTE',
    shuffleOn = 'SHUFFLE_ON',
    shuffleOff = 'SHUFFLE_OFF',
    repeatOne = 'REPEAT_ONE',
    repeatAll = 'REPEAT_ALL',
    repeatOff = 'REPEAT_OFF',
    addFavorite = 'ADD_FAVORITE',
    removeFavorite = 'REMOVE_FAVORITE',
    thumbsUp = 'THUMBS_UP',
    thumbsDown = 'THUMBS_DOWN',
    bookmark = 'BOOKMARK',
    preset1 = 'PRESET_1',
    preset2 = 'PRESET_2',
    preset3 = 'PRESET_3',
    preset4 = 'PRESET_4',
    preset5 = 'PRESET_5',
    preset6 = 'PRESET_6',
}

export enum PlayStatus {
    play = 'PLAY_STATE',
    pause = 'PAUSE_STATE',
    stop = 'STOP_STATE',
    buffering = 'BUFFERING_STATE'
}

export enum SourceStatus {
    unavailable = 'UNAVAILABLE',
    ready = 'READY'
}

export enum ShuffleStatus {
    on = 'SHUFFLE_ON',
    off = 'SHUFFLE_OFF'
}

export enum RepeatStatus {
    off = 'REPEAT_OFF',
    one = 'REPEAT_ONE',
    all = 'REPEAT_ALL'
}

export enum StreamStatus {
    trackOndemand = 'TRACK_ONDEMAND',
    radioStreaming = 'RADIO_STREAMING',
    radioTracks = 'RADIO_TRACKS',
    noTransportControls = 'NO_TRANSPORT_CONTROLS',
}

export enum ArtStatus {
    invalid = 'INVALID',
    showDefaultImage = 'SHOW_DEFAULT_IMAGE',
    downloading = 'DOWNLOADING',
    imagePresent = 'IMAGE_PRESENT',
}

export enum Rate {
    up = 'UP',
    down = 'DOWN',
    none = 'NONE'
}

export enum GroupLocation {
    left = 'LEFT',
    right = 'RIGHT'
}