export default Object.freeze({

    SUCCESS: 9999,
    FAILURE: -9999,

    PBX: [
        { code: 1, msg: 'Domain not exists' },
        { code: 2, msg: 'Extension exists' },
        { code: 3, msg: 'Create domain error' },
        { code: 4, msg: 'Create extension error' },
        { code: 5, msg: 'Update extension error' },
        { code: 6, msg: 'Ring group not exists' },
        { code: 7, msg: 'Create recording error' },
        { code: 8, msg: 'Create or update ring group error' },
        { code: 9, msg: 'Create or update ivr menu error' },
        { code: 10, msg: 'Ivr menu greetlong not exists' },
        { code: 11, msg: 'Ivr menu not exists' },
        { code: 12, msg: 'Destination exists' },
        { code: 13, msg: 'Destination not exists' },
        { code: 14, msg: 'Domain empty' },
        { code: 15, msg: 'Extension empty' },
        { code: 16, msg: 'Destination number empty' },
        { code: 17, msg: 'Store file error' },
        { code: 99, msg: 'Error occured' },
        { code: 100, msg: 'Success' },
    ],

});