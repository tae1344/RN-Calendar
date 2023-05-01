type Black = 's100' | 's200';
export const black: Record<Black, string> = {
  s100: '#303030',
  s200: '#000000',
};

type White = 's100' | 's200' | 's300';
export const white: Record<White, string> = {
  s100: '#ffffff',
  s200: '#fafafa',
  s300: '#f3f3f3',
};

type Gray = 's100' | 's200' | 's300' | 's400' | 's500';
export const gray: Record<Gray, string> = {
  s100: '#eeeeee',
  s200: '#cccccc',
  s300: '#aaaaaa',
  s400: '#888888',
  s500: '#666666',
};
