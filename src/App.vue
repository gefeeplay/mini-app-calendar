<template>

  <!-- Переключение между годом и месяцем -->
  <div class="calendar-wrapper">  
  <MonthView
      v-if="curMonth !== null"
      :curMonth="curMonth"
      :year="year"
      :getMonthDays="getMonthDays"
      :monthNames="monthNames"
      :weekDays="weekDays"
      @close="curMonth = null"
      class="month-overlay"
    />

  <div v-else>
    <div class="head">
      <div>
        <button class="left" @click="decreaseYear"></button>
      </div>
      <div>Календарь {{ year }} года</div> 
      <div>
        <button class="right" @click="increaseYear"></button>
      </div>
    </div>

    <div class="calendar" id="calendar">
      <div 
        v-for="(month, index) in 12" 
        :key="index"
        :curMonth="curMonth" 
        class="month"
        >
        <div class="month-name" @click="curMonth = index">{{ monthNames[index] }}</div>
          
          <!-- Дни недели -->
          <div class="weekdays">
            <div v-for="(dayName, dayIndex) in weekDays" :key="dayIndex" class="day weekday">
              {{ dayName }}
            </div>
          </div>
          
          <!-- Сетка дней месяца -->
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
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MonthView from './components/monthView.vue';

const today = new Date();
const year = ref(2025);
const curMonth = ref(null);

const monthNames = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];
const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс" ]

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

function increaseYear() {
  year.value++;
}

function decreaseYear() {
  year.value--;
}
</script>

<style scoped>
</style>
