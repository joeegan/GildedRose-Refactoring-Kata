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
      if ([MATURER, MATURES_NEAR_EXPIRY].includes(name)) {
        if (quality < 50) {
          quality++
          if (name === MATURES_NEAR_EXPIRY) {
            if (sellIn < 11 && quality < 50) {
              quality++
            }
            if (sellIn < 6 && quality < 50) {
              quality++
            }
          }
        }
      } else {
        if (
          quality > 0 &&
          name != FIXED_QUALITY_AND_SELLIN
        ) {
          quality--
        }
      }
      if (name != FIXED_QUALITY_AND_SELLIN) {
        sellIn--
      }
      if (sellIn < 0) {
        if (name === MATURER) {
          if (quality < 50) {
            quality++
          }
        } else {
          if (name === MATURES_NEAR_EXPIRY) {
            quality = quality - quality
          } else {
            if (
              quality > 0 &&
              name != FIXED_QUALITY_AND_SELLIN
            ) {
              quality--
            }
          }
        }
      }
      return new Item(name, sellIn, quality)
    })
  }
}
