<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { fetchRandomTravel, fetchTravelTags, fetchTravels } from '../api/travelApi.js'
import NavBar from '../components/NavBar.vue'
import TravelCard from '../components/TravelCard.vue'

const router = useRouter()

const travels = ref([])
const travelTags = ref(['全部'])
const searchTerm = ref('')
const activeTag = ref('全部')
const loading = ref(true)
const error = ref('')

const filteredTravels = computed(() => {
  const keyword = searchTerm.value.trim().toLowerCase()

  return travels.value.filter((travel) => {
    const matchesTag = activeTag.value === '全部' || travel.tags.includes(activeTag.value)
    const sourceText = [
      travel.name,
      travel.country,
      travel.location,
      travel.region,
      travel.shortDesc,
      travel.summary,
      travel.tags.join(' ')
    ]
      .join(' ')
      .toLowerCase()

    return matchesTag && (!keyword || sourceText.includes(keyword))
  })
})

const heroTravel = computed(() => filteredTravels.value[0] ?? travels.value[0] ?? null)

const stats = computed(() => [
  { label: '精选目的地', value: `${travels.value.length} 个` },
  { label: '覆盖地区', value: `${new Set(travels.value.map((travel) => travel.region)).size} 个` },
  { label: '旅行风格', value: `${Math.max(travelTags.value.length - 1, 0)} 种` }
])

const hasFilters = computed(() => searchTerm.value.trim() || activeTag.value !== '全部')

async function loadHomeData() {
  loading.value = true
  error.value = ''

  try {
    const [travelList, tagList] = await Promise.all([fetchTravels(), fetchTravelTags()])
    travels.value = travelList
    travelTags.value = tagList

    if (!tagList.includes(activeTag.value)) {
      activeTag.value = '全部'
    }
  } catch (requestError) {
    error.value = requestError.message || '加载内容失败。'
  } finally {
    loading.value = false
  }
}

function goToDetail(slug) {
  router.push(`/travel/${slug}`)
}

function selectTag(tag) {
  activeTag.value = tag
}

function resetFilters() {
  searchTerm.value = ''
  activeTag.value = '全部'
}

async function exploreRandom() {
  try {
    const nextTravel = await fetchRandomTravel({
      q: searchTerm.value.trim(),
      tag: activeTag.value
    })

    goToDetail(nextTravel.slug)
  } catch (requestError) {
    error.value = requestError.message || '随机探索失败。'
  }
}

onMounted(() => {
  loadHomeData()
})
</script>

<template>
  <div>
    <NavBar />

    <main class="page-shell home">
      <section v-if="loading" class="surface status-panel fade-in">
        <p class="kicker">Loading</p>
        <h2>正在整理目的地内容</h2>
        <p>请稍候，精选路线和季节信息马上就绪。</p>
      </section>

      <section v-else-if="error" class="surface status-panel fade-in">
        <p class="kicker">Load Failed</p>
        <h2>内容暂时没有加载出来</h2>
        <p>{{ error }}</p>
        <button class="action-button action-button--primary" type="button" @click="loadHomeData">
          重新加载
        </button>
      </section>

      <template v-else-if="heroTravel">
        <section class="surface hero fade-in">
          <div class="hero__intro section-heading">
            <p class="kicker">Curated Destinations</p>
            <h1>找到真正适合你下一次出发的目的地</h1>
            <p>
              按地区、季节和旅行方式浏览精选目的地，在做计划之前先建立一份更清晰的出发清单。
            </p>

            <div class="hero__actions">
              <button class="action-button action-button--primary" type="button" @click="exploreRandom">
                随机探索一个目的地
              </button>
              <button
                class="action-button action-button--ghost"
                type="button"
                @click="goToDetail(heroTravel.slug)"
              >
                查看当前主推
              </button>
            </div>

            <div class="hero__stats">
              <article v-for="item in stats" :key="item.label" class="hero__stat-card">
                <strong>{{ item.value }}</strong>
                <span>{{ item.label }}</span>
              </article>
            </div>
          </div>

          <article class="hero__feature">
            <div class="hero__feature-media">
              <img :src="heroTravel.image" :alt="heroTravel.name" />
            </div>

            <div class="hero__feature-body">
              <span class="pill">{{ heroTravel.region }}</span>
              <h2>{{ heroTravel.name }}</h2>
              <p>{{ heroTravel.summary }}</p>

              <div class="hero__feature-facts">
                <span>最佳时间：{{ heroTravel.bestTime }}</span>
                <span>建议停留：{{ heroTravel.duration }}</span>
                <span>预算区间：{{ heroTravel.budget }}</span>
              </div>
            </div>
          </article>
        </section>

        <section class="surface control-panel fade-in">
          <div class="control-panel__top">
            <div class="section-heading">
              <p class="kicker">Search And Filter</p>
              <h2>先收窄范围，再决定去哪一站</h2>
              <p>用关键词和标签快速缩小选择，把时间留给真正值得深入了解的地方。</p>
            </div>

            <div class="control-panel__search">
              <label class="control-panel__label" for="travel-search">关键词搜索</label>
              <input
                id="travel-search"
                v-model="searchTerm"
                type="text"
                placeholder="例如：京都、摄影、山野风景、海岛"
              />
            </div>
          </div>

          <div class="control-panel__tags">
            <button
              v-for="tag in travelTags"
              :key="tag"
              type="button"
              :class="['tag-button', { 'tag-button--active': activeTag === tag }]"
              @click="selectTag(tag)"
            >
              {{ tag }}
            </button>
          </div>

          <div class="control-panel__footer">
            <p>当前结果：{{ filteredTravels.length }} 个目的地</p>
            <button
              v-if="hasFilters"
              class="action-button action-button--ghost"
              type="button"
              @click="resetFilters"
            >
              清空筛选
            </button>
          </div>
        </section>

        <section class="results">
          <div class="results__header section-heading">
            <p class="kicker">Travel List</p>
            <h2>从这里开始挑选下一段旅程</h2>
            <p>卡片保留了最佳季节、建议时长和预算区间，适合快速比较不同目的地。</p>
          </div>

          <div v-if="filteredTravels.length" class="results__grid">
            <TravelCard
              v-for="travel in filteredTravels"
              :key="travel.slug"
              :travel="travel"
              @select="goToDetail"
            />
          </div>

          <section v-else class="surface empty-state">
            <p class="kicker">No Match</p>
            <h2>这轮筛选没有命中结果</h2>
            <p>试着放宽关键词或更换标签，你会更容易发现新的方向。</p>
            <button class="action-button action-button--primary" type="button" @click="resetFilters">
              查看全部目的地
            </button>
          </section>
        </section>
      </template>

      <section v-else class="surface status-panel fade-in">
        <p class="kicker">No Data</p>
        <h2>当前还没有可展示的目的地内容</h2>
        <p>目录正在更新，请稍后再试。</p>
      </section>
    </main>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.status-panel {
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: flex-start;
  padding: 28px;
}

.status-panel h2 {
  margin: 0;
  font-size: clamp(28px, 4vw, 42px);
}

.status-panel p:last-child {
  margin: 0;
  color: var(--color-muted);
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(340px, 0.9fr);
  gap: 24px;
  padding: 28px;
}

.hero__intro {
  gap: 16px;
  align-self: center;
}

.hero__intro h1 {
  font-size: clamp(38px, 5vw, 64px);
}

.hero__intro p:last-of-type {
  font-size: 17px;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.hero__stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.hero__stat-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(227, 238, 245, 0.78) 100%);
  border: 1px solid var(--color-line);
}

.hero__stat-card strong {
  font-size: 24px;
  color: var(--color-ocean);
}

.hero__stat-card span {
  color: var(--color-muted);
  font-size: 14px;
}

.hero__feature {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 24px;
  background: #fff;
  box-shadow: var(--shadow-card);
}

.hero__feature-media {
  aspect-ratio: 4 / 3;
}

.hero__feature-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__feature-body {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 22px;
}

.hero__feature-body h2 {
  margin: 0;
  font-family: 'Fraunces', 'Times New Roman', serif;
  font-size: 34px;
  line-height: 1.05;
}

.hero__feature-body p {
  margin: 0;
  color: var(--color-muted);
}

.hero__feature-facts {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--color-ocean);
  font-size: 14px;
  font-weight: 700;
}

.control-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
}

.control-panel__top {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 340px);
  gap: 20px;
  align-items: end;
}

.control-panel__search {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.control-panel__label {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-ocean);
}

.control-panel__search input {
  min-height: 52px;
  padding: 0 16px;
  border: 1px solid var(--color-line);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.9);
  color: var(--color-ink);
  outline: none;
}

.control-panel__search input:focus {
  border-color: rgba(211, 106, 57, 0.5);
  box-shadow: 0 0 0 4px rgba(211, 106, 57, 0.12);
}

.control-panel__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag-button {
  min-height: 40px;
  padding: 0 14px;
  border-radius: 999px;
  cursor: pointer;
  color: var(--color-ocean);
  background: rgba(227, 238, 245, 0.78);
  border: 1px solid transparent;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.tag-button:hover {
  transform: translateY(-1px);
}

.tag-button--active {
  color: #fff;
  background: linear-gradient(135deg, var(--color-ocean) 0%, #285c7a 100%);
  border-color: rgba(28, 75, 104, 0.24);
}

.control-panel__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.control-panel__footer p {
  margin: 0;
  color: var(--color-muted);
}

.results {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.results__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: flex-start;
  padding: 28px;
}

.empty-state h2,
.results__header h2 {
  font-size: clamp(28px, 4vw, 40px);
}

@media (max-width: 960px) {
  .hero,
  .control-panel__top {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .hero,
  .status-panel {
    padding: 20px;
  }

  .hero__stats {
    grid-template-columns: 1fr;
  }

  .control-panel,
  .empty-state {
    padding: 20px;
  }

  .control-panel__footer {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
