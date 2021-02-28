import { Machine, assign, interpret } from 'xstate'
import { firebase } from 'modules/core/database'

const storage = firebase.storage()

const iconBase = 'gs://puppy-time.appspot.com/svgs'

const getIconUri = (icon) => storage.refFromURL(`${iconBase}/${icon}.svg`).getDownloadURL()

export const createLoaderMachine = (icon) => Machine({
  initial: 'loading',
  context: { icon, iconUri: null },
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
          target: 'failed'
        }
      }
    },
    loaded: {},
    failed: {}
  }
})
