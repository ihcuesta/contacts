<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h6>Add Contact</h6>
      </div>
      <div class="card-body">
        <!-- <form v-on:submit.prevent="onSaveProduct" :validation-schema="schema"> -->
        <VeeForm
          :validation-schema="schema"
          @submit="onSubmit"
        >
          <!-- <Form @submit="onSaveProduct" :validation-schema="schema"> -->
          <div class="form-group row my-1">
            <div class="col-6">
              <label>First Name:</label>
              <Field
                id="title"
                v-model="product.firstName"
                name="firstName"
                type="text"
                class="form-control"
              />
              <ErrorMessage
                name="firstName"
                class="text-capitalize text-danger"
              />
            </div>
            <div class="col-6">
              <label>Last Name:</label>
              <Field
                v-model="product.lastName"
                name="lastName"
                type="text"
                class="form-control"
              />
              <ErrorMessage
                name="lastName"
                class="text-capitalize text-danger"
              />
            </div>
          </div>
          <div class="form-group row my-1">
            <div class="col-12">
              <label>Company</label>
              <Field
                v-model="product.company"
                name="company"
                type="text"
                class="form-control"
              />
              <ErrorMessage
                name="company"
                class="text-capitalize text-danger"
              />
            </div>
          </div>
          <div class="form-group row my-1">
            <div class="col-12">
              <label>Email</label>
              <Field
                v-model="product.email"
                name="description"
                type="text"
                class="form-control"
              />
              <ErrorMessage
                name="description"
                class="text-capitalize text-danger"
              />
            </div>
          </div>
          <div class="form-group row my-1">
            <div class="col-12">
              <label>Phone</label>
              <Field
                v-model="product.phone"
                name="phone"
                type="text"
                class="form-control"
              />
              <ErrorMessage
                name="phone"
                class="text-capitalize text-danger"
              />
            </div>
          </div>
          <div class="form-group">
            <router-link
              to="/products"
              class="btn btn-secondary mr-2"
            >
              Cancel
            </router-link>
            <input
              v-if="!isCreating"
              type="submit"
              class="btn btn-primary mx-2 my-2"
              value="Add Product"
            >
            <button
              v-if="isCreating"
              class="btn btn-primary mx-2 my-2"
              type="button"
              disabled
            >
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
              Saving...
            </button>
          </div>
        </VeeForm>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Field, Form as VeeForm, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  components: {
    Field,
    VeeForm,
    ErrorMessage,
  },

  setup() {
    // Define a validation schema
    const schema = yup.object({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      phone: yup.string().required().min(6),
      company: yup.string().required(),
      email: yup.string()
    });

    return {
      schema,
    };
  },

  data() {
    return {
      product: {},
    };
  },

  computed: { ...mapGetters(["isCreating", "createdData"]) },

  watch: {
    createdData: function () {
      if (this.createdData !== null && !this.isCreating) {
        this.$swal.fire({
          text: "Success, Product has been added.",
          icon: "success",
          position: "top-end",
          timer: 1000,
        });
      }
    },
  },

  methods: {
    ...mapActions(["storeProduct"]),
    onSubmit() {
      const { firstName, lastName, company, email, phone } = this.product;
      this.storeProduct({
        firstName,
        lastName,
        company,
        email,
        phone
      });
      this.$router.push({ path: "/products" });
    },
  },
};
</script>
