/**
 * GYMTTRICHv2 Theme Configuration
 */

import { Platform } from 'react-native';

const tintColorLight = '#5e6ad2';
const tintColorDark = '#5e6ad2';

export const Colors = {
  light: {
    text: '#ffffff',
    textMuted: '#94a3b8',
    background: '#0f1115',
    panel: '#181b21',
    card: '#1f232b',
    hover: '#2a2f3a',
    border: '#2d3342',
    primary: '#5e6ad2',
    secondary: '#26c6da',
    accent: '#ff7043',
    success: '#00e676',
    danger: '#ff5252',
    tint: tintColorLight,
    icon: '#94a3b8',
    tabIconDefault: '#94a3b8',
    tabIconSelected: tintColorLight,
    best: 'rgb(29, 168, 29)'
  },
  dark: {
    text: '#ffffff',
    textMuted: '#94a3b8',
    background: '#0f1115',
    panel: '#181b21',
    card: '#1f232b',
    hover: '#2a2f3a',
    border: '#2d3342',
    primary: '#5e6ad2',
    secondary: '#26c6da',
    accent: '#ff7043',
    success: '#00e676',
    danger: '#ff5252',
    tint: tintColorDark,
    icon: '#94a3b8',
    tabIconDefault: '#94a3b8',
    tabIconSelected: tintColorDark,
    best: 'rgb(29, 168, 29)'
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'System',
    serif: 'System',
    rounded: 'System',
    mono: 'System',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
