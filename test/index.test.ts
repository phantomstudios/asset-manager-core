import AssetManager from "../src";
import SampleAsset from "../src/mocks/SampleAsset";

describe("performs requests", () => {
  afterEach(() => {
    AssetManager.destroyInstance();
  });

  it("can get instance", async () => {
    const manager = AssetManager.getInstance();
    expect(manager).toBeTruthy();
  });

  it("initial progress is 0", async () => {
    const manager = AssetManager.getInstance();

    expect(manager.progress).toEqual(0);
  });

  it("can set asset loaders", async () => {
    const manager = AssetManager.getInstance();

    manager.setLoaders({
      sample: SampleAsset,
    });

    expect(manager).toBeTruthy();
  });

  it("can load assets", async () => {
    const manager = AssetManager.getInstance();

    manager.setLoaders({
      sample: SampleAsset,
    });

    manager.setAssets([
      {
        id: "sample_asset",
        type: "sample",
        url: "something.jpg",
      },
    ]);

    expect(manager.progress).toEqual(1);
  });

  it("can load and get asset", async () => {
    const manager = AssetManager.getInstance();

    manager.setLoaders({
      sample: SampleAsset,
    });

    manager.setAssets([
      {
        id: "sample_asset",
        type: "sample",
        url: "something.jpg",
        preload: true,
      },
    ]);

    const asset = AssetManager.getInstance().get<SampleAsset>("sample_asset");
    expect(asset.data).toEqual("asset data");
  });
});
