<template>
  <Transition name="fade">
    <div
      v-if="showing"
      class="modal-mask overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
      @click.self="close"
    >
      <div class="relative w-6/12 bg-green-100 shadow-lg rounded-md p-5">
        <button
          aria-label="close"
          class="absolute top-0 right-0 text-4xl text-gray-500 my-2 mx-4"
          @click.prevent="close"
        >
          ×
        </button>
        <form
        @submit.prevent="onSubmit"
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2"
        >
        <div v-if="isLoading">
            <div class="text-center">
              <div
                class="spinner-border text-primary"
                role="status"
              >
                <span class="sr-only">Loading...</span>
              </div>
              <br>
              Loading Product Details
            </div>
          </div>
          <div class="-mx-3 md:flex mb-6">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-first-name"
              >
                First Name
              </label>
              <input
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                id="grid-first-name"
                type="text"
                ref="firstName"
                placeholder="Jane"
                :value="editContactId.firstName"
                @input="updateProductInputAction"
              />
            </div>
            <div class="md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Last Name
              </label>
              <input
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                ref="lastName"
                type="text"
                placeholder="Doe"
                :value="editContactId.lastName"
                @input="updateProductInputAction"
              />
            </div>
          </div>
          <div class="-mx-3 md:flex mb-6">
            <div class="md:w-full px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-password"
              >
                Email
              </label>
              <input
                class="block appearance-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                ref="email"
                placeholder="Enter your email"
                :value="editContactId.email"
                @input="updateProductInputAction"
              />
            </div>
          </div>
          <div class="-mx-3 md:flex mb-2">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-city"
              >
                Phone
              </label>
              <input
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                type="phone"
                ref="phone"
                placeholder="017**********"
                :value="editContactId.phone"
                @input="updateProductInputAction"
              />
            </div>

            <div class="md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              >
                Company
              </label>
              <input
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                type="text"
                ref="company"
                placeholder="Office Name"
                :value="editContactId.company"
                @input="updateProductInputAction"
              />
            </div>
          </div>
          <button
            type="submit"
            class="bg-black my-5 px-4 py-2 text-lg font-semibold tracking-wider text-white rounded hover:bg-green-600 w-4/12"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    showing: {
      required: true,
      type: Boolean,
    },
    editContactId: {
      required: true,
      type: Object
    },
  },

  data() {
    return {
      id: null,
    };
  },

  computed: {
    ...mapGetters(["isUpdating", "updatedData", "product", "isLoading"]),
  },

  watch: {
    updatedData: function () {
      if (this.updatedData !== null && !this.isUpdating) {
        this.$swal.fire({
          text: "Success, Product has been updated successfully !",
          icon: "success",
          position: "top-end",
          timer: 1000,
        });

        this.$router.push({ name: "Products" });
      }
    },
  },

  created: function () {
    this.fetchDetailProduct(this?.editContactId?.id);
  },

  methods: {
    ...mapActions([
      "updateProduct",
      "updateProductInput",
      "fetchDetailProduct",
    ]),

    close() {
      this.$emit('close')
    },

    onSubmit() {
      if (
        this.$refs.firstName.value != '' &&
        this.$refs.lastName.value != '' &&
        this.$refs.email.value != '' &&
        this.$refs.phone.value != '' &&
        this.$refs.company.value != ''
      ) {
        const contact = {
          id: this.editContactId.id,
          firstName: this.$refs.firstName.value,
          lastName: this.$refs.lastName.value,
          email: this.$refs.email.value,
          phone: this.$refs.phone.value,
          company: this.$refs.company.value,
        }
        this.updateProduct(contact);
        this.$emit('close')
      } else alert('Empty Input not allowed')
    },
    updateProductInputAction(e) {
      this.updateProductInput(e);
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.modal-mask {
  z-index: 9998;
  background-color: rgba(19, 15, 15, 0.5);
  transition: opacity 0.3s ease;
}
</style>
