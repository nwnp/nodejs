<template>
  <div>
    <h1>Event test</h1>
    <h3>1. 클릭/더블클릭 이벤트</h3>
    <div>
      <div>
        <p>나의 나이는: {{ age }}</p>
        <button @click="addAge(1)">1살 추가</button>
        <button @click="deleteAge(1)">1살 삭제</button>
        <button @dbclick="addAge(10)">10살씩 추가(더블클릭)</button>
        <button @click.once="addAge(1)">1살 추가(한번만)</button>
      </div>
      <div style="margin-top: 20px">
        <input v-model="message" />
        <button @click="printMessage">콘솔 프린트</button>
      </div>
    </div>
    <h3>3. 마우스 추적 이벤트</h3>
    <div>
      <div
        style="
          margin-top: 20px;
          height: 200px;
          width: 300px;
          border: 1px solid red;
        "
        @mouseover="mouseTrack"
      >
        마우스 X: {{ mouseX }}, 마우스 Y: {{ mouseY }}
      </div>
    </div>
    <h3>4. 키보드 이벤트</h3>
    <div>
      <div>
        이름: <input v-model="inputName" @keyup.enter="setMyName" />(Enter
        이벤트)
      </div>
      <div>
        아이디:
        <input v-model="inputId" @keyup.ctrl.enter="setMyId" />(Ctrl+Enter
        이벤트)
      </div>
      <p>나의 이름: {{ myName }}</p>
      <p>나의 아이디: {{ myId }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      age: 20,
      message: null,
      mouseX: 0,
      mouseY: 0,
      inputName: null,
      inputId: null,
      myName: null,
      myId: null,
    };
  },
  methods: {
    addAge: function (year) {
      this.age += year;
    },
    deleteAge: function (year) {
      this.age -= year;
    },
    printMessage() {
      console.log(event);
    },
    mouseTrack(event) {
      this.mouseX = event.offsetX;
      this.mouseY = event.offsetY;
    },
    setMyName() {
      this.myName = this.inputName;
    },
    setMyId() {
      this.myId = this.inputId;
    },
  },
};
</script>

<style lang="scss" scoped></style>
