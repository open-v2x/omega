import { dataFormat } from '#/utils';

export const formatSpeed = (speed: number) => dataFormat(speed * 0.02 * 3.6, 'km/h');

export const formatHeading = (heading: number) => dataFormat(heading * 0.0125, '°');

export const formatLength = (length: number) => dataFormat(length * 0.01, t('Meter'));
