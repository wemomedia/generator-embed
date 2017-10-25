import React from 'react';

import ParagraphIcon from 'react-icons/lib/md/format-align-left';
import HeaderIcon from 'react-icons/lib/fa/header';
import FullscreenVideoIcon from 'react-icons/lib/md/ondemand-video';
import ButtonIcon from 'react-icons/lib/md/add-box';
import VideoIcon from 'react-icons/lib/fa/youtube-play';
import CreditIcon from 'react-icons/lib/md/movie';
import AwardIcon from 'react-icons/lib/fa/trophy';
import PressIcon from 'react-icons/lib/fa/newspaper-o';
import ImageIcon from 'react-icons/lib/md/image';
import MusicIcon from 'react-icons/lib/md/music-note';
import ImageTextIcon from 'react-icons/lib/md/art-track';
import WhiteSpaceIcon from 'react-icons/lib/go/unfold';
import QuoteIcon from 'react-icons/lib/md/chat';
import ShareIcon from 'react-icons/lib/md/share'

import styles from './component-menu.scss'

import * as components from '../../../component-data-templates/'

export default function ComponentMenu(props) {
  return (
    <div className={styles['component-menu']}>
      <button onClick={(e) => {props.addComponent(e, components.Headline)}}>
        <HeaderIcon />
        <span>Headline</span>
      </button>
      <button onClick={(e) => {props.addComponent(e, components.Paragraph)}}>
        <ParagraphIcon />
        <span>Paragraph</span>
      </button>
      <button onClick={(e) => {props.addComponent(e, components.Image)}}>
        <ImageIcon />
        <span>Image</span>
      </button>
      <button onClick={(e) => {props.addComponent(e, components.Button)}}>
        <ButtonIcon />
        <span>Button</span>
      </button>
      <button onClick={(e) => {props.addComponent(e, components.WhiteSpace)}}>
        <WhiteSpaceIcon />
        <span>White-Space</span>
      </button>

      <button onClick={(e) => {props.addComponent(e, components.SocialShare)}}>
        <ShareIcon />
        <span>Social Share</span>
      </button>

      <button onClick={(e) => {props.addComponent(e, components.Video)}}>
        <VideoIcon />
        <span>Video</span>
      </button>
      <button onClick={(e) => {props.addComponent(e, components.Audio)}}>
        <MusicIcon />
        <span>Audio</span>
      </button>

      <button onClick={(e) => {props.addComponent(e, components.InlineImage)}}>
        <ImageTextIcon />
        <span>Image with Text</span>
      </button>
      <button onClick={(e) => {props.addComponent(e, components.OverlayImage)}}>
        <ImageIcon />
        <span>Overlayed Image</span>
      </button>

      <button onClick={(e) => {props.addComponent(e, components.PullQuote)}}>
        <QuoteIcon />
        <span>Pull Quote</span>
      </button>
      <button onClick={(e) => {props.addComponent(e, components.Credits)}}>
        <CreditIcon />
        <span>Credits</span>
      </button>
      <button onClick={(e) => {props.addComponent(e, components.Awards)}}>
        <AwardIcon />
        <span>Awards</span>
      </button>
      <button onClick={(e) => {props.addComponent(e, components.Press)}}>
        <PressIcon />
        <span>Press</span>
      </button>
      <button onClick={(e) => {props.addComponent(e, components.ArticleCard)}}>
        <ImageTextIcon />
        <span>Article Card</span>
      </button>

    </div>
  )
}
