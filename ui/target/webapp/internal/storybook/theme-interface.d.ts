/** @internal */
export declare type SpecificSizingInterface = {
    minimumButtonSize: string;
    minimumLineSize: string;
    minimumSpacing: string;
};
declare type SizingInterface = {
    mediumSpacing: string;
    largeSpacing: string;
};
declare type BorderRadiusInterface = {
    borderRadius: string;
};
declare type ScreenSizes = {
    minimumScreenSize: string;
    mobileScreenSize: string;
    smallScreenSize: string;
    mediumScreenSize: string;
};
declare type ZIndexes = {
    zIndexMenubar: number;
    zIndexLightbox: number;
    zIndexLoadingCompanion: number;
    zIndexSlideout: number;
    zIndexContent: number;
    zIndexConfirmation: number;
    zIndexHelp: number;
    zIndexVerticalMenu: number;
    zIndexDropdown: number;
    zIndexMenuItem: number;
    zIndexBlocking: number;
};
declare type Transitions = {
    transitionTime: string;
    coreTransitionTime: string;
};
declare type FontSizes = {
    minimumFontSize: string;
    mediumFontSize: string;
    largeFontSize: string;
};
declare type Dividers = {
    dividerHeight: string;
    minimumDividerSize: string;
};
declare type Opacity = {
    minimumOpacity: number;
};
export declare type ThemeColorInterface = {
    primaryColor: string;
    positiveColor: string;
    negativeColor: string;
    warningColor: string;
    favoriteColor: string;
    backgroundNavigation: string;
    backgroundAccentContent: string;
    backgroundDropdown: string;
    backgroundContent: string;
    backgroundModal: string;
    backgroundSlideout: string;
};
declare type Current = {
    background: string;
};
declare type ThemeName = {
    theme: string;
};
declare type Helpers = {
    screenSize: number;
    multiple: (multiplier: number, variable: string, unit?: string) => string;
    screenBelow: (specifiedSize: string) => boolean;
};
export declare type ThemeInterface = SizingInterface & SpecificSizingInterface & BorderRadiusInterface & ScreenSizes & ZIndexes & Transitions & FontSizes & Dividers & Opacity & ThemeColorInterface & ThemeName & Helpers & Current;
export {};
