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

const characteristics = new Map([
  // Increases in quality the older it gets
  [
    'Aged Brie',
    (name, sellIn, quality) => {
      if (quality < 50) {
        quality++
      }
      sellIn--
      if (sellIn < 0) {
        if (quality < 50) {
          quality++
        } else if (quality > 0) {
          quality--
        }
      }
      return new Item(name, sellIn, quality)
    },
  ],
  [
    'Backstage passes to a TAFKAL80ETC concert',
    (name, sellIn, quality) => {
      sellIn--
      if (quality < 50) {
        quality++
        if (sellIn < 10) {
          quality++
        }
        if (sellIn < 5) {
          quality++
        }
      }
      if (sellIn < 0) {
        quality = 0
      }
      return new Item(name, sellIn, quality)
    },
  ],
  // Fixed quality and don't go out of date
  [
    'Sulfuras, Hand of Ragnaros',
    (name, sellIn, quality) => {
      return new Item(name, sellIn, 80)
    },
  ],
  // Go stale twice as fast
  [
    'Conjured',
    (name, sellIn, quality) => {
      sellIn--
      if (quality > 0) {
        quality--
        quality--
      }
      if (sellIn < 0) {
        if (quality > 0) {
          quality--
        }
        quality--
      }
      return new Item(name, sellIn, quality)
    },
  ],
  [
    'default',
    (name, sellIn, quality) => {
      if (quality > 0) {
        quality--
      }
      sellIn--
      if (sellIn < 0 && quality > 0) {
        quality--
      }
      return new Item(name, sellIn, quality)
    },
  ],
])

export class GildedRose {
  items: Array<Item>

  constructor(items = []) {
    this.items = items
  }

  public static updateQuality(items) {
    return items.map(({ name, sellIn, quality }) => {
      if (characteristics.has(name)) {
        return characteristics.get(name)(
          name,
          sellIn,
          quality,
        )
      }
      return characteristics.get('default')(
        name,
        sellIn,
        quality,
      )
    })
  }
}
