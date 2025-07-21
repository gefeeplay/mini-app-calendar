<template>
  <div class="head">
    <div>
      <button class="left" @click="decreaseYear"></button>
    </div>
    <div>Календарь {{ year }} года</div> 
    <div>
      <button class="right" @click="addYear"></button>
    </div>
  </div>
  
  <div class="calendar" id="calendar">
    <div 
      v-for="(month, index) in 12" 
      :key="index" 
      class="month"
      >
      <div class="month-name"> {{ monthNames[index] }}</div>
        <div class="days">
          <div v-for="day in getMonthDays(index)" 
          :key="day.key" 
          class="day" 
          :class="{empty: !day.number}"
          >
          {{ day.number || '' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const year = ref(2025);

const monthNames = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

function getMonthDays(monthIndex) {
  const days = [];
  const firstDay = new Date(year.value, monthIndex, 1);
  const totalDays = new Date(year.value, monthIndex + 1, 0).getDate();
  const startOffset = (firstDay.getDay() + 6) % 7; // начало с понедельника

  const totalCells = 42; // 6 недель × 7 дней

  for (let i = 0; i < totalCells; i++) {
    const dayNumber = i - startOffset + 1;
    days.push({
      key: `${monthIndex}-${i}`,
      number: dayNumber > 0 && dayNumber <= totalDays ? dayNumber : null
    });
  }

  return days;
}

function addYear() {
  year.value++;
}

function decreaseYear() {
  year.value--;
}
</script>

<style scoped>
</style>
