<template>
  <div class="sponsors">
    <div v-if="platinum.length > 0" class="platinum">
      <h3>Platinum Sponsors</h3>
      <div class="list">
        <a v-for="item in platinum" :href="getLink(item)" :title="getAmount(item.totalAmountDonated) + ' by ' + item.name" target="_blank" rel="noopener">
          <img :src="getLogo(item)" :alt="item.name" loading="lazy" />
        </a>
      </div>
    </div>
    <div v-if="gold.length > 0" class="gold">
      <h3>Gold Sponsors</h3>
      <div class="list">
        <a v-for="item in gold" :href="getLink(item)" :title="getAmount(item.totalAmountDonated) + ' by ' + item.name" target="_blank" rel="noopener">
          <img :src="getLogo(item)" :alt="item.name" loading="lazy" />
        </a>
      </div>
    </div>
    <div v-if="silver.length > 0" class="silver">
      <h3>Silver Sponsors</h3>
      <div class="list">
        <a v-for="item in silver" :href="getLink(item)" :title="getAmount(item.totalAmountDonated) + ' by ' + item.name" target="_blank" rel="noopener">
          <img :src="getLogo(item)" :alt="item.name" loading="lazy" />
        </a>
      </div>
    </div>
    <div v-if="bronze.length > 0" class="bronze">
      <h3>Bronze Sponsors</h3>
      <div class="list">
        <a v-for="item in bronze" :href="getLink(item)" :title="getAmount(item.totalAmountDonated) + ' by ' + item.name" target="_blank" rel="noopener">
          <img :src="getLogo(item)" :alt="item.name" loading="lazy" />
        </a>
      </div>
    </div>
    <div v-if="backer.length > 0" class="backer">
      <h3>Individual Backers</h3>
      <div class="list">
        <a v-for="item in backer" :href="getLink(item)" :title="getAmount(item.totalAmountDonated) + ' by ' + item.name" target="_blank" rel="noopener">
          <img :src="getLogo(item)" :alt="item.name" loading="lazy" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import json from '../sponsors.json'

const { members, logos } = json

function getSponsors(minAmount, maxAmount = 0) {
  const seen = new Set()
  return members
    .filter(item => {
      if (seen.has(item.profile)) return false
      seen.add(item.profile)
      return item.isActive && item.totalAmountDonated >= minAmount && (maxAmount == 0 || item.totalAmountDonated < maxAmount)
    })
    .sort((a, b) => b.totalAmountDonated - a.totalAmountDonated)
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
    this.platinum = getSponsors(50000)
    this.gold = getSponsors(10000, 50000)
    this.silver = getSponsors(2000, 10000)
    this.bronze = getSponsors(200, 2000)
    this.backer = getSponsors(1, 200)
  },

  methods: {
    getLink(item) {
      return item.website || item.profile
    },
    getLogo(item) {
      const id = item.profile.substring(item.profile.lastIndexOf('/') + 1)
      if (logos[id]) return logos[id]
      return 'https://images.opencollective.com/' + id + '/' + item.MemberId + '/logo.png'
    },
    getAmount(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      }).format(amount)
    }
  }
}
</script>

<style>
.sponsors h3 {
  text-align: center;
  border: 0;
}
.sponsors .list {
  text-align: center;
}
.sponsors .list a {
  display: inline-block;
  padding: 0.5rem;
  box-sizing: border-box;
  position: relative;
  top: 0;
  transition: top 100ms;
}
.sponsors .list a:hover {
  top: -4px;
}
.sponsors .platinum .list img {
  height: 128px;
}
.sponsors .gold .list img {
  height: 96px;
}
.sponsors .silver .list img {
  height: 64px;
}
.sponsors .bronze .list img {
  height: 32px;
}
.sponsors .bronze .list a {
  padding: 0.25rem;
}
.sponsors .backer .list img {
  width: 31px;
  height: 31px;
  border-radius: 50%;
  border: 1px solid #fff;
  box-shadow: 0 0 0 1px #89a;
}
.sponsors .backer .list a {
  padding: 0.15rem;
}
</style>
