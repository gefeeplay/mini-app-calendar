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

        <!-- Модальное окно -->
        <dialog ref="eventDialog">
        <form @submit.prevent="saveEvent">
            <h3>События {{ currentDay }} {{ monthNames[curMonth] }}</h3>
            <div v-for="(ev, index) in getEvents(currentDay)" :key="index" class="event-modal">
                <span>{{ ev }}</span>
                <button type="button" @click="deleteEvent(index)">Удалить</button>
            </div>
            <h3>Новое событие для {{ currentDay }} {{ monthNames[curMonth] }}</h3>
            <input
            v-model="eventText"
            type="text"
            placeholder="Введите событие"
            required
            />
            <div class="edit-buttons">
                <button type="submit" style="color: green;">Сохранить</button>
                <button type="button" @click="closeDialog">Отмена</button>
            </div>
        </form>
        </dialog>
    </div>
</template>


<script setup>
    import { ref, defineProps } from 'vue';

    const props = defineProps({
        curMonth: Number,
        year: Number,
        getMonthDays: Function,
        monthNames: Array,
        weekDays: Array
    });

    const eventDialog = ref(null);
    const currentDay = ref(null);
    const eventText = ref('');
    const events = ref({});

    function openDialog(day){
        currentDay.value = day;
        eventText.value = '';
        eventDialog.value.showModal();
    }

    function closeDialog() {
        eventDialog.value.close();
    }

    function saveEvent() {
        const key = formatDateKey(currentDay.value);
        if (!events.value[key]) {
            events.value[key] = [];
        }
        events.value[key].push(eventText.value);
        eventText.value = '';
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

dialog {
  border: none;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px #333;
  width: 300px;
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

.event-modal{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #e5ffe5;
    border-radius: 0.5rem;
    margin-bottom: 4px;
    padding: 0 5px 0 5px;
    height: 2rem;
}

dialog::backdrop {
  background: rgba(0, 0, 0, 0.4);
}

.edit-buttons{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.edit-buttons button{
    min-width: 30%;
    height: 1.5rem;
    border-radius: 0.5rem;
    margin-top: 15px;
}

.event-modal button {
    min-width: 30%;
    height: 1.5rem;
    border-radius: 0.5rem;
    color: red;
}

</style>