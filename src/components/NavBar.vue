<script setup>
import { computed } from 'vue'

const props = defineProps({
  compact: {
    type: Boolean,
    default: false
  },
  showHomeLink: {
    type: Boolean,
    default: false
  },
  showAdminLink: {
    type: Boolean,
    default: false
  },
  brandText: {
    type: String,
    default: ''
  },
  titleText: {
    type: String,
    default: ''
  },
  subtitleText: {
    type: String,
    default: ''
  },
  panelLabel: {
    type: String,
    default: ''
  },
  panelValue: {
    type: String,
    default: ''
  },
  homeLinkText: {
    type: String,
    default: '返回目的地列表'
  },
  adminLinkText: {
    type: String,
    default: '内容管理'
  }
})

const brand = computed(() => props.brandText || 'AMAZING 100 JOURNEYS')
const title = computed(() => props.titleText || 'Amazing 100 Journeys')

const subtitle = computed(() => {
  if (props.subtitleText) {
    return props.subtitleText
  }

  return props.compact
    ? '从亮点、节奏与季节窗口继续判断，这趟旅行是否值得你真正安排进假期。'
    : '围绕季节、风格与地区浏览精选目的地，用更清晰的方式决定下一次出发。'
})

const modeLabel = computed(() => {
  if (props.panelLabel) {
    return props.panelLabel
  }

  return props.compact ? 'Destination Detail' : 'Curated Destination Guide'
})

const supportLabel = computed(() => {
  if (props.panelValue) {
    return props.panelValue
  }

  return props.compact ? '亮点、适合人群与出行提示' : '精选目的地 / 季节窗口 / 风格筛选'
})
</script>

<template>
  <div class="page-shell">
    <header class="surface header fade-in">
      <div class="header__brand">
        <p class="kicker">{{ brand }}</p>
        <RouterLink to="/" class="header__title">{{ title }}</RouterLink>
        <p class="header__subtitle">{{ subtitle }}</p>
      </div>

      <div class="header__panel">
        <span class="header__label">{{ modeLabel }}</span>
        <strong class="header__value">{{ supportLabel }}</strong>

        <div v-if="showHomeLink || showAdminLink" class="header__links">
          <RouterLink v-if="showHomeLink" to="/" class="header__link">{{ homeLinkText }}</RouterLink>
          <RouterLink v-if="showAdminLink" to="/admin" class="header__link">{{ adminLinkText }}</RouterLink>
        </div>
      </div>
    </header>
  </div>
</template>

<style scoped>
.header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 24px;
  padding: 22px 24px;
}

.header__brand {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.header__title {
  font-family: 'Fraunces', 'Times New Roman', serif;
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 700;
  line-height: 1;
}

.header__subtitle {
  margin: 0;
  max-width: 640px;
  color: var(--color-muted);
}

.header__panel {
  display: flex;
  min-width: 240px;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 6px;
  padding: 18px 20px;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(227, 238, 245, 0.8) 100%);
  border: 1px solid var(--color-line);
}

.header__label {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.header__value {
  text-align: right;
  color: var(--color-ocean);
}

.header__links {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
}

.header__link {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-ocean);
}

@media (max-width: 860px) {
  .header {
    grid-template-columns: 1fr;
  }

  .header__panel {
    align-items: flex-start;
  }

  .header__value {
    text-align: left;
  }

  .header__links {
    justify-content: flex-start;
  }
}
</style>
