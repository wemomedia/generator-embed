import * as components from './index.js'

export const blankTemplate = {
  pageStyle: {
    background: '#e0e2e4',
    containerBackground: '#e0e2e4'
  },
  components: [
    components.WhiteSpace
  ]
}

export const headerPageTemplate = {
  pageStyle: {
    background: 'rgba(245,245,245,1)',
    containerBackground: 'rgba(255,255,255,1)'
  },
  components: [
    components.Header,
    components.Video,
    components.Headline,
    components.Paragraph,
    components.Button
  ]
};

export const fullscreenVideoTemplate = {
  pageStyle: {
    background: 'rgba(0,0,0,0.15)',
    containerBackground: 'rgba(0,0,0,0)'
  },
  components: [
    components.FullscreenVideo,
    components.Headline,
    components.Button
  ]
};

const aboutHeadlineData = Object.assign({}, components.Headline.data)
const aboutHeadline = Object.assign({}, components.Headline)
aboutHeadlineData.text = 'WHAT IS TRANSPORT?';
aboutHeadlineData.fontSize = '2.5';
aboutHeadlineData.fontWeight = '500';
aboutHeadlineData.letterSpacing = '0.0';
aboutHeadline.data = aboutHeadlineData;

export const videoPageTemplate = {
  pageStyle: {
    background: 'rgba(200,200,200,1)',
    containerBackground: 'rgba(200,200,200,1)'
  },
  components: [
    components.VideoHeader,
    aboutHeadline,
    components.Paragraph,
    components.Video,
    components.Button,
    components.WhiteSpace,
  ]
};

export const transportPageTemplate = {
  pageStyle: {
    background: 'rgba(245,245,245,1)',
    containerBackground: 'rgba(255,255,255,1)'
  },
  components: [
    components.TransportHeader,
    components.Video,
    components.Headline,
    components.Paragraph,
    components.Button
  ]
};


// define custom article template
const articleHeadlineData = Object.assign({}, components.Headline.data)
const articleHeadline = Object.assign({}, components.Headline)
articleHeadlineData.text = 'By TransportVR.com';
articleHeadlineData.fontSize = '1.15';
articleHeadlineData.alignment = 'left';
articleHeadlineData.fontWeight = '500';
articleHeadline.data = articleHeadlineData;

const articleDateData = Object.assign({}, components.Paragraph.data)
const articleDate = Object.assign({}, components.Paragraph)
articleDateData.text = '<p>June 9, 2017</p>'
articleDate.data = articleDateData;

const whiteSpaceData = Object.assign({}, components.WhiteSpace.data)
const articleSpace = Object.assign({}, components.WhiteSpace)
whiteSpaceData.height = '2'
articleSpace.data = whiteSpaceData;

const articleCard1Data = Object.assign({}, components.ArticleCard.data)
const articleCard1 = Object.assign({}, components.ArticleCard)
// date: 'June 13, 2017',
articleCard1Data.headline = '[article1 title]'
articleCard1.data = articleCard1Data
// text: 'Lorem ipsum dolor sit amet, insolens reprimique te eum. Ut vim error adolescens disputationi, per ad malorum praesent. Veniam laboramus sed ea, eum ea zril sapientem dissentias. Tinsolens reprimique te eum. Ut vim error adolescens disputationi.',
// link: 'New Works Explore Sensory Manipulation in Art and Storytelling',
// url: 'https://www.transportvr.com/transport-tribeca',

export const articleTemplate = {
  pageStyle: {
    background: '#e0e2e4',
    containerBackground: '#e0e2e4'
  },
  components: [
    components.ArticleHeader,
    articleDate,
    components.SocialShare,
    components.Paragraph,
    components.Video,
    articleCard1

  ]
};
// end article template

// define transport home template
const homeWhiteSpaceData = Object.assign({}, components.WhiteSpace.data)
const homeSpace = Object.assign({}, components.WhiteSpace)
homeWhiteSpaceData.height = '2'
homeSpace.data = homeWhiteSpaceData;

const homePressData = Object.assign({}, components.Section.data)
const homePress = Object.assign({}, components.Section)
homePressData.backgroundColor = 'white'
homePressData.image = 'https://www.transportvr.com/xassets/home/home-press-logos.png?4'
homePressData.headline = 'Featured in'
homePressData.link = 'https://www.transportvr.com/press'
homePressData.dataTrack = '/event/homepage/press'
homePress.data = homePressData;

const homeWorksData = Object.assign({}, components.Section.data)
const homeWorks = Object.assign({}, components.Section)
homeWorksData.dataTrack = '/event/homepage/TransportWorksOnPCandMobile';
homeWorksData.textColor = 'white';
homeWorks.data = homeWorksData;

const homeParagraphData = Object.assign({}, components.Paragraph.data)
const homeParagraph = Object.assign({}, components.Paragraph)
homeParagraphData.fontSize = '1.1'
homeParagraphData.text = '<p>Immersive. Creative. Inspiring. Wevr is dedicated to bringing more immersive simulations into your life with our Transport VR network. We are embracing the creative community producing brave cutting edge VR and helping them find their audience. We think it’s vital to establish a sustainable business for this community so the medium can evolve and flourish. The annual subscription is our way of creating a symbiotic relationship between artist and audience. It might take a few years for Transport and its creative community to change the world -- but we can change the way you see it today.</p>'
homeParagraph.data = homeParagraphData;


const homeBrowseBtnData = Object.assign({}, components.Button.data)
const homeBrowseBtn = Object.assign({}, components.Button)
homeBrowseBtnData.buttonText = 'BROWSE VR';
homeBrowseBtnData.buttonLink = 'https://www.transportvr.com/explore';
homeBrowseBtnData.buttonColor = '#00e671';
homeBrowseBtnData.dataTrack = '/event/homepage/BrowseVR';
homeBrowseBtn.data = homeBrowseBtnData;

export const transportHomeTemplate = {
  pageStyle: {
    background: 'rgb(237, 239, 240)',
    containerBackground: 'rgb(237, 239, 240)'
  },
  components: [
    components.TransportHomeHeader,
    components.ArticleFeed,
    homeSpace,
    aboutHeadline,
    homeParagraph,
    homeSpace,
    components.Video,
    homeSpace,
    homeBrowseBtn,
    homeSpace,
    components.BrowseContent,
    homePress,
    homeWorks
  ]
};
