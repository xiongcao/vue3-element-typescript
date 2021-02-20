<template>
  <span>{{ positionText }}</span>
</template>
<script lang="ts">

import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { TableListItem as TablePostionItem } from '../../position/data.d'
import { StateType as PostionStateType } from '../../position/store'

interface AdvertPositionData {
  positionText: string;
}

export default defineComponent({
  name: 'AdvertPosition',
  props: {
    positionId: {
      type: Number,
      require: true
    }
  },
  setup(props): AdvertPositionData {

    const store = useStore<{ AdvertPosition: PostionStateType}>();

     // 广告位置数据
    const advertPositionList = computed<TablePostionItem[]>(() => store.state.AdvertPosition.tableData.list);

    const positionText = ref<string>('');

    advertPositionList.value.forEach(item => {
      if (props.positionId === item.id) {
        positionText.value = item.name
      }
    });

    return {
      positionText: positionText as any as string
    }
  }

})
</script>
