import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import config from '../config';
import { cloudImg } from '../utils';
import { FB_APP_ID, MESSENGER_LINK } from '../constants';

/* eslint-disable react/no-danger */

class Html extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    styles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        cssText: PropTypes.string.isRequired,
      }).isRequired,
    ),
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    app: PropTypes.object, // eslint-disable-line
    children: PropTypes.string.isRequired,
  };

  static defaultProps = {
    styles: [],
    scripts: [],
  };

  render() {
    const { title, description, styles, scripts, app, children } = this.props;
    return (
      <html className="no-js" lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="author" content="Adam Goldman" />
          <meta name="owner" content="Adam Goldman" />
          <meta name="copyright" content="Adam Goldman" />
          <meta name="language" content="EN" />
          <meta name="robots" content="index,follow" />
          <meta name="description" content="Relax, it's just life ..." />
          <meta
            name="subject"
            content="Adam Goldman's adventures and brain explorations"
          />

          <meta
            property="og:image"
            content={`${cloudImg('adamgoldman.me/profile-smiling')}.jpg`}
          />
          <meta property="og:title" content="Adam Goldman" />
          <meta property="og:description" content="Relax, It's just life ..." />
          <meta property="og:site_name" content="Adam Goldman" />
          <meta property="og:type" content="website" />
          <meta property="fb:app_id" content={FB_APP_ID} />
          {scripts.map(script => (
            <link key={script} rel="preload" href={script} as="script" />
          ))}
          <link rel="stylesheet" href="/main.css" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="theme-color" content="#ffffff" />
          {styles.map(style => (
            <style
              key={style.id}
              id={style.id}
              dangerouslySetInnerHTML={{ __html: style.cssText }}
            />
          ))}
        </head>
        <body>
          <div id="fb-root" />
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          <script
            dangerouslySetInnerHTML={{ __html: `window.App=${serialize(app)}` }}
          />
          {scripts.map(script => <script key={script} src={script} />)}
          {config.analytics.googleTrackingId && (
            <script
              dangerouslySetInnerHTML={{
                __html:
                  'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
                  `ga('create','${config.analytics
                    .googleTrackingId}','auto');ga('send','pageview')`,
              }}
            />
          )}
          {config.analytics.googleTrackingId && (
            <script
              src="https://www.google-analytics.com/analytics.js"
              async
              defer
            />
          )}
          <a
            style={{ position: 'fixed', bottom: 20, left: 20 }}
            href={MESSENGER_LINK}
            target="_blank"
            rel="nofollow noreferrer noopener"
          >
            <img
              src="https://cdn.supple.com.au/wp-content/themes/supple/img/msg.png"
              alt="Messenger Link"
              style={{ width: 100 }}
            />
          </a>
        </body>
      </html>
    );
  }
}

export default Html;
