import chai from 'chai'
import SimpleRouter from '..'
const { expect } = chai

describe('PathnameRouter', () => {
  it('should work', () => {
    expect(SimpleRouter).to.be.a('function')
    const router = new SimpleRouter
    expect(router).to.be.an.instanceof(SimpleRouter)
    expect(router.routes).to.be.an('array')
    expect(router.map).to.be.an('function')

    let route
    route = router.resolve({
      pathname: '/'
    })

    expect(route).to.be.undefined

    router.map('/',              {name: 'HomePage'})
    router.map('/about',         {name: 'AboutPage'})
    router.map('/posts/:postId', {name: 'PostShowPage'})
    router.map('*path',          {name: 'CatchAllPage'})

    route = router.resolve({
      pathname: '/'
    })
    expect(route).to.be.an('object')
    expect(route.params).to.eql({
      name: 'HomePage'
    })

    route = router.resolve({
      pathname: '/about'
    })
    expect(route).to.be.an('object')
    expect(route.params).to.eql({
      name: 'AboutPage'
    })

    route = router.resolve({
      pathname: '/posts/1234'
    })
    expect(route).to.be.an('object')
    expect(route.params).to.eql({
      name: 'PostShowPage',
      postId: '1234',
    })

    route = router.resolve({
      pathname: '/broken-bad/url.here'
    })
    expect(route).to.be.an('object')
    expect(route.params).to.eql({
      name: 'CatchAllPage',
      path: 'broken-bad/url.here',
    })
  })
})
