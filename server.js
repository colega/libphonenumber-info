const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const pathMatch = require('path-match')
const requestCountry = require('request-country')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const route = pathMatch()

const numberRouteMatch = route('/:number(\\d+)')
const numberAndCountryRouteMatch = route('/:country([A-Za-z]{2})/:number(\\d+)')

app.prepare()
.then(() => {
  createServer((req, res) => {
    const { pathname, query } = parse(req.url, true)
    let params = numberAndCountryRouteMatch(pathname)
    if (params === false) {
      params = numberRouteMatch(pathname)
    }

    let country = requestCountry(req, "ES")
    if (params === false) {
      params = { country }
    } else if (!params.country) {
      params.country = { country }
    }

    app.render(req, res, '/index', Object.assign(params, query))
  })
  .listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
