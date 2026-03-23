<script setup>
import { computed, onMounted, reactive, ref } from 'vue'

import { createTravel, fetchRecentAdminTravels, fetchTravelStats } from '../api/travelApi.js'
import NavBar from '../components/NavBar.vue'

function createEmptyForm() {
  return {
    slug: '',
    name: '',
    country: '',
    location: '',
    region: '',
    image: '',
    bestTime: '',
    duration: '',
    budget: '',
    shortDesc: '',
    summary: '',
    fullDesc: '',
    tagsText: '',
    idealForText: '',
    highlightsText: '',
    tipsText: ''
  }
}

function splitLines(value) {
  return [...new Set(value.split(/\r?\n|,|，/).map((item) => item.trim()).filter(Boolean))]
}

const form = reactive(createEmptyForm())
const stats = ref({
  totalTravels: 0,
  totalRegions: 0,
  totalTags: 0
})
const recentTravels = ref([])
const loading = ref(true)
const submitting = ref(false)
const formError = ref('')
const formSuccess = ref('')

const statCards = computed(() => [
  { label: '目的地总数', value: `${stats.value.totalTravels}` },
  { label: '地区分类', value: `${stats.value.totalRegions}` },
  { label: '标签数量', value: `${stats.value.totalTags}` }
])

function resetForm() {
  Object.assign(form, createEmptyForm())
}

function buildPayload() {
  return {
    slug: form.slug.trim(),
    name: form.name.trim(),
    country: form.country.trim(),
    location: form.location.trim(),
    region: form.region.trim(),
    image: form.image.trim(),
    bestTime: form.bestTime.trim(),
    duration: form.duration.trim(),
    budget: form.budget.trim(),
    shortDesc: form.shortDesc.trim(),
    summary: form.summary.trim(),
    fullDesc: form.fullDesc.trim(),
    tags: splitLines(form.tagsText),
    idealFor: splitLines(form.idealForText),
    highlights: splitLines(form.highlightsText),
    tips: splitLines(form.tipsText)
  }
}

async function loadAdminData() {
  loading.value = true

  try {
    const [statsPayload, recentPayload] = await Promise.all([
      fetchTravelStats(),
      fetchRecentAdminTravels(10)
    ])

    stats.value = statsPayload
    recentTravels.value = recentPayload
  } finally {
    loading.value = false
  }
}

async function submitForm() {
  submitting.value = true
  formError.value = ''
  formSuccess.value = ''

  try {
    const createdTravel = await createTravel(buildPayload())
    formSuccess.value = `保存成功：${createdTravel.name}`
    resetForm()
    await loadAdminData()
  } catch (error) {
    formError.value = error.message || '保存失败，请检查表单内容。'
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  loadAdminData()
})
</script>

<template>
  <div>
    <NavBar
      show-home-link
      :show-admin-link="false"
      title-text="内容管理中心"
      subtitle-text="维护目的地资料、标签与亮点信息，让前台展示保持统一和清晰。"
      panel-label="Content Studio"
      panel-value="统一字段结构 / 快速更新 / 即时生效"
      home-link-text="返回前台"
    />

    <main class="page-shell admin-page">
      <section class="surface admin-hero fade-in">
        <div class="section-heading">
          <p class="kicker">Content Studio</p>
          <h1>维护目的地内容的统一入口</h1>
          <p>保存后，最新条目会同步出现在前台列表与详情页，方便持续更新目录。</p>
        </div>

        <div class="admin-hero__stats">
          <article v-for="item in statCards" :key="item.label" class="admin-stat">
            <span>{{ item.label }}</span>
            <strong>{{ item.value }}</strong>
          </article>
        </div>
      </section>

      <section class="admin-layout">
        <form class="surface admin-form fade-in" @submit.prevent="submitForm">
          <div class="section-heading">
            <p class="kicker">Create Entry</p>
            <h2>新增目的地条目</h2>
            <p>使用统一字段结构，保证卡片、筛选和详情页都能稳定展示。</p>
          </div>

          <div v-if="formError" class="form-message form-message--error">{{ formError }}</div>
          <div v-if="formSuccess" class="form-message form-message--success">{{ formSuccess }}</div>

          <div class="admin-form__grid">
            <label class="field">
              <span>slug</span>
              <input v-model="form.slug" type="text" placeholder="kyoto-autumn-temples" />
            </label>

            <label class="field">
              <span>目的地名称</span>
              <input v-model="form.name" type="text" placeholder="京都 · 秋日寺院慢游" />
            </label>

            <label class="field">
              <span>国家</span>
              <input v-model="form.country" type="text" placeholder="日本" />
            </label>

            <label class="field">
              <span>地点</span>
              <input v-model="form.location" type="text" placeholder="京都" />
            </label>

            <label class="field">
              <span>地区分类</span>
              <input v-model="form.region" type="text" placeholder="东亚" />
            </label>

            <label class="field">
              <span>图片地址</span>
              <input v-model="form.image" type="url" placeholder="https://images.unsplash.com/..." />
            </label>

            <label class="field">
              <span>最佳时间</span>
              <input v-model="form.bestTime" type="text" placeholder="10月下旬 - 11月中旬" />
            </label>

            <label class="field">
              <span>建议停留</span>
              <input v-model="form.duration" type="text" placeholder="4-6天" />
            </label>

            <label class="field">
              <span>预算档位</span>
              <input v-model="form.budget" type="text" placeholder="中高预算" />
            </label>

            <label class="field field--full">
              <span>卡片简介</span>
              <input
                v-model="form.shortDesc"
                type="text"
                placeholder="适合第一次判断自己是否喜欢日式慢旅行的人。"
              />
            </label>

            <label class="field field--full">
              <span>摘要</span>
              <textarea
                v-model="form.summary"
                rows="3"
                placeholder="用红叶、寺院和步行尺度，把旅行节奏放慢。"
              />
            </label>

            <label class="field field--full">
              <span>详情描述</span>
              <textarea
                v-model="form.fullDesc"
                rows="5"
                placeholder="说明这个目的地为什么值得去，适合谁，以及用什么方式更容易获得完整体验。"
              />
            </label>

            <label class="field field--full">
              <span>标签</span>
              <textarea
                v-model="form.tagsText"
                rows="3"
                placeholder="每行一个，或用逗号分隔&#10;慢旅行&#10;秋色&#10;文化体验"
              />
            </label>

            <label class="field field--full">
              <span>适合人群</span>
              <textarea
                v-model="form.idealForText"
                rows="3"
                placeholder="每行一个&#10;第一次去日本但不想赶景点的人&#10;喜欢城市散步的人"
              />
            </label>

            <label class="field field--full">
              <span>亮点</span>
              <textarea
                v-model="form.highlightsText"
                rows="3"
                placeholder="每行一个&#10;寺院与红叶组合&#10;可步行串联的街区体验"
              />
            </label>

            <label class="field field--full">
              <span>出行提醒</span>
              <textarea
                v-model="form.tipsText"
                rows="3"
                placeholder="每行一个&#10;热门季节住宿要提前订&#10;尽量避开周末核心景点高峰"
              />
            </label>
          </div>

          <div class="admin-form__actions">
            <button class="action-button action-button--ghost" type="button" @click="resetForm">
              清空表单
            </button>
            <button class="action-button action-button--primary" type="submit" :disabled="submitting">
              {{ submitting ? '正在保存' : '保存条目' }}
            </button>
          </div>
        </form>

        <aside class="surface admin-side fade-in">
          <div class="section-heading">
            <p class="kicker">Recent Updates</p>
            <h2>最近更新</h2>
            <p>最近保存的条目会显示在这里，方便快速核对。</p>
          </div>

          <div v-if="loading" class="admin-side__status">正在读取最近更新...</div>

          <div v-else class="recent-list">
            <article v-for="item in recentTravels" :key="item.slug" class="recent-card">
              <div class="recent-card__header">
                <strong>{{ item.name }}</strong>
                <span>{{ item.region }}</span>
              </div>
              <p>{{ item.country }} / {{ item.location }}</p>
              <small>{{ item.slug }}</small>
            </article>
          </div>
        </aside>
      </section>
    </main>
  </div>
</template>

<style scoped>
.admin-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.admin-hero {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 28px;
}

.admin-hero h1 {
  margin: 0;
  font-size: clamp(36px, 5vw, 60px);
  font-family: 'Fraunces', 'Times New Roman', serif;
  line-height: 1.04;
}

.admin-hero__stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.admin-stat {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 18px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid var(--color-line);
}

.admin-stat span {
  color: var(--color-muted);
  font-size: 14px;
}

.admin-stat strong {
  font-size: 30px;
  color: var(--color-ocean);
}

.admin-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(300px, 0.75fr);
  gap: 20px;
}

.admin-form,
.admin-side {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
}

.admin-form__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field span {
  font-weight: 700;
  color: var(--color-ocean);
}

.field--full {
  grid-column: 1 / -1;
}

.field input,
.field textarea {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid rgba(28, 75, 104, 0.15);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.86);
  color: var(--color-ink);
  resize: vertical;
}

.field input:focus,
.field textarea:focus {
  outline: 2px solid rgba(211, 106, 57, 0.2);
  border-color: rgba(211, 106, 57, 0.45);
}

.form-message {
  padding: 14px 16px;
  border-radius: 16px;
  font-weight: 600;
}

.form-message--error {
  color: #8a2d20;
  background: rgba(240, 132, 110, 0.16);
}

.form-message--success {
  color: #185b40;
  background: rgba(113, 200, 156, 0.2);
}

.admin-form__actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.admin-side__status {
  color: var(--color-muted);
}

.recent-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.recent-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px;
  border-radius: 18px;
  background: rgba(227, 238, 245, 0.56);
}

.recent-card p,
.recent-card small {
  margin: 0;
  color: var(--color-muted);
}

.recent-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}

.recent-card__header strong {
  color: var(--color-ocean);
}

@media (max-width: 980px) {
  .admin-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .admin-hero__stats,
  .admin-form__grid {
    grid-template-columns: 1fr;
  }

  .admin-form__actions {
    flex-direction: column-reverse;
  }
}
</style>
