<template>
  <nav class="navbar navbar-expand navbar-light bg-light sticky-top">
    <div class="container">
      <router-link
        to="/products"
        class="navbar-brand"
      >
        ivanherranz.com
      </router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link
            to="/products"
            class="nav-link"
          >
            <i class="fa fa-user" />
            Contacts
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/products/create"
            class="nav-link"
          >
            <i class="fa fa-plus-circle" /> Add
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/about"
            class="nav-link"
          >
            <i class="fa fa-info-circle" />
            About
          </router-link>
        </li>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "HeaderPartial",
};
</script>
