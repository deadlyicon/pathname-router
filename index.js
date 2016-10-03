export default class PathnameRouter {
  constructor(){
    this.routes = []
    this.map = this.map.bind(this)
  }

  map(pathExpression, params){
    this.routes.push({ pathExpression, params })
    return this
  }

  resolve(location){
    let resolvedRoute
    this.routes.find(route => {
      if (!('paramNames' in route) || !('regexp' in route)){
        Object.assign(route, parsePathExpression(route.pathExpression))
      }
      const parts = location.pathname.match(route.regexp)
      if (!parts) return false
      parts.shift();
      const params = Object.assign({}, route.params)
      route.paramNames.forEach(paramName => {
        params[paramName] = decodeURIComponent(parts.shift()).replace(/\+/g, ' ')
      })
      resolvedRoute = {
        params: params,
        location: location,
      }
      return true
    })
    return resolvedRoute
  }
}


const escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g
const namedParams  = /\/?(:|\*)([^\/?]+)/g
const parsePathExpression = (expression) => {
  let paramNames = [];
  expression = expression.replace(escapeRegExp, '\\$&')
  expression = expression.replace(namedParams, (_, type, paramName) => {
    paramNames.push(paramName)
    if (type === ':') return '/([^/?]+)';
    if (type === '*') return '/(.*?)';
  })
  let regexp = new RegExp('^'+expression+'$');
  return {
    paramNames: paramNames,
    regexp: regexp,
  }
}
