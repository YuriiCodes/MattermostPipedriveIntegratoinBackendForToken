# Mattermost x PipeDrive integration
##  About the product & what problems does it solve
When a new potential client submits the form on the ElifTech website, a message with info that he submitted is sent to a special MatterMost channel. To add new lead details, however, the sales representative has to manually open up the web version of PipeDrive. That action is a problem, since it takes a lot of time. Moreover, this routine can be and should be automated. That’s why we created a MatterMost x Pipedrive integration plugin.

The plugin allows to create PipeDrive leads directly from the MatterMost channel. It adds a custom message, when there’s a new lead:
**![](https://lh4.googleusercontent.com/kBQTuTj1YC1OxvrPQ8E65TmeuLnVyBmutHYJqE31ughoUEpgG_8SH_IUKvV3lDFI8F1gxROkpb863isYrrK9sim5aVY7n1yg6sCcg0URmBKFW5ZZU4PQQ5SNMbV8Q02mssfMTTD1rNHxmiJQEKCVCP9GC2EzHzJLURX8pflBga8yFJLzFgvJHEdFvhFe0w)**
Then, when someone in the channel wants to process the lead, he simply has to click on a plugin button , and a form with lead info will show up:
**![](https://lh3.googleusercontent.com/jSLdxuW_y2fxJ9fRmU-ViBvodHySw-oL4OXlDQXiRUpN4h_96VxfBt9S-ydlxVdEHnQtMoHFkviHT1yOBpt7sk6GffzjMChFoRd272fI4lS8BRKY3MFms1Zh8SJkKQOHmfDLsmCjQOS5H90g4NlkxDT5IGuJ2imAzYAMSdc4XYwS9TLwGLIeUREf3taVig)**
There’s an ability to create a new person:
**![](https://lh6.googleusercontent.com/Z9splcU9-mYeK_QbHveJhjt7Y2eCNSCaoWgPzZydBlf38XUyNIl3CnvrHVq2oAjOWUN_WO81dCSe4uSI96eKmzV65cDHyPM-WAXzTHTDX7APNIYysoY4-bR23-MAdZ1Xj615SZiQznOaGlpC89l86v2ZQ0vpKv6w4CmJz59akUYmzlts4y3uaGypJt6PDg)**
OR select an existing person to be associated with this particular lead:
**![](https://lh4.googleusercontent.com/xmMMmx9QBuZzGMkxojNQ0VPJvJi_1d7bMhBgM-N0d0fbq3g4EXKlnKiknQQGqeUz9YBs1St2JTU2B0kh7ZWN1PrwtZiyQ5WY-Az009nWNTKUDGJ_kWoKt3SGcjp_RCrSDXLYMJs75yuhSAvrp6IncjVm59yJILEmuo__zyQtgeuSl_f32JEo28kGGySy0g)**
After successfully adding a lead, the plugin will render a success pop-up & change lead status in the channel:
**![](https://lh6.googleusercontent.com/8acSLOTioefyx3R7WPxLndNIXPxI6wCoM42aCvecluhkvGIbCtlq2v2LMHtjPpMEzxnw7JRLtEOEzgmohmKhmxkvUx00qkFZserx4fcqDohySG8wf1RFiLBM9X0U_u0jcrvzCPUTmgOwpWoNOBja1kLLsfcPTmFR6JUU33lS72l5_20uRxWkM3wl4FgVUg)**
For initial config, plugin needs PipeDrive API key & LinkedIn credentials (Not implemented yet, so can be filled with dummy data).

Moreover, the plugin implements API key sanity check, so if it is invalid, the plugin will show error message & ask the user to submit it one more time:
**![](https://lh6.googleusercontent.com/Zy9w4ED8hjdP0uqE1XSaaDxTUETfEoyUU9HY1pEc_XMkys0mTczJM1b7yu4TXP50Hg3BdUfRNaPlHfmavxg0d4TPA5om_7FaB8clU2iiUaarzyxphSxeIvsLZaJtaDjJ-Vzzm2BtF5mj6RWqgvsO6P5gzid6ZVhe5bDj2zcUzrYFcjFPbpR7WdQqbKuTQA)**
## Tech stack
Back end:
-   Nest.js & TypeScript
-   MongoDB
-   Prisma ORM
   
Front end:
-   React.js & TypeScript
-   Axios
-   Ant Design

## Architecture diagram:
**![](https://lh6.googleusercontent.com/52-QDB1TzQtRUKMYgVan0siiUdt6-ebjGCJF15gSojOgnyv432A9jpdWc7weUfgGRo9NQiSYHIzDJ23R8LGxDhqgckBRFoG1F9qEMFK3O87lyn1Fpv_4pNTm7h5lwwuKq5KJN8ZlPbY2wzdY7fDJitllMFh4gJK6mllayG_n5msRyaH2dKeVpfCaukkz)**
## How to deploy the back end?
There are two deployment options:
 **Via Docker** :
1.  Install Docker on the host machine ([how to install it on Ubuntu](https://docs.docker.com/engine/install/ubuntu/))
2.  Install git
3.  Install the back-end code: run git pull **[https://bitbucket.org/eliftech/cpd-pipedrive-integration-backend/](https://bitbucket.org/eliftech/cpd-pipedrive-integration-backend/)**
4.  Open the downloaded project folder: run cd MattermostPipedriveIntegratoinBackendForToken
5.  Build the container: run docker compose build
6.  Start the container: run docker compose up
    

  Manually:
1.  Install git
2.  Install the back-end code: run git pull **[https://bitbucket.org/eliftech/cpd-pipedrive-integration-backend/](https://bitbucket.org/eliftech/cpd-pipedrive-integration-backend/)**
3.  Open the downloaded project folder: run cd MattermostPipedriveIntegratoinBackendForToken
4.  Install the dependencies: run npm install
5.  Initialize the Prizma ORM: run npx prisma generate
6.  Create a "dist" folder with the production build: run npm run build   
7.  Start the server in production mode: run npm run start:prod
 
To see available swagger docs, visit [http://3.122.243.28:443/swagger](http://3.122.243.28:443/swagger), or when deployed elsewhere - go to */swagger* route.

 ## How to install the Mattermost plugin?
Prerequisites:
1.  The exact version of Node.js - v14.15.1.
2.  At least 1.16 version of Golang.
3.  Git

**Installation:**

 -  Clone project repository. Run:
git pull [https://github.com/drg-v/eliftech-pipedrive-integration.git](https://github.com/drg-v/eliftech-pipedrive-integration.git)

 -  Create admin’s personal access token inside via Mattermost Webapp: [https://docs.mattermost.com/developer/personal-access-tokens.html](https://docs.mattermost.com/developer/personal-access-tokens.html)
    
 -  Enable plugin uploads in your Mattermost Server:

 - Go to System Console.   Type ‘Plugin Management’ in the search input
   field.       Set ‘Enable plugins’ to true.сс

**![](https://lh4.googleusercontent.com/AxBNWBcqIknAz4pYHeSGWwtO0wFiVZiafYRGMxXCStRkuTBYvtIAk8y0IWgwtJaE0mxW2uIN6YuSYhNDSNOgUSC-4-DsHeRA8c7X2LNS08vmj0KFpLP9V_kDmqcKombz3EhhUiV-IcJCl6E255M6zPUM4Xm_tjdz2Vc-hwUJgV_mlGZhEGmY00TouaQNZw)**
5.  Change baseURL inside ‘webapp/src/API/services/pipedrive/http-common.ts’ and ‘webapp/src/API/services/userInfo/http-common.ts’. It must point to the previously deployed backend.
6. Type the following commands in the terminal:

- *export MM_SERVICESETTINGS_SITEURL=[url to your mattermost server]*

- *export MM_ADMIN_TOKEN=[previously generated personal access token]*

- *make deploy*

Example of deploy configuration:

 - export MM_SERVICESETTINGS_SITEURL=http://localhost:8065

 - export MM_ADMIN_TOKEN=j44acwd8obn78cdcx7koid4jkr

 - make deploy

  **Instead of the previous step you can:**
  

 - run: make build.

    

 - It will create a plugin file in the ‘/dist’ folder.

    
-   Go to the Mattermost System Console.
  - In the search input field type ‘Plugin Management’.  
-   Choose plugin file location:
**![](https://lh4.googleusercontent.com/eVZaTOYR9jgE6o-IebcbwjKPCKPmSR5HZdmw_eIOrrgmIJSV_VBLZMGPCsyB4QqxxWt1ye9EuszazHVR8UDDW436jRSY14a1JJrw7PbCRPFN75ZfNK6fgox5b_A4FxXBB3FNJBdCo4TGJbU5jciDUnIjpdRasRCUJVrD6vX1NMGkEq9hqWt6Nix1zzNrSw)**

7. Inside the Mattermost Webapp go to the Marketplace. Find the ‘Eliftech Pipedrive Integration plugin’. Press ‘configure’ and ensure that it is enabled.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
# MattermostPipedriveIntegratoinBackendForToken
