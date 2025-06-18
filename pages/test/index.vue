<script setup lang="ts">
const route = useRoute();
const { data: home } = await useAsyncData(route.path, async () => {
    const docs = await queryCollection('content').all();
    return docs.find(doc => doc.path === route.path);
});

useSeoMeta({
    title: home.value?.title,
    description: home.value?.description,
});
</script>

<template>
    <ContentRenderer v-if="home" :value="home" />
    <div v-else>Home not found</div>
</template>
