# Josh Hawkins is...

This is the repo powering my tech blog / personal site.

It's written to be hosted on a `.is` TLD and have URLs be human readable (`josh.hawkins.is/a-writer`). You can easily fork this repo and add your own content to achieve the same effect!

It's written entirely in JavaScript and utilizes [Next.js](https://github.com/zeit/next.js) for server-side rendering with React.

If you're unimpressed, I wrote this in a bit of spare time between more fun and exciting open source projects, and mostly because I was about to graduate and seek full time employment. I was perfectly happy with the old blog, but I figured a passionate web dev should at least make their own website as a demo, not just use a static site generator. Maybe that's silly, but this site serves to tick the box and not much more. It's simple, works, houses my blog, and that's about all I ever wanted from it. Feel free to look at my other projects if you're interested to see something cool or where my passion really shines!

## Deploying to `now.sh`

1.  Fill out the `.env` file with necessary environment variables
2.  Deploy with `now`
3.  Double-check that the site works as expected with any new changes in production
4.  Once confirmed, alias with `now alias`

## Publishing an article

1.  Draft the article in `/pages/writing-about` (This link can be shared but won't be publicly visible until added to the database)
2.  Add to database to make public / discoverable

## Publishing a project

1.  Simply write the project according to the GraphQL schema and add it to the database

## Configuration

Drop a `.env` file in the root folder and populate the following values:

* MONGO_USER
* MONGO_PASS
