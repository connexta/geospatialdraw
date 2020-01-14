/** @internal */
import { ThemeInterface } from './theme-interface';
export declare type ColorMode = 'dark' | 'light' | 'sea';
export declare type SpacingMode = 'comfortable' | 'cozy' | 'compact';
declare type ThemeOptions = {
    colors: ColorMode;
    spacing: SpacingMode;
};
declare const _default: (options?: ThemeOptions) => ThemeInterface;
export default _default;
