# botzo

Slack Bot based on [Botkit](https://github.com/howdyai/botkit)

Gets angry about almost anything. Tbh, everything.

### Install
* `git clone https://github.com/patillacode/botzo.git`
* Follow [Botkit's installation](https://github.com/howdyai/botkit#installation) guide (do it within botzo folder)

### Run
* I run the bot from a bash script, that I saved within the `node_modules/botkit/` folder, very simple:

```bash

#! /bin/bash

TOKEN="YOUR_SLACK_TOKEN"

run="token=$TOKEN node \"../../botzo.js\""
eval $run

```

Once saved as botzo.sh just run `./botzo.sh` and it should be fine :)
