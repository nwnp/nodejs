<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/test">Test</router-link> |
      <router-link to="/test-event">TestEvent</router-link> |
      <router-link to="/test-computed">TestComputed</router-link> |
      <router-link to="/test-condition">TestCondition</router-link> |
      <router-link to="/test-loop">TestLoop</router-link> |
      <router-link to="/test-bootstrap">TestBootstrap</router-link> |
      <router-link to="/test-comp">TestComp</router-link> |
      <router-link to="/test-family/props">TestProps</router-link> |
      <router-link to="/test-family/emit">TestEmit</router-link> |
      <router-link to="/test-user/list">TestList</router-link> |
      <router-link to="/test-user/info">TestInfo</router-link> |
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
