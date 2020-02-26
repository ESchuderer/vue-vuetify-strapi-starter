<template>
    <v-app id="inspire">
        <v-navigation-drawer
                app
                :mini-variant="mini"
                permanent
                clipped
        >
            <v-list dense>
                <v-list-item
                        v-for="route in routes"
                        :key="route.path"
                        :to="route.path"
                >
                    <v-list-item-icon v-if="route.icon">
                        <v-icon>{{ route.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-title>{{ route.name }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
                app
                color="primary"
                clipped-left
        >
            <v-btn icon @click.stop="mini = !mini">
                <v-icon>{{ mini ? 'mdi-chevron-right' : 'mdi-chevron-left'}}</v-icon>
            </v-btn>
            <v-toolbar-title>
                Strapi + Vue
                <small>- {{$router.currentRoute.name}}</small>
            </v-toolbar-title>

            <v-spacer/>

            <v-menu
                    :nudge-width="200"
                    offset-y
            >
                <template v-slot:activator="{ on }">
                    <v-btn
                            icon
                            v-on="on"
                    >
                        <v-icon>mdi-account</v-icon>
                    </v-btn>
                </template>

                <v-card>
                    <v-list v-if="username">
                        <v-list-item>
                            <v-list-item-avatar>
                                <v-avatar color="primary">
                                    <span>{{ getInitials(username) }}</span>
                                </v-avatar>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>{{ username }}</v-list-item-title>
                                <v-list-item-subtitle>Subtitle</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-divider/>

                        <v-list-item @click="logout">
                            <v-list-item-icon>
                                <v-icon>mdi-logout</v-icon>
                            </v-list-item-icon>

                            <v-list-item-title>Logout</v-list-item-title>
                        </v-list-item>
                    </v-list>

                    <v-list v-else>
                        <v-list-item to="/users/sign-in">
                            <v-list-item-icon>
                                <v-icon>mdi-login</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Sign In</v-list-item-title>
                        </v-list-item>

                        <v-list-item to="/users/sign-up">
                            <v-list-item-icon>
                                <v-icon>mdi-account-plus</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Sign Up</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-menu>

            <v-btn icon @click="switchTheme">
                <v-icon :color="`${isDark && 'yellow'}`">mdi-brightness-4</v-icon>
            </v-btn>
        </v-app-bar>

        <v-content>
            <v-container
                    fluid
            >
                <router-view/>
            </v-container>
        </v-content>

        <v-footer app inset>
            <v-col
                    class="text-center"
                    cols="12"
            >
                {{ new Date().getFullYear() }} — <strong>Strapi + Vue</strong>
            </v-col>
        </v-footer>
    </v-app>
</template>

<script>
    import {mapMutations, mapState} from 'vuex';
    import initials from 'node-initials';

    export default {
        data: () => ({
            mini: true
        }),
        computed: {
            ...mapState({
                isDark: state => state.style.isDark
            }),
            username() {
                return this.$store.getters['auth/username']
            },
            routes() {
                return this.$router.options.routes.filter(route => route.main);
            }
        },
        methods: {
            ...mapMutations({
                logout: 'auth/logout',
                switchTheme: 'style/switchTheme'
            }),
            getInitials(name) {
                return initials(name);
            }
        },
        beforeCreate() {
            this.$store.dispatch('auth/initialize')
            this.$store.dispatch('style/initialize')
        }
    };
</script>
