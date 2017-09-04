export class Item {
  name: string
  sellIn: number
  quality: number

  constructor(name, sellIn, quality) {
    this.name = name
    this.sellIn = sellIn
    this.quality = quality
  }
}

// Types of items
const MATURER = 'Aged Brie' // Increases in quality the older it gets
const MATURES_NEAR_EXPIRY =
  'Backstage passes to a TAFKAL80ETC concert'
const FIXED_QUALITY_AND_SELLIN =
  'Sulfuras, Hand of Ragnaros'

export class GildedRose {
  items: Array<Item>

  constructor(items = []) {
    this.items = items
  }

  public static updateQuality(items) {
    return items.map(({ name, quality, sellIn }) => {
      if (![MATURER, MATURES_NEAR_EXPIRY].includes(name)) {
        if (
          quality > 0 &&
          name != FIXED_QUALITY_AND_SELLIN
        ) {
          quality = quality - 1
        }
      } else {
        if (quality < 50) {
          quality = quality + 1
          if (name === MATURES_NEAR_EXPIRY) {
            if (sellIn < 11 && quality < 50) {
              quality = quality + 1
            }
            if (sellIn < 6 && quality < 50) {
              quality = quality + 1
            }
          }
        }
      }
      if (name != FIXED_QUALITY_AND_SELLIN) {
        sellIn = sellIn - 1
      }
      if (sellIn < 0) {
        if (name != MATURER) {
          if (name != MATURES_NEAR_EXPIRY) {
            if (
              quality > 0 &&
              name != FIXED_QUALITY_AND_SELLIN
            ) {
              quality = quality - 1
            }
          } else {
            quality = quality - quality
          }
        } else {
          if (quality < 50) {
            quality = quality + 1
          }
        }
      }
      return new Item(name, sellIn, quality)
    })
  }
}
