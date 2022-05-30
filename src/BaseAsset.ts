import { Subject } from "rxjs";

import { AssetConfig } from "./types";

export enum AssetState {
  Unloaded,
  Loading,
  Loaded,
}

abstract class Asset {
  config: AssetConfig;
  loaded = false;
  onLoaded = new Subject();
  progress = 0;
  onProgress = new Subject<number>();
  state = AssetState.Unloaded;

  constructor(config: AssetConfig) {
    this.config = config;
  }

  load() {
    this.state = AssetState.Loading;
  }

  protected onProgressChange(value: number) {
    if (this.progress === value) return;
    this.progress = value;
    this.onProgress.next(this.progress);
  }

  protected onLoadComplete() {
    this.state = AssetState.Loaded;
    this.onProgressChange(1);
    this.onLoaded.next(undefined);
  }
}

export default Asset;
