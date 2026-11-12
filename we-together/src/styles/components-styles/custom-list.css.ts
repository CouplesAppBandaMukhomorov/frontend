import { globalStyle, style } from '@vanilla-extract/css';
import iconDefault from '../../assets/custom-list-pink.svg'; 
import iconSecond from '../../assets/custom-list-yellow.svg';

export const customList = style({
  listStyle: 'none',
  paddingLeft: '0',
  margin: '0',
  fontSize: '16px',
  lineHeight: '24px',
});

export const listText = style({
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: '400',
})

export const margin = style({
    marginTop: '124px',
    marginLeft: '32px',
    marginRight: '32px',
})

globalStyle(`${customList} > li`, {
  position: 'relative',
  paddingLeft: '28px',
  marginBottom: '12px',
});

globalStyle(`${customList} > li::before`, {
  content: '""',
  position: 'absolute',
  left: 0,
  top: '2px',
  width: '20px',
  height: '20px',
  backgroundImage: `url(${iconDefault})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
});

globalStyle(`${customList} > li:nth-child(2)::before`, {
  backgroundImage: `url(${iconSecond})`,
});