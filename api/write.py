import asyncio
from pyppeteer import launch
from flask import Flask

async def abar(text):
  browser = await launch(
      handleSIGINT=False,
      handleSIGTERM=False,
      handleSIGHUP=False
  )
  page = await browser.newPage()
  await page.goto('https://www.calligrapher.ai/')
  await page.waitFor(500)
  await page.type('#text-input', text)
  await page.click('#draw-button')
  await page.waitFor(500)
  #await page.screenshot({'path': 'example.png'})

  dimensions = await page.evaluate('''() => {
      return {
          svg : Array.from(document.querySelectorAll('#canvas path')).map(e => e.attributes[0].nodeValue)
      }
  }''')


  # >>> {'width': 800, 'height': 600, 'deviceScaleFactor': 1}
  await browser.close()

  return (dimensions)

loop = asyncio.get_event_loop()
app = Flask(__name__)

@app.route("/")
def notify():
    return (loop.run_until_complete(abar("test")))

if __name__ == "__main__":
    app.run(debug=False, use_reloader=False)
