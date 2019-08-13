<template>
    <v-layout justify-center>
        <v-flex>
            <v-layout justify-end>
                <croppa
                    v-model="photo"
                    :width="200"
                    :height="200"
                    placeholder="Foto de Perfil"
                    canvas-color="transparent"
                    placeholder-color="#000"
                    :placeholder-font-size="24"
                    :show-remove-button="false"
                    :show-loading="true"
                    :loading-size="25"
                    :prevent-white-space="true"
                    :zoom-speed="10"
                    initial-image="images/logo.png"
                ></croppa>
            </v-layout>
        </v-flex>
        <v-flex mt-3 ml-3>
            <v-layout column>
                <v-btn text icon color="primary" @click="photo.zoomIn()">
                    <v-icon>fas fa-search-plus</v-icon>
                </v-btn>
                <v-btn text icon color="primary" @click="photo.zoomOut()">
                    <v-icon>fas fa-search-minus</v-icon>
                </v-btn>
                <v-btn text icon color="primary" @click="photo.rotate()">
                    <v-icon>fas fa-redo-alt</v-icon>
                </v-btn>
                <div v-if="photo != null">
                    <v-btn
                        v-show="photo.hasImage()"
                        text
                        icon
                        color="primary"
                        @click="photo.remove()"
                    >
                        <v-icon>fas fa-times</v-icon>
                    </v-btn>
                    <v-btn
                        v-show="!photo.hasImage()"
                        text
                        icon
                        color="primary"
                        @click="photo.chooseFile()"
                    >
                        <v-icon>fas fa-plus</v-icon>
                    </v-btn>
                </div>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    name: "EditPhoto",

    data() {
        return {
            photo: null
        };
    }
};
</script>>