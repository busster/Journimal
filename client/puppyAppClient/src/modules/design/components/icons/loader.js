import AsyncStorage from '@react-native-async-storage/async-storage'
import { Machine, assign, interpret } from 'xstate'

import { httpGetRawBuilder } from '@/utils/http/presets'

import { Storage } from '@/utils/storage'

const iconStorageKey = (icon) => `icons:${icon}`

const getIconUri = (context, event) => Storage.loadRefUriFromUrl(`/svgs/${context.icon}.svg`)
const getIconXml = async (context, event) => {
  const iconXml = await httpGetRawBuilder().withUrl(context.iconUri).send()
  return iconXml.data
}

const storeIconXml = (context, event) => AsyncStorage.setItem(iconStorageKey(context.icon), context.iconXml)
const retrieveIconXml = async (context, event) => {
  try {
    const iconXml = await AsyncStorage.getItem(iconStorageKey(context.icon))
    if (iconXml === null) throw('No icon.')
    return iconXml
  } catch (e) {
    throw(e)
  }
}

const definition = (icon) => ({
  initial: 'extractIconXml',
  context: { icon, iconUri: null, iconXml: null, retry: 0 },
  states: {
    loadingUri: {
      invoke: {
        id: 'icon-loader-service',
        src: 'getIconUri',
        onDone: {
          target: 'loadingXml',
          actions: ['setIconUri']
        },
        onError: {
          target: 'failed',
          actions: ['setRetry', 'invalidateIcon', 'invalidateCache']
        }
      }
    },
    loadingXml: {
      invoke: {
        id: 'icon-xml-loader-service',
        src: 'getIconXml',
        onDone: {
          target: 'storeIconXml',
          actions: ['setIconXml']
        },
        onError: {
          target: 'failed',
          actions: ['setRetry']
        }
      }
    },
    storeIconXml: {
      invoke: {
        id: 'icon-xml-storage-service',
        src: 'storeIconXml',
        onDone: 'extractIconXml',
        onError: {
          target: 'failed',
          actions: ['setRetry']
        }
      }
    },
    extractIconXml: {
      invoke: {
        id: 'icon-xml-storage-getter-service',
        src: 'retrieveIconXml',
        onDone: {
          target: 'loaded',
          actions: ['setIconXml']
        },
        onError: 'loadingUri'
      }
    },
    loaded: {},
    failed: {
      always: [
        { target: 'loadingUri', cond: 'shouldRetry' }
      ]
    }
  }
})

const options = {
  services: {
    getIconUri,
    getIconXml,
    storeIconXml,
    retrieveIconXml
  },
  actions: {
    setIconUri: assign({ iconUri: (context, event) => event.data }),
    setRetry: assign({ retry: (context, event) => context.retry + 1 }),
    invalidateIcon: assign({ iconUri: null }),
    invalidateCache: (context, event) => Storage.invalidateRef(context.icon),
    setIconXml: assign({ iconXml: (context, event) => event.data })
  },
  guards: {
    shouldRetry: (context, event) => context.retry < 2
  }
}

export const createLoaderMachine = (icon) => Machine(definition(icon), options)
