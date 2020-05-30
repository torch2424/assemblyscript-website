<template>
  <div class="testimonials">
    <div v-for="item in testimonials" class="testimonial">
      <img class="logo" :src="'avatars/' + item.name.replace(/ /g, '_') + '.png'" :alt="item.name" />
      <p>
        “{{ item.text }}”</span>
        – <strong>{{ item.name }}</strong>, <a :href="item.link" target="_blank" rel="noopener">{{ item.title }}</a>
      </p>
    </div>
  </div>
</template>

<script>
import testimonials from '../../../data/testimonials.json'

export default {
  data() {
    return {
      testimonials: testimonials
        .sort((a,b) => Math.random() - 0.5)
        .slice(0, 3)
    }
  }
}
</script>

<style scoped>
.testimonials {
  padding-bottom: 1rem;
}
.testimonials h3 {
  text-align: center;
  border: 0;
}
.testimonial {
  position: relative;
  padding: 0.5rem 0 0;
}
.testimonial .logo {
  position: absolute;
  left: 10px;
  top: 25px;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  border: 1px solid #fff;
  box-shadow: 0 0 0 1px #007acc;
}
.testimonial:nth-child(2) .logo {
  left: auto; right: 10px;
}
.testimonial p {
  padding-left: 90px;
  padding-right: 60px;
  text-align: justify;
}
.testimonial:nth-child(2) p {
  padding-left: 60px;
  padding-right: 90px;
}
@media only screen and (max-width: 740px) {
  .testimonial .logo,
  .testimonial:nth-child(2) .logo {
    position: relative;
    float: left;
    top: 1.1rem;
    left: 0;
    right: 0;
    width: 48px;
    height: 48px;
    margin: 0 10px 0 0;
  }
  .testimonial p,
  .testimonial:nth-child(2) p {
    padding: 0;
  }
}
</style>
