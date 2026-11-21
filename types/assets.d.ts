// Static SVG files are bundled as assets (Metro assetExts) and rendered with expo-image.
declare module '*.svg' {
    const asset: number;
    export default asset;
}
