<template>
    <v-form>
        <v-toolbar
                color="primary"
                flat
        >
            <v-toolbar-title>
                <v-icon left>mdi-login</v-icon>
                Sign In
            </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
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
            No account yet?
            <router-link :to="{ name: 'Sign Up' }">
                Register
            </router-link>
            <v-spacer/>
            <v-btn color="primary" :disabled="loading" type="submit" @click="handleSubmit">
                <v-icon left>mdi-login</v-icon>
                Sign In
            </v-btn>
        </v-card-actions>
    </v-form>
</template>

<script>
    import {mapMutations} from 'vuex'
    import strapi from '../../utils/strapi'

    export default {
        name: 'SignInForm',
        data() {
            return {
                email: '',
                password: '',
                loading: false
            }
        },
        methods: {
            async handleSubmit() {
                try {
                    this.loading = true
                    const response = await strapi.login(
                        this.email,
                        this.password
                    )
                    this.loading = false
                    this.setUser(response.user)
                    this.$router.go(-1)
                } catch (err) {
                    this.loading = false
                    console.log(err.message)
                }
            },
            ...mapMutations({
                setUser: 'auth/setUser'
            })
        }
    }
</script>