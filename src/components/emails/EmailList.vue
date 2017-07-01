<template>
  <div class="home">
    <email-preview v-for="currEmail in emails" :key="currEmail._id" 
    :email="currEmail" :class="{unread:!currEmail.isRead}" 
    @archive="archiveEmail(currEmail)" 
    @click.native="selectEmail(currEmail)">
    </email-preview>
  </div>
</template>

<script>
import EmailPreview from './EmailPreview'
import { EMAIL_DELETE } from '../../store/emails.store'


export default {
  name: 'email-list',
  props: ['emails'],
  components: {
    EmailPreview,
  },

  methods: {
    selectEmail(email) {
      //if only need to update display of details:
      if (email.isRead) {
        this.$store.commit({ type: 'selectEmail', email });
        return;
      }
      //if an update to the server is needed:
      const updatedEmail = Object.assign({}, email);
      updatedEmail.isRead = true;
      this.$store.dispatch({ type: 'selectEmail', email: updatedEmail });
    },
    archiveEmail(email) {
      this.$store.dispatch({ type: EMAIL_DELETE, email });
    }
  }
}
</script>

<style lang="scss" scoped>
email-preview {
  padding: 0;
}
</style>
