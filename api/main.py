# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START gae_python38_app]
import asyncio
from pyppeteer import launch
from aiohttp import web
from urllib.parse import unquote

async def abar(name):

  text='test'
  browser = await launch(
          headless=True,
          executablePath='/opt/headless-chromium',
          args=[
              '--no-sandbox',
              '--single-process',
              '--disable-dev-shm-usage',
              '--disable-gpu',
              '--no-zygote'
          ])
  page = await browser.newPage()
  await page.goto('https://www.calligrapher.ai/')
  await page.waitFor(1000)
  await page.type('#text-input', text)
  await page.click('#draw-button')
  await page.waitFor(1500)
  await page.screenshot({'path': 'example.png'})

  dimensions = await page.evaluate('''() => {
      return {
          svg : Array.from(document.querySelectorAll('#canvas path')).map(e => e.attributes[0].nodeValue)
      }
  }''')


  # >>> {'width': 800, 'height': 600, 'deviceScaleFactor': 1}
  await browser.close()

  #return web.Response(text="Hello, world")
  return (dimensions)

async def hello(request):
    return web.Response(text="Hello, world")

async def handle(request):
    name = request.match_info.get('string', "write here")

    url = await abar(unquote(name))

    return web.json_response(url)

if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    #app.run(host='127.0.0.1', port=8080, debug=True)
    app = web.Application()
    app.add_routes([web.get('/', handle), web.get(r'/{string:[\w\s%]+}', handle)])
    web.run_app(app)
# [END gae_python38_app]
