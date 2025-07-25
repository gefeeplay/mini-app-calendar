<template>
    <dialog ref="DialogEL">
        <form @submit.prevent="saveEvent">
            <h3>События {{ day }} {{ monthName }}</h3>
            <div v-for="(ev, index) in events" :key="index" class="event-modal">
                <span>{{ ev }}</span>
                <button type="button" @click="deleteEvent(index)">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </div>
            <h3>Новое событие</h3>
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
</template>
<script setup>
import { ref } from 'vue';

const props = defineProps({
    day: Number,
    monthName: String,
    events: Array,
})

const emit = defineEmits(['close', 'save', 'delete']);

const eventText = ref('');
const DialogEL = ref(null);

function open() {
    DialogEL.value.showModal();
    eventText.value = '';
}

function closeDialog() {
    DialogEL.value?.close();
    emit('close');
}

function saveEvent() {
    if (eventText.value.trim()) {
        emit('save', eventText.value);
    }
    closeDialog();
}

function deleteEvent(index) {
    emit('delete', index);
}

defineExpose({ open, closeDialog });
</script>

<style scoped>
dialog {
  border: none;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px #333;
  width: 300px;
}

.event-modal{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #e5ffe5;
    border-radius: 0.5rem;
    margin-bottom: 4px;
    padding: 0 10px;
    height: 2.5rem;
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
    height: 1.8rem;
    border-radius: 0.5rem;
    margin-top: 15px;
}

.event-modal button {
    color: rgb(255, 0, 0);
    background: none;
    right: 5px;
}
</style>