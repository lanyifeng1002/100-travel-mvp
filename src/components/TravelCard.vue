<script setup>
const props = defineProps({
  travel: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['select'])

function handleSelect() {
  emit('select', props.travel.slug)
}
</script>

<template>
  <button class="travel-card" type="button" @click="handleSelect">
    <div class="travel-card__image-wrap">
      <img :src="travel.image" :alt="travel.name" class="travel-card__image" />
      <span class="travel-card__region">{{ travel.region }}</span>
    </div>

    <div class="travel-card__body">
      <p class="travel-card__eyebrow">{{ travel.country }} · {{ travel.location }}</p>
      <h3 class="travel-card__title">{{ travel.name }}</h3>
      <p class="travel-card__desc">{{ travel.shortDesc }}</p>

      <div class="travel-card__facts">
        <span>{{ travel.bestTime }}</span>
        <span>{{ travel.duration }}</span>
        <span>{{ travel.budget }}</span>
      </div>

      <div class="travel-card__tags">
        <span v-for="tag in travel.tags.slice(0, 3)" :key="tag">{{ tag }}</span>
      </div>
    </div>
  </button>
</template>

<style scoped>
.travel-card {
  width: 100%;
  padding: 0;
  overflow: hidden;
  text-align: left;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(28, 75, 104, 0.1);
  border-radius: 24px;
  box-shadow: var(--shadow-card);
  transition:
    transform 0.24s ease,
    box-shadow 0.24s ease,
    border-color 0.24s ease;
}

.travel-card:hover {
  transform: translateY(-4px);
  border-color: rgba(28, 75, 104, 0.2);
  box-shadow: 0 18px 40px rgba(18, 31, 49, 0.14);
}

.travel-card__image-wrap {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.travel-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.travel-card__region {
  position: absolute;
  top: 14px;
  left: 14px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(22, 32, 51, 0.72);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}

.travel-card__body {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px;
}

.travel-card__eyebrow {
  margin: 0;
  color: var(--color-accent);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.travel-card__title {
  margin: 0;
  font-family: 'Fraunces', 'Times New Roman', serif;
  font-size: 24px;
  line-height: 1.1;
}

.travel-card__desc {
  margin: 0;
  color: var(--color-muted);
}

.travel-card__facts,
.travel-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.travel-card__facts span {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(227, 238, 245, 0.9);
  color: var(--color-ocean);
  font-size: 12px;
  font-weight: 700;
}

.travel-card__tags span {
  font-size: 13px;
  color: var(--color-ink);
}
</style>
