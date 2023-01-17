<template>
  <HeaderPartial />
  <div class="bg flex p-10 items-center flex-col divide-y divide-black-500">
    <div class="sm:w-11/12 md:w-7/12 py-5">
      <router-view />
    </div>
  </div>
</template>

<script>
import HeaderPartial from './header/HeaderPartial.vue';


export default {
    name: "Layout",
    components: { HeaderPartial }
};
</script>
