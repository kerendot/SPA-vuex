import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Todos from '@/components/todos/Todos'
import BookApp from '@/components/books/BookApp'
import EmailApp from '@/components/emails/EmailApp'
import Chat from '@/components/chat/Chat'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/todos',
      name: 'Todos',
      component: Todos
    },
    {
      path: '/books',
      name: 'Books',
      component: BookApp
    },

    {
      path: '/emails',
      name: 'Emails',
      component: EmailApp
    },

    {
      path: '/chat',
      name: 'Chat',
      component: Chat
    },

  ]
})
