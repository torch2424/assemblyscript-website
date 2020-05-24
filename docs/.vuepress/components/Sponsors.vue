<template>
  <div class="sponsors">
    <div v-if="platinum.length > 0" class="platinum">
      <h3>Platinum Sponsors</h3>
      <div class="list">
        <a v-for="item in platinum" :href="item.link" :title="item.name" target="_blank" rel="noopener">
          <img :src="item.logo" :alt="item.name" />
        </a>
      </div>
    </div>
    <div v-if="gold.length > 0" class="gold">
      <h3>Gold Sponsors</h3>
      <div class="list">
        <a v-for="item in gold" :href="item.link" :title="item.name" target="_blank" rel="noopener">
          <img :src="item.logo" :alt="item.name" />
        </a>
      </div>
    </div>
    <div v-if="silver.length > 0" class="silver">
      <h3>Silver Sponsors</h3>
      <div class="list">
        <a v-for="item in silver" :href="item.link" :title="item.name" target="_blank" rel="noopener">
          <img :src="item.logo" :alt="item.name" />
        </a>
      </div>
    </div>
    <div v-if="bronze.length > 0" class="bronze">
      <h3>Bronze Sponsors</h3>
      <div class="list">
        <a v-for="item in bronze" :href="item.link" :title="item.name" target="_blank" rel="noopener">
          <img :src="item.logo" :alt="item.name" />
        </a>
      </div>
    </div>
    <div v-if="backer.length > 0" class="backer">
      <h3>Individual Backers</h3>
      <div class="list">
        <a v-for="item in backer" :href="item.link" :title="item.name" target="_blank" rel="noopener">
          <img :src="item.logo" :alt="item.name" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import json from '../sponsors.json'

const logos = {
  'nearprotocol': 'sponsors/near.svg',
  'fastly': 'sponsors/fastly.svg',
  'shopify': 'sponsors/shopify.svg',
  'graphprotocol': 'sponsors/thegraph.svg',
  'chainsafeth': 'sponsors/chainsafe.svg'
}

function getLink(item) {
  return item.website || item.profile
}

function getLogo(item) {
  const id = item.profile.substring(item.profile.lastIndexOf('/') + 1)
  if (logos[id]) return logos[id]
  return 'https://images.opencollective.com/' + id + '/' + item.MemberId + '/logo.png'
}

function getSponsors(json, minAmount, maxAmount = 0) {
  const seen = new Set()
  const items = json
    .filter(item => {
      if (seen.has(item.profile)) return false
      seen.add(item.profile)
      return item.isActive && item.totalAmountDonated >= minAmount && (maxAmount == 0 || item.totalAmountDonated < maxAmount)
    })
    .sort((a, b) => b.totalAmountDonated - a.totalAmountDonated)
    .map(item => {
      item.link = getLink(item)
      item.logo = getLogo(item)
      return item
    })
  return items
}

export default {
  name: 'Sponsors',
  platinum: [],
  gold: [],
  silver: [],
  bronze: [],
  backer: [],

  data() {
    return {
      platinum: this.platinum,
      gold: this.gold,
      silver: this.silver,
      bronze: this.bronze,
      backer: this.backer
    }
  },

  beforeCreate() {
    this.platinum = getSponsors(json, 50000)
    this.gold = getSponsors(json, 10000, 50000)
    this.silver = getSponsors(json, 2000, 10000)
    this.bronze = getSponsors(json, 200, 2000)
    this.backer = getSponsors(json, 1, 200)
  }
}
</script>

<style>
.sponsors h3 {
  text-align: center;
  border: 0;
}
.sponsors .list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: space-around;
  justify-content: space-evenly;
  text-align: center;
}
.sponsors .platinum .list a,
.sponsors .gold .list a,
.sponsors .silver .list a,
.sponsors .bronze .list a {
  flex-grow: 1;
  padding: 0.2rem;
  box-sizing: border-box;
  position: relative;
  top: 0;
  transition: all 100ms;
}
.sponsors .list a:hover {
  top: -4px;
}
.sponsors .platinum .list a {
  flex-basis: 30%;
  max-width: 30%;
}
.sponsors .gold .list a {
  flex-basis: 25%;
  max-width: 25%;
}
.sponsors .silver .list a {
  flex-basis: 20%;
  max-width: 20%;
}
.sponsors .bronze .list a {
  flex-basis: 15%;
  max-width: 15%;
}
.sponsors .backer .list {
  justify-content: center;
}
.sponsors .backer .list a {
  padding: 0.1rem;
}
.sponsors .backer .list img {
  width: 31px;
  height: 31px;
  border-radius: 50%;
  border: 1px solid #fff;
  box-shadow: 0 0 0 1px #007acc;
}
</style>
