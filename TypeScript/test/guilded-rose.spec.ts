import { expect } from 'chai'
import { Item, GildedRose } from '../app/gilded-rose'

describe('Items', () => {
  it('Have a name string, sellIn number, and a quality number', () => {
    const inventory = new GildedRose([
      new Item('foo', 1, 2),
    ])
    const items = inventory.items
    expect(items.length).to.equal(1)
    expect(items[0].name).to.equal('foo')
    expect(items[0].sellIn).to.equal(1)
    expect(items[0].quality).to.equal(2)
  })

  it('Decrement their sellIn and quality every time updateQuality is called', () => {
    const inventory = new GildedRose([
      new Item('foo', 1, 2),
    ])
    const [item] = inventory.updateQuality()
    expect(item.sellIn).to.equal(0)
    expect(item.quality).to.equal(1)
  })

  it('Decrements quality twice as fast once the sellIn number has reached zero', () => {
    const inventory = new GildedRose([
      new Item('foo', 0, 10),
    ])
    const [item] = inventory.updateQuality()
    expect(item.sellIn).to.equal(-1)
    expect(item.quality).to.equal(8)
    inventory.updateQuality()
    expect(item.sellIn).to.equal(-2)
    expect(item.quality).to.equal(6)
  })

  // it(`Conjured items degrade in quality twice as fast as normal items`, () => {
  //   const inventory = new GildedRose([
  //     new Item('foo', 2, 40),
  //   ])
  //   const [item] = inventory.updateQuality()
  //   expect(item.sellIn).to.equal(1)
  //   expect(item.quality).to.equal(38) // normally just by 2
  //   inventory.updateQuality()
  //   expect(item.sellIn).to.equal(0)
  //   expect(item.quality).to.equal(36)
  //   inventory.updateQuality() // then by 4 after sellIn goes minue
  //   expect(item.sellIn).to.equal(-1)
  //   expect(item.quality).to.equal(32)
  // })

  it('Quality can never be negative', () => {
    const inventory = new GildedRose([
      new Item('foo', 0, 0),
    ])
    const [item] = inventory.updateQuality()
    expect(item.sellIn).to.equal(-1)
    expect(item.quality).to.equal(0)
    inventory.updateQuality()
    expect(item.sellIn).to.equal(-2)
    expect(item.quality).to.equal(0)
  })

  it(`'Aged Brie' increases in Quality the older it gets`, () => {
    const inventory = new GildedRose([
      new Item('Aged Brie', 10, 10),
    ])
    const [item] = inventory.updateQuality()
    expect(item.quality).to.equal(11)
    inventory.updateQuality()
    expect(item.quality).to.equal(12)
  })

  it(`Quality is limited to fifty`, () => {
    const inventory = new GildedRose([
      new Item('Aged Brie', 10, 49),
    ])
    const [item] = inventory.updateQuality()
    expect(item.quality).to.equal(50)
    inventory.updateQuality()
    expect(item.quality).to.equal(50)
  })

  it(`Sulfuras never lose quality or have their sellIn decreased`, () => {
    const inventory = new GildedRose([
      new Item('Sulfuras, Hand of Ragnaros', 10, 80),
    ])
    const [item] = inventory.updateQuality()
    expect(item.sellIn).to.equal(10)
    expect(item.quality).to.equal(80)
    inventory.updateQuality()
    expect(item.sellIn).to.equal(10)
    expect(item.quality).to.equal(80)
  })

  it(`Backstage passes increase in quality when sellIn is less than ten`, () => {
    const inventory = new GildedRose([
      new Item(
        'Backstage passes to a TAFKAL80ETC concert',
        12,
        20,
      ),
    ])
    const [item] = inventory.updateQuality()
    expect(item.sellIn).to.equal(11)
    expect(item.quality).to.equal(21) // Increases by 1 normally
    inventory.updateQuality()
    expect(item.sellIn).to.equal(10)
    expect(item.quality).to.equal(22)
    inventory.updateQuality()
    expect(item.sellIn).to.equal(9)
    expect(item.quality).to.equal(24) // Increases by 2 once under 10 sellIn
    inventory.updateQuality()
    expect(item.sellIn).to.equal(8)
    expect(item.quality).to.equal(26)
    inventory.updateQuality()
    expect(item.sellIn).to.equal(7)
    expect(item.quality).to.equal(28)
    inventory.updateQuality()
    expect(item.sellIn).to.equal(6)
    expect(item.quality).to.equal(30)
    inventory.updateQuality()
    expect(item.sellIn).to.equal(5)
    expect(item.quality).to.equal(32)
    inventory.updateQuality()
    expect(item.sellIn).to.equal(4)
    expect(item.quality).to.equal(35) // Increases by 3 once under 10
    inventory.updateQuality()
    inventory.updateQuality()
    inventory.updateQuality()
    inventory.updateQuality()
    inventory.updateQuality()
    expect(item.sellIn).to.equal(-1)
    expect(item.quality).to.equal(0) // Increases by 3 once under 10
  })
})
