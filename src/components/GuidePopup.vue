<template>
  <div class="overlay" v-if="visible">
    <div class="popup">
      <div class="close_wrapper">
        <div class="material-symbols-outlined close_btn" @click="closeGuide()">close</div>
      </div>
      <h2 style="text-align: center; margin: 0;">{{ pages[curPage].title }}</h2>

      <div v-if="curPage === 0">
        <p>Это веб-версия интерактивного календаря.
          Здесь вы можете создавать и просматривать события по дням.</p>
        <p style="font-weight: 700;">Особенности:</p>
        <p>Удобное всплывающее окно, которое поможет вспомнить о сегодняшних событиях.</p>
        <p>Все события сохраняются в <span style="background-color:rgb(224, 224, 224);">localStorage</span> - ваши
          события останутся при повторном входе.</p>
      </div>
      <div v-if="curPage === 1">
        <p>Календарь имеет 2 варианта визуализации:</p>
        <p><span style="background-color:rgb(224, 224, 224);">Годовой</span>: здесь вы можете просматривать календарь за
          определенный год, легко переключаясь по кнопкам вверху страницы:
          <span><img src="../assets/caret-left.svg" /> <img src="../assets/caret-left.svg"
              style="transform: rotate(180deg);" /></span>
        </p>
        <p><span style="background-color:rgb(224, 224, 224);">Месячный</span>: здесь вы можете работать с событиями -
          достаточно нажать на название конкретного месяца.
        </p>
      </div>
      <div v-if="curPage === 2">
        <p>Чтобы начать редактировать события дня, достаточно нажать соответствующую кнопку:
          <span class="material-symbols-outlined">edit_note</span>
        </p>
        <p>В окне редактирования, вы можете
          <span style="background-color:rgb(224, 224, 224);">создавать</span>
          новые и
          <span style="background-color:rgb(224, 224, 224);">удалять</span>
          уже созданные события.
        </p>
        <p>
          <span style="background-color:rgb(224, 224, 224);">Создание</span>
          : необходимо ввести название события и подтвердить, нажав кнопку "Сохранить"
        </p>
        <p>
          <span style="background-color:rgb(224, 224, 224);">Удаление</span>
          : достаточно нажать кнопку <span class="material-symbols-outlined" style="color: red;">delete</span>
        </p>
        <p>
          Чтобы
          <span style="background-color:rgb(224, 224, 224);">выйти</span>
          из окна редактирования необходимо нажать кнопку "Назад" или клавишу Esc
        </p>

      </div>
      <div v-if="curPage === 3">
        <p>Теперь вы можете приступать к работе с календарем!</p>
        <p>Если вы что-то забудете вы всегда можете открыть это окно, нажав кнопку
          <span class="material-symbols-outlined">help</span>
        </p>
        <p>Рядом есть ссылка на данный проект на github:
          <span><img src="../assets/github.svg" /></span>
        </p>
      </div>

      <div class="buttons">
        <button @click="prevPage" :disabled="curPage === 0">Назад</button>
        <button v-if="!isLastPage" @click="nextPage">Далее</button>
        <button v-else @click="closeGuide">Завершить</button>
      </div>
    </div>
  </div>
</template>
<script setup>

import { ref, computed, onMounted, defineExpose } from 'vue';

const visible = ref(false);
const curPage = ref(0);

const pages = [
  {
    title: 'Добро пожаловать!'
  },
  {
    title: 'Выбор даты'
  },
  {
    title: 'Работа с событием'
  },
  {
    title: 'Готово!'
  }
]

const isLastPage = computed(() => curPage.value === pages.length - 1);

function nextPage() {
  if (curPage.value < pages.length - 1) {
    curPage.value++;
  }
}

function prevPage() {
  if (curPage.value > 0) {
    curPage.value--;
  }
}

function openGuide() {
  visible.value = true;
  curPage.value = 0;
}

function closeGuide() {
  visible.value = false;
  localStorage.setItem('wasGuideShown', 'true');
}

if (!localStorage.getItem('wasGuideShown')) {
  visible.value = true;
}


defineExpose({ openGuide })
</script>
<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 300px;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.2);
}


.buttons {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

button {
  background-color: #4a63d2;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  width: auto;
  transition: background-color 0.2s ease;
}

button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #6679d1;
}

.material-symbols-outlined {
  font-size: 16px;
  position: relative;
  top: 5px;
}

.close_wrapper {
  display: flex;
  justify-content: end;
}

.close_btn {
  cursor: pointer;
  transition: color 0.2s ease;
  user-select: none;
}

.close_btn:hover {
  color: #555;
}
</style>