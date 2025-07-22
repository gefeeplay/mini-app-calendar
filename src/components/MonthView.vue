<template>
    <div class="month-view">
        <div class="header">
        <button @click="$emit('close')" class="close"></button>
        <span>{{ monthNames[curMonth] }} {{ year }}</span>
        </div>

        <!-- Дни недели -->
        <div class="weekdays">
        <div v-for="(day, i) in weekDays" :key="i" class="day weekday">
            {{ day }}
        </div>
        </div>

        <!-- Сетка дней месяца -->
        <div class="days">
        <div
            v-for="day in getMonthDays(curMonth, year)"
            :key="day.key"
            class="day"
            :class="{ empty: !day.number }"
        >
            {{ day.number || '' }}
        </div>
        </div>
    </div>
</template>


<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        curMonth: Number,
        year: Number,
        getMonthDays: Function,
        monthNames: Array,
        weekDays: Array
    });

</script>


<style scoped>
.month-view {
  min-height: 95%;
  padding: 16px;
  background-color: #c0c3dd;
  border: 1px solid #ccc;
  border-radius: 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  margin-bottom: 10px;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font-size: 18px;
  text-align: center;
}

.day {
    height: 100px;
}

button.close {
    background-image: url("../assets/caret-left.svg");
    background-size: contain;
    background-color: #c0c3dd;
    margin-left: 1rem;
}
</style>