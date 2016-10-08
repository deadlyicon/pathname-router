import chai from 'chai'
import PathnameRouter from '../index'
const { expect } = chai



describe('PathnameRouter', () => {

  let router
  beforeEach(() => {
    router = new PathnameRouter
    router.map('/',              {name: 'HomePage'})
    router.map('/about',         {name: 'AboutPage'})
    router.map('/posts/:postId', {name: 'PostShowPage'})
    router.map('/:path*',        {name: 'CatchAllPage'})
  })

  it('should be a Constructor', () => {
    expect(PathnameRouter).to.be.a('function')
    expect(router).to.be.an.instanceof(PathnameRouter)
  })

  it('an empty router to resolve undefined', () => {
    expect((new PathnameRouter).resolve({pathname:''})).to.eql(undefined)
  })

  it('should route as expected', () => {
    expect(router.resolve('/')).to.eql({
      name: 'HomePage',
    })

    expect(router.resolve('/about')).to.eql({
      name: 'AboutPage',
    })

    expect(router.resolve('/posts/12')).to.eql({
      name: 'PostShowPage',
      postId: "12",
    })

    expect(router.resolve('/bad/path')).to.eql({
      name: 'CatchAllPage',
      path: "bad/path",
    })
  })

})
