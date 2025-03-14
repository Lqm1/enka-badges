# EnkaBadges
Show off your gacha game stats on your GitHub profile!<br>
Generate shields.io style badges, like this!
<br>
![AR](https://enka-badges.lami.workers.dev/genshin/895578273/ar)
<br>
![AR](https://enka-badges.lami.workers.dev/genshin/895578273/abyss?colour=ff7700&style=for-the-badge)
<br>
Also works with Honkai: Star Rail!
<br>
![AR](https://enka-badges.lami.workers.dev/hsr/834466088/characters?colour=f66f75&style=social)
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
- [badge-maker](https://npm.im/badge-maker) for badge generation
