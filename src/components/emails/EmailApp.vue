<template>
  <div class="home">
    <h2>You have {{emailsCount}} emails</h2>
    <!-- NEW MSG -->
    <el-button v-show="!showCompose" @click="openComposeMsg"> Compose </el-button>
  
    <email-compose v-show="showCompose" @createEmail="createEmail" @cancel="closeComposeMsg">
    </email-compose>
  
    <!--EMAILS-->
    <div class="email-box flex">
      <div class="list-filter">
        <email-filter class="filter"></email-filter>
        <email-list v-if="emailsToDisplay" 
        class="email-list" 
        :emails="emailsToDisplay" >
          <h2>Email list</h2>
        </email-list>
      </div>
      <email-details class="email-details" :email="selectedEmail">
      </email-details>
    </div>
  
    <email-status class="email-status" :readPerc="readPerc">
    </email-status>
  
  </div>
</template>

<script>
import { EMAIL_CREATE, EMAIL_LOAD, EMAIL_DELETE } from '../../store/emails.store'

import EmailList from './EmailList'
import EmailDetails from './EmailDetails'
import EmailCompose from './EmailCompose'
import EmailStatus from './EmailStatus'
import EmailFilter from './EmailFilter'
import EmailService from '../../services/email/email.service';

export default {
  name: 'email',
  components: {
    EmailList,
    EmailDetails,
    EmailStatus,
    EmailCompose,
    EmailFilter
  },
  data() {
    return {
      showCompose: false,
      emailsCountPrev: null //used to show a message when a new email arrives
    }
  },
  created() {
    this.$store.dispatch({ type: EMAIL_LOAD });
  },
  computed: {
    emailsToDisplay() {
      return this.$store.getters.filteredEmails;
    },
    readPerc() {
      return this.$store.getters.readPerc;
    },
    emailsCount (){
      return this.$store.getters.emailsCount;
    },
    selectedEmail (){
      return this.$store.state.email.selectedEmail;
    },
  },
  methods: {
    openComposeMsg() {
      this.showCompose = true;
    },
    closeComposeMsg() {
      this.showCompose = false;
    },
    createEmail(subject, body) {
      this.closeComposeMsg();
      var newEmail = {
        subject,
        body,
        isRead: false
      };
      this.$store.dispatch({ type: EMAIL_CREATE, email: newEmail });
    },
  },
  watch: {
    emailsCount() {
      if (this.emailsCountPrev !== null && this.emailsCount > this.emailsCountPrev) {
        //activate Element's message
          this.$message('You have new email');
        }
      this.emailsCountPrev = this.emailsCount;
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
}

.home {
  .email-box {
    flex-direction: row;
    margin-top: 10px;
  }

  .list-filter {
    width: 40%;
  }
  .email-list {
    // width: 40%;
    margin: 5px;

    background-image: linear-gradient(180deg, rgba(255, 255, 255, 1) 0, rgba(247, 245, 185, 1) 100%);
    background-position: 50% 50%;
    background-origin: padding-box;
    background-clip: border-box;
    background-size: auto auto;
  }
  .email-details {
    width: 60%;
    margin: 5px;
    border: 2px solid lightgrey;
    background-position: 50% 50%;
    background-origin: padding-box;
    background-clip: border-box;
    background-size: auto auto;
  }
  .email-status {
    width: 100%;
  }
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
