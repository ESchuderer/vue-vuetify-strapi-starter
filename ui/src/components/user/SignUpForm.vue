<template>
    <v-form>
        <v-card class="elevation-12">
            <v-toolbar
                    color="primary"
                    flat
            >
                <v-toolbar-title>
                    <v-icon left>mdi-account-plus</v-icon>
                    Sign Up
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-text-field
                        label="Username"
                        name="username"
                        prepend-icon="mdi-account"
                        type="text"
                        v-model="username"
                />

                <v-text-field
                        label="Email"
                        name="email"
                        prepend-icon="mdi-email"
                        type="email"
                        v-model="email"
                />

                <v-text-field
                        label="Password"
                        name="password"
                        prepend-icon="mdi-lock"
                        type="password"
                        v-model="password"
                />
            </v-card-text>
            <v-card-actions>
                <p>
                    Already have an account?
                    <router-link :to="{ name: 'Sign In'}">
                        Login
                    </router-link>
                </p>
                <v-spacer/>
                <v-btn color="primary" :disabled="loading" type="submit" @click="handleSubmit">
                    <v-icon left>mdi-account-plus</v-icon>
                    Sign Up
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script>
    import {mapMutations} from 'vuex'
    import strapi from '../../utils/strapi'

    export default {
        name: 'SignUpForm',
        data() {
            return {
                email: '',
                password: '',
                username: '',
                loading: false
            }
        },
        methods: {
            // Method that will register your users
            async handleSubmit() {
                try {
                    this.loading = true;
                    const response = await strapi.register(
                        this.username,
                        this.email,
                        this.password
                    );
                    this.loading = false;
                    // Call your setUser mutation from your auth.js store file
                    this.setUser(response.user);
                    this.$router.go(-1)
                } catch (err) {
                    this.loading = false;
                    console.log(err);
                }
            },
            // Define all your needed mutations, here: auth/setUser
            ...mapMutations({
                setUser: 'auth/setUser'
            })
        }
    }
</script>