import { useMemo } from 'react';

import { getSvgBase64 } from '@/libs/utils';

import { type SvgProps, type SvgStyles } from '../type';

const svgStyleMap: Record<string, SvgStyles> = {
  dark: { fill: 'rgba(78, 64, 229, 1)', fillOpacity: '1.0' },
  light: {
    fill: '#060709',
    fillOpacity: '0.5',
  },
};
const getSvgRaw = (
  color: SvgStyles,
) => `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path d="M17.8466 11.0966C18.2468 10.8785 18.4972 10.4593 18.4972 10.0003C18.4972 9.54132 18.2468 9.12405 17.8466 8.90593L3.33322 1.04799C2.9463 0.837464 2.4892 0.846947 2.10987 1.07265C1.73053 1.29836 1.50293 1.69856 1.50293 2.14238L3.10421 8.39673L9.91228 9.39337C10.3025 9.39337 10.6178 9.66459 10.6178 10.0003C10.6178 10.336 10.3025 10.6072 9.91228 10.6072C6.07554 11.1697 3.80709 11.4996 3.10692 11.5971L1.50293 17.8582C1.50293 18.3021 1.73053 18.7023 2.10987 18.9299C2.4892 19.1556 2.9463 19.1651 3.33322 18.9545L17.8466 11.0966Z" fill="${color.fill}" fill-opacity="${color.fillOpacity}"/>
</svg>
`;

export const useFeishuSvg = (props: SvgProps) => {
  const color = props.theme === 'light' ? svgStyleMap.light : svgStyleMap.dark;
  const svgData = useMemo(() => getSvgBase64(getSvgRaw(color)), [color]);
  return svgData;
};
