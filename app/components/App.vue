<template>
    <Page>
        <ActionBar title="OAuth Demo: NativeScript-Vue"/>
        <StackLayout class="p-20">
            <Button text="Login" @tap="onLoginTap()" class="btn btn-primary btn-active"/>
            <Button text="Logout" @tap="onLogoutTap()" class="btn btn-primary btn-active"/>
          <StackLayout v-if="show" class="p-20">
             <Label :text="record.firstName + ' '+record.lastName" />
             <Label :text="record.email" />
             <Label :text="record.cellPhone" />
             <Label :text="record.employeeId" />
         </StackLayout>
        </StackLayout>
    </Page>
</template>

<script>
  
  export default {
    data() {
      return {
          show:true
      }
    },
    methods: {
     
        onLoginTap() {
          this.$authService.login()
        },
        onLogoutTap() {
          this.show=false
          this.$authService.logout()
           
        }
    },
    computed:{
   record (){
      return this.$store.getters.record
    },
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>
