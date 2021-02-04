import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/auth/Login'
import Signup from '@/views/auth/Signup'
import CreatePlaylist from '@/views/Playlist/CreatePlaylist'
import PlaylistDetails from '@/views/Playlist/PlaylistDetails'
import UserPlaylists from '@/views/Playlist/UserPlaylists'


//route guard  !--- Wowwwwwww, this is wowwwwwwwwwwwwwww-----! 
//see main.js to solve the refresh logout problem

import { projectAuth } from '@/firebase/config'

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser

  if (!user) {
    next({name: 'Login'})
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login

  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/playlist/create',
    name: 'CreatePlaylist',
    component: CreatePlaylist,
    beforeEnter: requireAuth
  },
  {
    path: '/playlists/:id',
    name: 'PlaylistDetails',
    component: PlaylistDetails,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: '/playlists/user',
    name: 'UserPlaylists',
    component: UserPlaylists,
    beforeEnter: requireAuth,
    
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
