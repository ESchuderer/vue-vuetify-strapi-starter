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
                <SignUpForm/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import SignUpForm from "../../components/user/SignUpForm";

    export default {
        name: 'SignUp',
        components: {
            SignUpForm
        }
    }
</script>
