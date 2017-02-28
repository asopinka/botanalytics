# botanalytics middleware for Botkit
A middleware package for [Botkit](http://howdy.ai/botkit) that easily logs your convos in [BotAnalytics.co](http://botanalytics.co)

_**Currently only supports Slack right now.**_

## Install

`npm install botanalytics-middleware --save`

## Usage

It's really simple!

First, in your `bot.js` file, include this module and initialize it with your botanalytics token.

```
var botanalytics = require('botanalytics')(TOKEN).slack;
```

Second, add the following code, usually right after initializing the Botkit controller.

```
controller.middleware.receive.use(botanalytics.receive);
controller.middleware.send.use(botanalytics.send);
```

Lastly, ensure your initial `controller.spawn` code looks something like this:

```
controller.spawn(teams[t]).startRTM(function(err, bot, res) {
  if (err) {
    console.log('Error connecting bot to Slack:',err);
  } else {
    botanalytics.connect(res);
    trackBot(bot);
  }
});
```
**Note that the `startRTM` callback returns a `res` parameter, and before `trackBot` is called, you make the call to `botanalytics.connect`, passing in the `res` object.**

# Disclaimer

All mention of botanalytics and its use in this project are copyright of botanalytics at http://botanalytics.co

I do not work for botanalytics nor does botanalytics endorse this project in any way.  I'm just a chatbot developer who needs analytics on my bots.

# License

MIT License

Copyright (c) 2016 Alex Sopinka

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
