export const SUPPORT_LEVEL = {
    FULL: 'full',
    PARTIAL: 'partial',
    NONE: 'none',
    NA: 'na'
};

export const CAPABILITIES = {
    text: {
        name: 'Text',
        link: '/guide/sending-messages/#sending-text-messages-with-the-api',
        send: true,
        receive: true
    },
    image: {
        name: 'Image',
        link: '/guide/structured-messages/#images-stickers-and-gifs',
        send: true,
        receive: true
    },
    gif: {
        name: 'GIF',
        link: '/guide/structured-messages/#images-stickers-and-gifs',
        send: true,
        receive: true
    },
    emoji: {
        name: 'Emoji',
        send: true,
        receive: true
    },
    link: {
        name: 'Link',
        link: '/guide/structured-messages/#link-buttons',
        send: true,
        receive: false
    },
    buy: {
        name: 'Buy',
        link: '/guide/structured-messages/#buy-buttons',
        send: true,
        receive: false
    },
    postback: {
        name: 'Postback',
        link: '/guide/structured-messages/#postback-buttons',
        send: true,
        receive: false
    },
    replies: {
        name: 'Replies',
        link: '/guide/structured-messages/#reply-buttons',
        send: true,
        receive: false
    },
    compoundMessages: {
        name: 'Compound Messages',
        link: '/guide/structured-messages/#images-stickers-and-gifs',
        send: true,
        receive: false
    },
    carousel: {
        name: 'Carousel',
        link: '/guide/structured-messages/#carousel-messages',
        send: true,
        receive: false
    },
    typingIndicator: {
        name: 'Typing',
        link: '/guide/sending-messages/#sending-typing-activity-with-the-api',
        send: true,
        receive: true
    },
    readIndicator: {
        name: 'Read',
        send: true,
        receive: true
    },
    webMessengerLinking: {
        name: 'via Web Messenger',
        link: '/guide/web-messenger#alternate-channels',
        send: false,
        receive: false
    }
};


const channelData = {
    ios: {
        icon: require('../images/channel-icons/ios.svg'),
        name: 'iOS Messenger',
        capabilities: {
            text: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            image: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            gif: {
                send: SUPPORT_LEVEL.NONE,
                receive: SUPPORT_LEVEL.NONE
            },
            emoji: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            link: {
                send: SUPPORT_LEVEL.FULL
            },
            buy: {
                send: SUPPORT_LEVEL.FULL
            },
            postback: {
                send: SUPPORT_LEVEL.FULL
            },
            replies: {
                send: SUPPORT_LEVEL.FULL
            },
            compoundMessages: {
                send: SUPPORT_LEVEL.FULL
            },
            carousel: {
                send: SUPPORT_LEVEL.PARTIAL
            },
            typingIndicator: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.NONE
            },
            readIndicator: {
                send: SUPPORT_LEVEL.NONE,
                receive: SUPPORT_LEVEL.FULL
            },
            webMessengerLinking: SUPPORT_LEVEL.FULL
        }
    },
    android: {
        icon: require('../images/channel-icons/android.svg'),
        name: 'Android Messenger',
        capabilities: {
            text: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            image: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            gif: {
                send: SUPPORT_LEVEL.NONE,
                receive: SUPPORT_LEVEL.NONE
            },
            emoji: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            link: {
                send: SUPPORT_LEVEL.FULL
            },
            buy: {
                send: SUPPORT_LEVEL.FULL
            },
            postback: {
                send: SUPPORT_LEVEL.FULL
            },
            replies: {
                send: SUPPORT_LEVEL.FULL
            },
            compoundMessages: {
                send: SUPPORT_LEVEL.FULL
            },
            carousel: {
                send: SUPPORT_LEVEL.PARTIAL
            },
            typingIndicator: {
                send: SUPPORT_LEVEL.NONE,
                receive: SUPPORT_LEVEL.NONE
            },
            readIndicator: {
                send: SUPPORT_LEVEL.NONE,
                receive: SUPPORT_LEVEL.FULL
            },
            webMessengerLinking: SUPPORT_LEVEL.FULL
        }
    },
    web: {
        icon: require('../images/channel-icons/web.svg'),
        name: 'Web Messenger',
        capabilities: {
            text: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            image: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            gif: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.NONE
            },
            emoji: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            link: {
                send: SUPPORT_LEVEL.FULL
            },
            buy: {
                send: SUPPORT_LEVEL.FULL
            },
            postback: {
                send: SUPPORT_LEVEL.FULL
            },
            replies: {
                send: SUPPORT_LEVEL.FULL
            },
            compoundMessages: {
                send: SUPPORT_LEVEL.FULL
            },
            carousel: {
                send: SUPPORT_LEVEL.PARTIAL
            },
            typingIndicator: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.NONE
            },
            readIndicator: {
                send: SUPPORT_LEVEL.NONE,
                receive: SUPPORT_LEVEL.FULL
            },
            webMessengerLinking: SUPPORT_LEVEL.NA
        }
    },
    twilio: {
        icon: require('../images/channel-icons/twilio.svg'),
        name: 'Twilio',
        capabilities: {
            text: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            image: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            gif: {
                send: SUPPORT_LEVEL.NONE,
                receive: SUPPORT_LEVEL.FULL
            },
            emoji: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            link: {
                send: SUPPORT_LEVEL.FULL
            },
            buy: {
                send: SUPPORT_LEVEL.FULL
            },
            postback: {
                send: SUPPORT_LEVEL.FULL
            },
            replies: {
                send: SUPPORT_LEVEL.FULL
            },
            compoundMessages: {
                send: SUPPORT_LEVEL.FULL
            },
            carousel: {
                send: SUPPORT_LEVEL.PARTIAL
            },
            typingIndicator: {
                send: SUPPORT_LEVEL.NA,
                receive: SUPPORT_LEVEL.NA
            },
            readIndicator: {
                send: SUPPORT_LEVEL.NA,
                receive: SUPPORT_LEVEL.NA
            },
            webMessengerLinking: SUPPORT_LEVEL.FULL
        }
    },
    telegram: {
        icon: require('../images/channel-icons/telegram.svg'),
        name: 'Telegram',
        capabilities: {
            text: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            image: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            gif: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            emoji: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            link: {
                send: SUPPORT_LEVEL.FULL
            },
            buy: {
                send: SUPPORT_LEVEL.FULL
            },
            postback: {
                send: SUPPORT_LEVEL.FULL
            },
            replies: {
                send: SUPPORT_LEVEL.FULL
            },
            compoundMessages: {
                send: SUPPORT_LEVEL.FULL
            },
            carousel: {
                send: SUPPORT_LEVEL.FULL
            },
            typingIndicator: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.NA
            },
            readIndicator: {
                send: SUPPORT_LEVEL.NA,
                receive: SUPPORT_LEVEL.FULL
            },
            webMessengerLinking: SUPPORT_LEVEL.FULL
        }
    },
    messenger: {
        icon: require('../images/channel-icons/messenger.svg'),
        name: 'Facebook Messenger',
        capabilities: {
            text: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            image: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            gif: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            emoji: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            link: {
                send: SUPPORT_LEVEL.FULL
            },
            buy: {
                send: SUPPORT_LEVEL.NONE
            },
            postback: {
                send: SUPPORT_LEVEL.FULL
            },
            replies: {
                send: SUPPORT_LEVEL.FULL
            },
            compoundMessages: {
                send: SUPPORT_LEVEL.FULL
            },
            carousel: {
                send: SUPPORT_LEVEL.FULL
            },
            typingIndicator: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.NA
            },
            readIndicator: {
                send: SUPPORT_LEVEL.NONE,
                receive: SUPPORT_LEVEL.NONE
            },
            webMessengerLinking: SUPPORT_LEVEL.FULL
        }
    },
    line: {
        icon: require('../images/channel-icons/line.svg'),
        name: 'LINE',
        capabilities: {
            text: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            image: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            gif: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.NA
            },
            emoji: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            link: {
                send: SUPPORT_LEVEL.FULL
            },
            buy: {
                send: SUPPORT_LEVEL.FULL
            },
            postback: {
                send: SUPPORT_LEVEL.FULL
            },
            replies: {
                send: SUPPORT_LEVEL.FULL
            },
            compoundMessages: {
                send: SUPPORT_LEVEL.FULL
            },
            carousel: {
                send: SUPPORT_LEVEL.FULL
            },
            typingIndicator: {
                send: SUPPORT_LEVEL.NA,
                receive: SUPPORT_LEVEL.NA
            },
            readIndicator: {
                send: SUPPORT_LEVEL.NA,
                receive: SUPPORT_LEVEL.NA
            },
            webMessengerLinking: SUPPORT_LEVEL.PARTIAL
        }
    },
    email: {
        icon: require('../images/channel-icons/frontendEmail.svg'),
        name: 'Email',
        capabilities: {
            text: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            image: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            gif: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            emoji: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            link: {
                send: SUPPORT_LEVEL.FULL
            },
            buy: {
                send: SUPPORT_LEVEL.FULL
            },
            postback: {
                send: SUPPORT_LEVEL.FULL
            },
            replies: {
                send: SUPPORT_LEVEL.FULL
            },
            compoundMessages: {
                send: SUPPORT_LEVEL.FULL
            },
            carousel: {
                send: SUPPORT_LEVEL.PARTIAL
            },
            typingIndicator: {
                send: SUPPORT_LEVEL.NA,
                receive: SUPPORT_LEVEL.NA
            },
            readIndicator: {
                send: SUPPORT_LEVEL.NA,
                receive: SUPPORT_LEVEL.NONE
            },
            webMessengerLinking: SUPPORT_LEVEL.NONE
        }
    },
    wechat: {
        icon: require('../images/channel-icons/wechat.svg'),
        name: 'WeChat',
        capabilities: {
            text: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            image: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            gif: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            emoji: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            link: {
                send: SUPPORT_LEVEL.FULL
            },
            buy: {
                send: SUPPORT_LEVEL.FULL
            },
            postback: {
                send: SUPPORT_LEVEL.FULL
            },
            replies: {
                send: SUPPORT_LEVEL.FULL
            },
            compoundMessages: {
                send: SUPPORT_LEVEL.FULL
            },
            carousel: {
                send: SUPPORT_LEVEL.PARTIAL
            },
            typingIndicator: {
                send: SUPPORT_LEVEL.NA,
                receive: SUPPORT_LEVEL.NA
            },
            readIndicator: {
                send: SUPPORT_LEVEL.NA,
                receive: SUPPORT_LEVEL.NA
            },
            webMessengerLinking: SUPPORT_LEVEL.FULL
        }
    },
    viber: {
        icon: require('../images/channel-icons/viber.svg'),
        name: 'Viber',
        capabilities: {
            text: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            image: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            gif: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.NONE
            },
            emoji: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            link: {
                send: SUPPORT_LEVEL.FULL
            },
            buy: {
                send: SUPPORT_LEVEL.FULL
            },
            postback: {
                send: SUPPORT_LEVEL.FULL
            },
            replies: {
                send: SUPPORT_LEVEL.FULL
            },
            compoundMessages: {
                send: SUPPORT_LEVEL.FULL
            },
            carousel: {
                send: SUPPORT_LEVEL.PARTIAL
            },
            typingIndicator: {
                send: SUPPORT_LEVEL.NA,
                receive: SUPPORT_LEVEL.NA
            },
            readIndicator: {
                send: SUPPORT_LEVEL.NA,
                receive: SUPPORT_LEVEL.NONE
            },
            webMessengerLinking: SUPPORT_LEVEL.FULL
        }
    }
};

export const CHANNELS = [
    'ios',
    'android',
    'web',
    'twilio',
    'telegram',
    'messenger',
    'line',
    'email',
    'wechat',
    'viber'
].map((id) => Object.assign({
    id
}, channelData[id]));
