import Link from 'next/link';
import Page from '../layouts/page';

export default () => (
  <Page title="a gamer">
    <p>
      Like so many others, I can attribute at least some portion of my interest
      in computers to video games. These days, I play a few games on the
      Nintendo Switch with friends.
    </p>
    <p>
      If you'd like to play games with me sometime, feel free to add me on
      Nintendo Switch: <code>SW-8449-3127-2310</code>
    </p>
    <p>
      For PC games, you can find me on Steam:{' '}
      <Link href="https://steamcommunity.com/id/hawkinjs">
        <a>@hawkinjs</a>
      </Link>
    </p>
    <p>
      I occasionally stream on Twitch too:{' '}
      <Link href="https://twitch.tv/hawkinjs">
        <a>@hawkinjs</a>
      </Link>
    </p>
  </Page>
);
