<template>
    <v-container
            class="fill-height"
            fluid
    >
        <v-row
                align="center"
                justify="center"
        >
            <v-col
                    cols="12"
                    sm="8"
                    md="4"
            >
                <v-card class="elevation-12">
                    <SignInForm/>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import SignInForm from "@/components/user/SignInForm";

    export default {
        name: 'SignIn',
        components: {
            SignInForm
        }
    }
</script>