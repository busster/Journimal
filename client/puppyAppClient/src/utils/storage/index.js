import { firebase } from 'modules/core/database'
const storage = firebase.storage()

const storageBase = 'gs://puppy-time.appspot.com'

class InternalStorage {
  constructor () {
    this.localCache = {}
  }

  async loadRefUriFromUrl (url) {
    const cached = this.localCache[url]
    if (cached) return cached
    const res = await storage
      .refFromURL(`${storageBase}${url}`)
      .getDownloadURL()
    
    this.localCache[url] = res
    return res
  }

  invalidateRef (url) {
    delete this.localCache[url]
  }
}

export const Storage = new InternalStorage()
