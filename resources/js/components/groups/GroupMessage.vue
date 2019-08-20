<template>
    <div>
        <v-card flat>
            <v-toolbar flat>
                <v-toolbar-title>
                    <v-list-item class="hidden-sm-and-up">
                        <v-list-item-icon
                            @click="$store.commit('home/setMode', { mode: 'chat' })"
                            style="margin-left: -10px; cursor: pointer"
                        >
                            <v-icon>fas fa-arrow-left</v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                </v-toolbar-title>
            </v-toolbar>
            <v-divider></v-divider>
        </v-card>
    </div>
</template>

<script>
export default {
    name: "GroupMessage"
};
</script>