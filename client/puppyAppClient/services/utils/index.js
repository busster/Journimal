class HttpBuilderFactory {
  constructor () {
    this.token = null
  }

  createBuilder () {
    const builder = new HttpRequestBuilder()
    builder.withHeader('Authorization', `Bearer ${this.token}`)
    return builder
  }

  createGetBuilder () {
    console.log(this.token)

    const builder = this.createBuilder()
    builder.withMethod('GET')
    return builder
  }

  createPostBuilder () {
    const builder = this.createBuilder()
    builder.withMethod('POST')
    return builder
  }
}

export class HttpRequestBuilder {
  constructor () {
    this.method = null
    this.url = null
    this.headers = {
      'Content-Type': 'application/json'
    }
    this.body = null
  }
  withMethod (method) {
    this.method = method
    return this
  }
  withUrl (url) {
    this.url = url
    return this
  }
  withHeader (key, value) {
    this.headers[key] = value
    return this
  }
  withBody (body) {
    this.body = body
    return this
  }

  async send (body) {
    switch (this.method) {
      case 'GET':
        return fetch(this.url, {
          method: 'GET',
          headers: this.headers
        });
      case 'POST':
        return fetch(this.url, {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify(body)
        });
    }
  }
}

export const httpBuilderFactory = new HttpBuilderFactory()
