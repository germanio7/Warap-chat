<template>
    <div>
        <h1>mensajes</h1>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "GroupMessage"
};
</script>

<style>
.chat-container {
    border: solid 1px red;
    max-height: 100vh;
    overflow: auto;
}
</style>