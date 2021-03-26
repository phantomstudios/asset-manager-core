import BaseAsset from "../BaseAsset";

class SampleAsset extends BaseAsset {
  public data!: string;

  load() {
    this.onProgressChange(0.25);
    this.onProgressChange(0.5);
    this.onProgressChange(0.75);
    this.onProgressChange(1);

    this.data = "asset data";

    this.onLoadComplete();
  }
}

export default SampleAsset;
