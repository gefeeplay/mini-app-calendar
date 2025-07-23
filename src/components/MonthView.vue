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
            <div v-if="getEvent(day.number)" class="event">
                {{ getEvent(day.number) }}
            </div>
        </div>
            
            

        </div>

        <!-- Модальное окно -->
        <dialog ref="eventDialog">
        <form @submit.prevent="saveEvent">
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
                <button v-if="getEvent(currentDay)" type="button" @click="deleteEvent" style="color: red;">Удалить</button>
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
        eventText.value = getEvent(day) || '';
        eventDialog.value.showModal();
    }

    function closeDialog() {
        eventDialog.value.close();
    }

    function saveEvent() {
        const key = `${props.year}-${String(props.curMonth + 1).padStart(2, '0')}-${String(currentDay.value).padStart(2, '0')}`;
        events.value[key] = eventText.value;
        closeDialog();
    }

    function deleteEvent(){
        const key = `${props.year}-${String(props.curMonth + 1).padStart(2, '0')}-${String(currentDay.value).padStart(2, '0')}`;
        delete events.value[key];
        closeDialog();
    }

    function getEvent(day) {
        const key = `${props.year}-${String(props.curMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return events.value[key];
    }

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
  margin-top: 2px;
  color: darkgreen;
  background: #e5ffe5;
  padding: 2px;
  border-radius: 3px;
  word-break: break-word;
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

</style>