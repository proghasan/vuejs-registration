<template>
    <div class="container">
        <p class="text-center">
            <router-link to="login" class="btn btn-sm btn-success m-2">Login / Registration</router-link>
        </p>
        <h1 class="text-center">Registration Form</h1>
        <form method="post" enctype="multipart/form-data">
            <div class="mb-3">
                <label class="form-label">Applicant's Name</label>
                <input type="text" class="form-control" v-model="application.name">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            application: {
                name: 'Hasan'
            }      
        }
    },
}
</script>