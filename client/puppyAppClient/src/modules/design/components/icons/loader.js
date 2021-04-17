import { Machine, assign, interpret } from 'xstate'

import { Storage } from '@/utils/storage'

const getIconUri = (context, event) => Storage.loadRefUriFromUrl(`/svgs/${context.icon}.svg`)

const definition = (icon) => ({
  initial: 'loading',
  context: { icon, iconUri: null, retry: 0 },
  states: {
    loading: {
      invoke: {
        id: 'icon-loader-service',
        src: 'getIconUri',
        onDone: {
          target: 'loaded',
          actions: ['setIconUri']
        },
        onError: {
          target: 'failed',
          actions: ['setRetry', 'invalidateIcon', 'invalidateCache']
        }
      }
    },
    loaded: {},
    failed: {
      always: [
        { target: 'loading', cond: 'shouldRetry' }
      ]
    }
  }
})

const options = {
  services: {
    getIconUri
  },
  actions: {
    setIconUri: assign({ iconUri: (context, event) => event.data }),
    setRetry: assign({ retry: (context, event) => context.retry + 1 }),
    invalidateIcon: assign({ iconUri: null }),
    invalidateCache: (context, event) => Storage.invalidateRef(context.icon)
  },
  guards: {
    shouldRetry: (context, event) => context.retry < 2
  }
}

export const createLoaderMachine = (icon) => Machine(definition(icon), options)
