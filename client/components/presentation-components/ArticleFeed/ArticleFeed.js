import React from 'react';

import PositionEditor from '../../editor-components/PositionEditor/PositionEditor';

import styles from './article-feed.scss';

export default function ArticleFeed(props) {
  const imageContainerStyle = {};
  const imageStyle = {
    background: `url(${props.data.image}) no-repeat left top / cover`,
  };

  const textStyle = {
    color: `${props.data.textColor}`,
    fontSize: `${props.data.fontSize}em`,
    fontWeight: `${props.data.fontWeight}`,
  }

  const linkStyles = `
    #article-feed-title:hover,
    #article-feed-section a h4:hover,
    #article-feed-section a h3:hover,
    #article-see-more:hover
    { color: ${props.data.linkHoverColor} !important; }
  `

  const responsiveBaseSize = factor => {
    if (props.data.fontSize < 1) return props.data.fontSize
    return props.data.fontSize / factor < 1.1 ? 1.1 : props.data.fontSize / factor
  }

  const responsiveCSS = `
    @media screen and (max-width: 970px) {
      #article-feed-headline { font-size: ${responsiveBaseSize(1.25)}rem !important; }
    }
    @media screen and (max-width: 750px) {
      #article-feed-background { background: linear-gradient(${props.data.backgroundColor}, ${props.data.backgroundColor}), url(${props.data.image}) no-repeat left top / cover !important }
    }
    @media screen and (max-width: 475px) {
      #article-feed-headline { font-size: ${responsiveBaseSize(1.5)}rem !important; }
    }
  `

  let positionEditor;
  if (props.editingIndex == props['data-index'] && props.editingIndex && props.isEditing) {
    imageStyle.border = '2px rgba(0,229,255,.6) solid';
    positionEditor = <div style={{position: 'relative'}}>
      <PositionEditor reorderComponent={props.reorderComponent} editingIndex={props.editingIndex}/>
    </div>
  } else {
    imageStyle.border = 'none';
  }

  return (
    <div id="article-feed-section" className={styles.feedContainer} style={imageContainerStyle}>
      { positionEditor }
      <div
        id="article-feed-background"
        data-index={props['data-index']}
        onClick={(e) => {props.handleClick(e)}}
        className={styles.image}
        style={imageStyle}>
        <div className={styles['article-main']}>

          <div className={styles['article-feature']}>
            <a href="/p/community-feed">
              <p
                id="article-feed-title"
                className={styles['article-label']}
                style={{ color: props.data.accentColor }}>
                TRANSPORT COMMUNITY FEED
              </p>
            </a>

            <a href={`${props.data.urlSlug}`}>
              <span className={styles['article-date']} style={{ color: props.data.accentColor }}>{props.data.date}</span>
              <h3 id="article-feed-headline" style={textStyle}>
                {props.data.headline}
              </h3>
            </a>
            <a href={`${props.data.urlSlug}`}><h4 style={{color: `${props.data.subtextColor}`}}>{props.data.subHeadline}</h4></a>
          </div>

          <div className={styles['previous-articles-section']}>
            <div className={styles['previous-article']}>
              <a href={`${props.data.slot1UrlSlug}`}>
                <span style={{ color: props.data.accentColor }}>{props.data.slot1Date}</span>
                <h4 style={{color: `${props.data.textColor}`}}>{props.data.slot1Headline}</h4>
              </a>
            </div>
            <div className={styles['previous-article']}>
              <a href={`${props.data.slot2UrlSlug}`}>
                <span style={{ color: props.data.accentColor }}>{props.data.slot2Date}</span>
                <h4 style={{color: `${props.data.textColor}`}}>{props.data.slot2Headline}</h4>
              </a>
            </div>
            <div className={styles['previous-article']}>
              <a href={`${props.data.slot3UrlSlug}`}>
                <span style={{ color: props.data.accentColor }}>{props.data.slot3Date}</span>
                <h4 style={{color: `${props.data.textColor}`}}>{props.data.slot3Headline}</h4>
              </a>
            </div>
          </div>

          <a href="/p/community-feed">
            <p
              id="article-see-more"
              className={styles['article-see-more']}
              style={{ color: props.data.accentColor, margin: '2rem auto 1rem' }}>
              More Stories >
            </p>
          </a>

        </div>
      </div>
      <style>{responsiveCSS}</style>
      <style>{linkStyles}</style>
    </div>
  )
}

ArticleFeed.propTypes = {
  data: React.PropTypes.shape({
    urlSlug: React.PropTypes.string.isRequired,
    subHeadline: React.PropTypes.string.isRequired,
    headline: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
    fontSize: React.PropTypes.string.isRequired,
    fontWeight: React.PropTypes.string.isRequired,
    textColor: React.PropTypes.string.isRequired,
    overlayColor: React.PropTypes.string.isRequired,
  }).isRequired,
  'data-index': React.PropTypes.number,
  editingIndex: React.PropTypes.number,
  handleClick: React.PropTypes.func.isRequired,
  isEditing: React.PropTypes.bool,
  reorderComponent: React.PropTypes.func.isRequired,
}
