<template>
  <div :class="['detail-list', size, layout === 'vertical' ? 'vertical': 'horizontal']">
    <div v-if="title" class="title">{{ title }}</div>
    <a-row>
      <slot></slot>
    </a-row>
  </div>
</template>

<script>

  export default {
    name: 'DetailList',
    components: {
    },
    props: {
      title: {
        type: String,
        default: '',
        required: false
      },
      col: {
        type: Number,
        required: false,
        default: 3
      },
      size: {
        type: String,
        required: false,
        default: 'large'
      },
      layout: {
        type: String,
        required: false,
        default: 'horizontal'
      }
    },
  }
</script>

<style lang="scss">

  .detail-list {
    .title {
      color: rgba(0,0,0,.85);
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 16px;
    }
    .term {
      color: rgba(0,0,0,.85);
      display: table-cell;
      line-height: 20px;
      margin-right: 8px;
      padding-bottom: 16px;
      white-space: nowrap;
      &:after {
        content: ":";
        margin: 0 8px 0 2px;
        position: relative;
        top: -.5px;
      }
    }
    .content {
      color: rgba(0,0,0,.65);
      display: table-cell;
      line-height: 22px;
      padding-bottom: 16px;
      width: 100%;
    }

    &.small {

      .title {
        font-size: 14px;
        color: rgba(0, 0, 0, .65);
        font-weight: normal;
        margin-bottom: 12px;
      }
      .term, .content {
        padding-bottom: 8px;
      }
    }

    &.large {
      .term, .content {
        padding-bottom: 16px;
      }

      .title {
        font-size: 16px;
      }
    }

    &.vertical {
      .term {
        padding-bottom: 8px;
      }
      .term, .content {
        display: block;
      }
    }
  }
</style>