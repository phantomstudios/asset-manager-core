import PQueue from "p-queue";
import { Subject } from "rxjs";

import Asset, { AssetState } from "./BaseAsset";
import { AssetConfig, assetId } from "./types";

interface CacheItem {
  id: assetId;
  asset: Asset;
}

type assetConstructor = { new (config: AssetConfig): Asset };

interface Loaders {
  [key: string]: assetConstructor;
}

class AssetManager {
  private static instance: AssetManager | null;
  public onPreloadProgress = new Subject<number>();
  public onPreloaded = new Subject<boolean>();
  public preloaded = false;
  public progress = 0;
  private cache: CacheItem[] = [];
  private loaders: Loaders = {};

  static getInstance() {
    if (!AssetManager.instance) AssetManager.instance = new this();
    return AssetManager.instance;
  }

  static destroyInstance() {
    if (AssetManager.instance) AssetManager.instance = null;
  }

  setLoaders(loaders: Loaders) {
    this.loaders = loaders;
  }

  setAssets(assets: AssetConfig[], concurrency = 1) {
    const queue = new PQueue({ concurrency });

    this.cache = assets.map((assetConfig) => {
      const CurrentAsset = this.loaders[assetConfig.type];

      // Create the player
      const asset = new CurrentAsset(assetConfig);

      // Preload if its needed
      if (assetConfig.preload) {
        queue.add(() => {
          return new Promise((resolve) => {
            asset.onLoaded.subscribe(() => {
              this.handleAssetPreloaded();
              resolve(asset);
            });
            asset.onProgress.subscribe(() => {
              this.handleAssetPreloaded();
            });
            asset.load();
          });
        });
      }

      return { id: assetConfig.id, asset };
    });

    this.handleAssetPreloaded();
  }

  handleAssetPreloaded() {
    // Count how many assets need preloading and how many loaded
    const counts = this.cache.reduce(
      (memo, item) => {
        if (item.asset.config.preload) {
          memo.toLoad++;
          if (item.asset.state === AssetState.Loaded) {
            memo.loaded++;
          } else {
            memo.loaded += item.asset.progress;
          }
        }
        return memo;
      },
      { toLoad: 0, loaded: 0 }
    );

    // If no assets to preload its finished preloading, or calculate the progress
    this.progress = counts.toLoad ? counts.loaded / counts.toLoad : 1;

    // If progress >= 1 we are preloaded
    if (this.progress >= 1) this.preloaded = true;

    // Emit the progress
    this.onPreloadProgress.next(this.progress);

    // Emit the complete if we are finished
    if (this.progress === 1) {
      this.onPreloaded.next(true);
    }
  }

  get<T extends Asset>(id: assetId) {
    const item = this.cache.find((c) => c.id === id);

    if (!item) throw new Error(`Invalid File: ${id}`);

    return item.asset as T;
  }
}

export default AssetManager;
