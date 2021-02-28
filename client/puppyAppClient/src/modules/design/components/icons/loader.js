import { Machine, assign, interpret } from 'xstate'
import { firebase } from 'modules/core/database'

const storage = firebase.storage()

const iconBase = 'gs://puppy-time.appspot.com/svgs'

const cachedUrls = {}

const getIconUri = (icon) => {
  return new Promise((resolve, reject) => {
    const cachedUri = cachedUrls[icon]
    if (cachedUri) {
      resolve(cachedUri)
    } else {
      storage.refFromURL(`${iconBase}/${icon}.svg`).getDownloadURL().then(res => {
        cachedUrls[icon] = res
        resolve(res)
      })
    }
  })
}

export const createLoaderMachine = (icon) => Machine({
  initial: 'loading',
  context: { icon, iconUri: null, retry: 0 },
  states: {
    loading: {
      invoke: {
        id: 'icon-loader-service',
        src: (context, event) => getIconUri(context.icon),
        onDone: {
          target: 'loaded',
          actions: assign({ iconUri: (context, event) => event.data })
        },
        onError: {
          target: 'failed',
          actions: [assign({ retry: (context, event) => context.retry + 1 }), (context) => cachedUrls[context.icon] = null]
        }
      }
    },
    loaded: {},
    failed: {
      always: [
        { target: 'loading', cond: (context, event) => context.retry < 2 }
      ]
    }
  }
})
