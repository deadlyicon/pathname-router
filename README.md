# pathname-router


The route expressions are parsed with https://github.com/pillarjs/path-to-regexp


## Usage

```js
import PathnameRouter from 'pathname-router'

const router = new PathnameRouter

router.map('/',              {name: 'HomePage'})
router.map('/about',         {name: 'AboutPage'})
router.map('/posts/:postId', {name: 'PostShowPage'})
router.map('/:path*',        {name: 'CatchAllPage'})

router.resolve({pathname: '/'})
// => {name: 'HomePage'}

router.resolve({pathname: '/about'})
// => {name: 'AboutPage'}

router.resolve({pathname: '/posts/1234'})
// => {name: 'PostShowPage', postId: '1234'}

router.resolve({pathname: '/bad/path'})
// => {name: 'CatchAllPage', path: 'bad/path'}
````
