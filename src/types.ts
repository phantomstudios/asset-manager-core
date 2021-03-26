export type assetId = string | number;

export interface AssetConfig {
  id: assetId;
  type: string;
  url: string;
  preload?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any;
}
