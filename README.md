# EnkaBadges
Show off your gacha game stats on your GitHub profile!<br>
Generate shields.io style badges, like this!
<br>
![AR](https://enkabadges-api.maamokun.workers.dev/genshin/827014674/ar)
<br>
![AR](https://enkabadges-api.maamokun.workers.dev/genshin/827014674/abyss?colour=ff7700&style=for-the-badge)
<br>
Also works with Honkai: Star Rail!
<br>
![AR](https://enkabadges-api.maamokun.workers.dev/hsr/827014674/characters?colour=f66f75&style=social)
<br>
This is a fully serverless app designed to run on Cloudflare Workers. It could probably be used on other platforms, such as Vercel, with minimal changes.

## Stack
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Elysia](https://elysiajs.com/)

## Usage
Learn more and use the hosted version at https://enkabadges.mikn.dev/ or clone this repo and run<br>
```bun run deploy```<br>
to deploy your own version.

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

## Special Thanks
- [Enka.Network](https://enka.network/) for providing the player data
- [enkanetwork.js](https://npm.im/enkanetwork.js) an easy to use API wrapper for Enka.Network
- [badge-maker](https://npm.im/badge-maker) for badge generation
- [This article](https://medium.com/@mertenercan/how-to-deploy-elysiajs-app-on-cloudflare-workers-51cc459b078a) for teaching me how to use Elysia on Workers
