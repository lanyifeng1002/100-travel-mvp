<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { fetchRelatedTravels, fetchTravelBySlug } from '../api/travelApi.js'
import NavBar from '../components/NavBar.vue'

const route = useRoute()
const router = useRouter()

const travel = ref(null)
const relatedTravels = ref([])
const loading = ref(true)
const error = ref('')
const notFound = ref(false)

async function loadTravel(slug) {
  loading.value = true
  error.value = ''
  notFound.value = false

  try {
    const [travelDetail, relatedList] = await Promise.all([
      fetchTravelBySlug(slug),
      fetchRelatedTravels(slug)
    ])

    travel.value = travelDetail
    relatedTravels.value = relatedList
  } catch (requestError) {
    travel.value = null
    relatedTravels.value = []

    if (requestError.status === 404) {
      notFound.value = true
    } else {
      error.value = requestError.message || '加载详情失败。'
    }
  } finally {
    loading.value = false
  }
}

function goHome() {
  router.push('/')
}

function openTravel(slug) {
  router.push(`/travel/${slug}`)
}

watch(
  () => route.params.slug,
  (slug) => {
    if (typeof slug === 'string' && slug) {
      loadTravel(slug)
    }
  },
  { immediate: true }
)
</script>

<template>
  <div>
    <NavBar compact show-home-link />

    <main class="page-shell detail-page">
      <section v-if="loading" class="surface status-panel fade-in">
        <p class="kicker">Loading</p>
        <h1>正在整理目的地详情</h1>
        <p>请稍候，亮点、适合人群和相关选择马上呈现。</p>
      </section>

      <section v-else-if="error" class="surface status-panel fade-in">
        <p class="kicker">Load Failed</p>
        <h1>详情暂时没有加载出来</h1>
        <p>{{ error }}</p>
        <button class="action-button action-button--primary" type="button" @click="loadTravel(route.params.slug)">
          重新加载
        </button>
      </section>

      <template v-else-if="travel">
        <section class="surface detail-hero fade-in">
          <div class="detail-hero__content section-heading">
            <button class="text-link" type="button" @click="goHome">&lt; 返回目的地列表</button>
            <p class="kicker">{{ travel.country }} / {{ travel.location }}</p>
            <h1>{{ travel.name }}</h1>
            <p>{{ travel.fullDesc }}</p>

            <div class="detail-hero__pills">
              <span class="pill">{{ travel.region }}</span>
              <span class="pill">{{ travel.bestTime }}</span>
              <span class="pill">{{ travel.duration }}</span>
              <span class="pill">{{ travel.budget }}</span>
            </div>
          </div>

          <div class="detail-hero__media">
            <img :src="travel.image" :alt="travel.name" />
          </div>
        </section>

        <section class="detail-summary-grid">
          <article class="surface summary-card">
            <span>关键词</span>
            <strong>{{ travel.tags.join(' / ') }}</strong>
          </article>
          <article class="surface summary-card">
            <span>更适合</span>
            <strong>{{ travel.idealFor[0] }}</strong>
          </article>
          <article class="surface summary-card">
            <span>建议停留</span>
            <strong>{{ travel.duration }}</strong>
          </article>
          <article class="surface summary-card">
            <span>出发时间</span>
            <strong>{{ travel.bestTime }}</strong>
          </article>
        </section>

        <section class="detail-columns">
          <article class="surface detail-card">
            <div class="section-heading">
              <p class="kicker">Highlights</p>
              <h2>这趟旅行最值得记住的体验</h2>
              <p>这些不是简单的景点堆叠，而是最容易形成记忆点的核心片段。</p>
            </div>

            <ul class="detail-list">
              <li v-for="item in travel.highlights" :key="item">{{ item }}</li>
            </ul>
          </article>

          <article class="surface detail-card">
            <div class="section-heading">
              <p class="kicker">Fit And Tips</p>
              <h2>适合谁，以及出发前要知道什么</h2>
              <p>提前判断适配度，往往比多看几个景点名字更重要。</p>
            </div>

            <div class="detail-block">
              <h3>更适合这些人</h3>
              <ul class="detail-list">
                <li v-for="item in travel.idealFor" :key="item">{{ item }}</li>
              </ul>
            </div>

            <div class="detail-block">
              <h3>出行提醒</h3>
              <ul class="detail-list">
                <li v-for="item in travel.tips" :key="item">{{ item }}</li>
              </ul>
            </div>
          </article>
        </section>

        <section class="surface related">
          <div class="section-heading">
            <p class="kicker">Related Picks</p>
            <h2>如果你喜欢这个方向，还可以继续看这些相近选择</h2>
            <p>从相似风格、节奏和场景中继续比较，能更快找到真正匹配的下一站。</p>
          </div>

          <div class="related__grid">
            <button
              v-for="item in relatedTravels"
              :key="item.slug"
              class="related__card"
              type="button"
              @click="openTravel(item.slug)"
            >
              <img :src="item.image" :alt="item.name" />
              <div class="related__card-body">
                <p>{{ item.country }} / {{ item.location }}</p>
                <h3>{{ item.name }}</h3>
                <span>{{ item.tags[0] }}</span>
              </div>
            </button>
          </div>
        </section>
      </template>

      <section v-else-if="notFound" class="surface status-panel fade-in">
        <p class="kicker">Not Found</p>
        <h1>没有找到这个目的地</h1>
        <p>它可能已经下线，或者这个链接本身无效。你可以先回到列表继续浏览其他选择。</p>
        <button class="action-button action-button--primary" type="button" @click="goHome">
          返回首页
        </button>
      </section>
    </main>
  </div>
</template>

<style scoped>
.detail-page {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.status-panel {
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: flex-start;
  padding: 28px;
}

.status-panel h1 {
  margin: 0;
  font-size: clamp(32px, 5vw, 48px);
  line-height: 1.08;
}

.status-panel p:last-child {
  margin: 0;
  color: var(--color-muted);
}

.detail-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 0.92fr);
  gap: 24px;
  padding: 26px;
}

.detail-hero__content {
  gap: 16px;
  align-self: center;
}

.detail-hero__content h1 {
  font-size: clamp(36px, 5vw, 58px);
}

.detail-hero__pills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.detail-hero__media {
  min-height: 360px;
  overflow: hidden;
  border-radius: 24px;
}

.detail-hero__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-summary-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.summary-card {
  display: flex;
  min-height: 132px;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  padding: 20px;
}

.summary-card span {
  color: var(--color-muted);
  font-size: 14px;
}

.summary-card strong {
  font-size: 26px;
  line-height: 1.2;
  color: var(--color-ocean);
}

.detail-columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.detail-card {
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 24px;
}

.detail-card h2 {
  font-size: clamp(28px, 4vw, 38px);
}

.detail-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.detail-list li {
  position: relative;
  padding: 16px 16px 16px 44px;
  border-radius: 18px;
  background: rgba(227, 238, 245, 0.56);
}

.detail-list li::before {
  content: '*';
  position: absolute;
  left: 18px;
  top: 15px;
  font-size: 24px;
  line-height: 1;
  color: var(--color-accent);
}

.detail-block {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-block h3 {
  margin: 0;
  font-size: 18px;
  color: var(--color-ocean);
}

.related {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
}

.related__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.related__card {
  overflow: hidden;
  text-align: left;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(28, 75, 104, 0.1);
  border-radius: 22px;
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease;
}

.related__card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-card);
}

.related__card img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
}

.related__card-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
}

.related__card-body p,
.related__card-body h3 {
  margin: 0;
}

.related__card-body p {
  font-size: 13px;
  color: var(--color-accent);
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.related__card-body h3 {
  font-family: 'Fraunces', 'Times New Roman', serif;
  font-size: 24px;
}

.related__card-body span {
  color: var(--color-muted);
}

@media (max-width: 960px) {
  .detail-hero,
  .detail-columns {
    grid-template-columns: 1fr;
  }

  .detail-summary-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .detail-hero,
  .detail-card,
  .related,
  .status-panel {
    padding: 20px;
  }

  .detail-summary-grid {
    grid-template-columns: 1fr;
  }

  .summary-card strong {
    font-size: 22px;
  }
}
</style>
