# soundtouch-api

[![npm version](https://badge.fury.io/js/soundtouch-api.svg)](https://badge.fury.io/js/soundtouch-api)

soundtouch-api is a Node.js library that implements the Bose
[SoundTouch API](https://developer.bose.com/guides/bose-soundtouch-api/bose-soundtouch-api-reference).

## Installation
`npm install --save soundtouch-api`

## Usage

Press the power button for each device in your local network

```typescript
async function powerAllDevices(): Promise<boolean> {
    const apis: API[] = await APIDiscovery.search(); // find all devices in the local network
    const res = await Promise.all(apis.map((api) => api.pressKey(KeyValue.power)));
    return res.indexOf(false) === -1;
}
// Execute the task
powerAllDevices()
    .then(console.log)
    .catch(console.error)
```

Get the selected source of the device name's `My SoundTouch Speaker`

```typescript
async function getSelectedSource(): Promise<string | undefined> {
    const api: API | undefined = await APIDiscovery.find('My SoundTouch Speaker');
    if(!api) {
        return undefined;
    }
    const nowPlaying: NowPlaying | undefined = await api.getNowPlaying();
    if(!nowPlaying) {
        return undefined;
    }
    return nowPlaying.source;
}
// Execute the task
getSelectedSource()
    .then(console.log)
    .catch(console.error)
```

Change the volume of a specific device IP on your local network

```typescript
async function updateVolume(): Promise<number | undefined> {
    const api = new API({
        ip: '192.168.0.20',
        port: 8090,
        name: 'My SoundTouch Speaker'
    });
    const success = await api.setVolume(28);
    if(!success) {
        return undefined;
    }
    const volume: Volume | undefined = await api.getVolume();
    if(!volume) {
        return undefined;
    }
    return volume.actual;
}
// Execute the task
updateVolume()
    .then(console.log)
    .catch(console.error)
```

More actions are available on the [API](src/api.ts) object.

