import {Dimensions, PixelRatio, Platform} from 'react-native'; 
 
// Get screen dimensions 
let screenData = Dimensions.get('window'); 
 
// Screen breakpoints 
export const breakpoints = { 
  small: 350,    // Small phones 
  medium: 400,   // Regular phones   
  large: 500,    // Large phones 
  tablet: 768,   // Tablets 
  desktop: 1024, // Large tablets/desktop 
}; 
 
// Device type detection 
export const getDeviceType = () => { 
  const {width} = screenData; 
  if (width < breakpoints.small) return 'small'; 
  if (width < breakpoints.medium) return 'medium'; 
  if (width < breakpoints.large) return 'large'; 
  if (width < breakpoints.tablet) return 'tablet'; 
  return 'desktop'; 
}; 
 
// Responsive width percentage 
export const wp = (percentage) => { 
  const value = (percentage * screenData.width) / 100; 
  return Math.round(PixelRatio.roundToNearestPixel(value)); 
}; 
 
// Responsive height percentage 
export const hp = (percentage) => { 
  const value = (percentage * screenData.height) / 100; 
  return Math.round(PixelRatio.roundToNearestPixel(value)); 
}; 
 
// Responsive font size 
export const rf = (size) => { 
  const scale = screenData.width / 320; 
  const newSize = size * scale; 
  if (Platform.OS === 'ios') { 
    return Math.round(PixelRatio.roundToNearestPixel(newSize)); 
  } else { 
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2; 
  } 
}; 
 
// Grid columns based on device type 
export const getGridColumns = () => { 
  const deviceType = getDeviceType(); 
  switch (deviceType) { 
    case 'small': return 1; 
    case 'medium': return 2; 
    case 'large': return 2; 
    case 'tablet': return 3; 
    default: return 4; 
  } 
}; 
 
// Update screen data on orientation change 
export const updateScreenData = () => { 
  screenData = Dimensions.get('window'); 
}; 
 
// Listen for orientation changes 
export const listenForOrientationChange = (callback) => { 
  const subscription = Dimensions.addEventListener('change', () => { 
    updateScreenData(); 
    callback(); 
  }); 
  return subscription; 
}; 
 
// Responsive spacing 
export const spacing = { 
  xs: wp('1%'), 
  sm: wp('2%'), 
  md: wp('4%'), 
  lg: wp('6%'), 
  xl: wp('8%'), 
}; 
 
// Responsive typography 
export const typography = { 
  h1: rf(28), 
  h2: rf(24), 
  h3: rf(20), 
  h4: rf(18), 
  body: rf(16), 
  caption: rf(14), 
  small: rf(12), 
}; 
 
// Check if device is tablet 
export const isTablet = () => { 
  return getDeviceType() === 'tablet' || getDeviceType() === 'desktop'; 
}; 
 
// Get adaptive padding based on device type 
export const getAdaptivePadding = () => { 
  const deviceType = getDeviceType(); 
  switch (deviceType) { 
    case 'small': return spacing.md; 
    case 'medium': return spacing.md; 
    case 'large': return spacing.lg; 
    default: return spacing.xl; 
  } 
};