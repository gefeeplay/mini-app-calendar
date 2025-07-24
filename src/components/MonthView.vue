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
            <div v-for="day in getMonthDays(curMonth, year)" :key="day.key" class="day" :class="{ empty: !day.number }">
                {{ day.number || '' }}
                <button 
                v-if="day.number" 
                class="edit" 
                @click="openDialog(day.number)"
                >
                </button>

                <!-- отображаем событие -->
                <div v-if="day.number && getEvents(day.number).length" 
                class="event"
                v-for="(ev, i) in getEvents(day.number)" 
                :key="i"
                >
                    {{ ev }}
                </div>
            </div>
        </div>

        <DayView ref="eventDialog" 
        :day="currentDay" 
        :monthName="monthNames[curMonth]" 
        :events="getEvents(currentDay)"  
        @close="closeDialog" 
        @save="saveEvent" 
        @delete="deleteEvent" 
        />

    </div>
</template>


<script setup>
    import { ref, defineProps } from 'vue';
    import DayView from './DayView.vue';

    const props = defineProps({
        curMonth: Number,
        year: Number,
        getMonthDays: Function,
        monthNames: Array,
        weekDays: Array
    });

    const eventDialog = ref(null);
    const currentDay = ref(null);
    const events = ref({});

    function openDialog(day) {
        currentDay.value = day;
        eventDialog.value.open();
    }

    function closeDialog() {
        eventDialog.value.close();
    }

    function saveEvent(text) {
        const key = formatDateKey(currentDay.value);
        if (!events.value[key]) {
            events.value[key] = [];
        }
        events.value[key].push(text);
        closeDialog();
    }

    function deleteEvent(index) {
    const key = formatDateKey(currentDay.value);
        if (events.value[key]) {
            events.value[key].splice(index, 1);
            if (events.value[key].length === 0) {
                delete events.value[key];
            }
        }
    }

    function getEvents(day) {
        const key = formatDateKey(day);
        return events.value[key] || [];
    }

    function formatDateKey(day) {
        return `${props.year}-${String(props.curMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }

</script>


<style scoped>

h3{
    text-align: center;
}

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

.day.empty .edit {
  display: none;
}

.event {
  font-size: 11px;
  color: darkgreen;
  background: #e5ffe5;
  padding: 2px;
  margin: 0px 5px 2px 25%;
  border-radius: 3px;
  word-break: break-word;
  width: 50%;
}

</style>