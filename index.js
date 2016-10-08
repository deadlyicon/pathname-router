import pathToRegexp from 'path-to-regexp'
import querystring from 'querystring'

export default class PathnameRouter {
  constructor(){
    this.routes = []
    this.map = this.map.bind(this)
  }

  map(pathExpression, params){
    const route = new Route(pathExpression, params)
    this.routes.push(route)
    return this
  }

  resolve(pathname){
    let resolvedRoute
    this.routes.find(route => {
      return resolvedRoute = route.match(pathname)
    })
    return resolvedRoute
  }
}

class Route {
  constructor(pathExpression, params){
    this.pathExpression = pathExpression
    this.params = params
    this.regexp = pathToRegexp(pathExpression)
  }

  match(pathname){
    const matches = this.regexp.exec(pathname)
    if (!matches) return false
    const params = Object.assign({}, this.params)
    this.regexp.keys.forEach((key, index) =>
      params[key.name] = matches[index+1]
    )
    return params
  }
}

const searchToObject = (search) => {
  return querystring.parse((search || '').replace(/^\?/, ''))
}
