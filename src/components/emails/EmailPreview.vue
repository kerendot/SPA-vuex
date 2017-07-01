<template>
  <div class="single-email home">
    <i class="el-icon-close" @click.stop="archiveEmail"></i> <br><br>
    <h3>{{email.subject}}</h3>
    <p>{{email.body}}</p>
  </div>
</template>

<script>
import EmailList from './EmailList'

export default {
  name: 'email-preview',
  props: ['email'],
  methods: {
    archiveEmail() {
      this.$emit('archive')
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h3:hover, .el-icon-close:hover{
  cursor: pointer;
}
.single-email {
  text-align: left; 
  border: 1px solid yellow; 
  padding: 20px;
  overflow: hidden;
  border: {
    top: 1px solid rgba(173, 169, 169, 1);
    right: 0 solid;
    bottom: 1px solid rgba(173, 169, 169, 1);
    left: 0 solid;
  }
  font: normal 16px/1 "Trebuchet MS",
  Helvetica,
  sans-serif;
  color: rgba(29,73,84,1);
  text-overflow: ellipsis;
  background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0, rgba(200,200,200,0.7) 100%);
  background-position: 50% 50%;
  background-origin: padding-box;
  background-clip: border-box;
  background-size: auto auto;
  box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.3);
  h3 {
    margin: 0;
    font-weight: 200;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
    
  }
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 95%;
  }
}

.unread {
  h3 {
    font-weight: bold;
    color: rgba(54,155,181,1);
  }
  p {
    font-weight: bold;
  }
}

a {
  color: #42b983;
}
</style>
