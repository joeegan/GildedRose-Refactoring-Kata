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
    const items = inventory.updateQuality()
    expect(items[0].sellIn).to.equal(0)
    expect(items[0].quality).to.equal(1)
  })
})
