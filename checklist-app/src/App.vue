<template>
  <div id="app">
    <h1 class="subtitle has-text-centered">My Bucket List</h1>
    <hr>
    <div class="field has-addons">
      <div class="control width-100">
        <input class="input" type="text" v-model="description" placeholder="What's next on your bucketlist?" />
      </div>
      <div class="control" v-if="this.description != ''">
        <a class="button is-info" @click="addItem()"> Add </a>
      </div>
    </div>


    <div class="notification" v-for="(item, i) in items" :key="item._id">
      <div class="columns">
        <input type="text" class="column input" v-if="isSelected(item)" v-model="editedDescription">
        <p v-else class="column">
          <span class="tag is-primary">{{ i + 1 }}</span>
          {{ item.description }}
        </p>
        <div class="column is-narrow">
          <span class="icon has-text-primary" @click="isSelected(item) ? unselect() : select(item)">
            <!-- if item is being edited then show close button else edit -->
            <i class="material-icons">{{isSelected(item) ? 'close' : 'edit'}}</i>
          </span>

          <span class="icon has-text-info" @click="isSelected(item) ? updateItem(item, i) : removeItem(item, i)">
            <i class="material-icons">{{ isSelected(item) ? 'save' : 'delete' }}</i>
          </span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      items: [],
      description: "",
      editedDescription: "",
      selected: {}
    };
  },
  async mounted() {
    const response = await axios.get("api/bucketListItems/");
    this.items = response.data;
  },
  methods: {
    async addItem() {
      const response = await axios.post("api/bucketListItems/", {
        description: this.description,
      });
      this.items.push(response.data);
      this.description = "";
    },

    async removeItem(item, i) {
      await axios.delete("api/bucketListItems/" + item._id);
      this.items.splice(i, 1);
    },

    select(item) {
      this.selected = item;
      this.editedDescription = item.description;
    },

    isSelected(item) {
      return item._id === this.selected._id
    },

    unselect() {
      this.selected = {};
      this.editedDescription = "";
    },

    async updateItem(item, i) {
      const response = await axios.put("api/bucketListItems/" + item._id, {
        description: this.editedDescription
      });
      this.items[i] = response.data;
      alert(`${this.editedDescription} has been updated successfully`)
      this.unselect();
      location.reload();
    }
  },
};
</script>

<style>
#app {
  margin: auto;
  margin-top: 3rem;
  max-width: 700px;
}

.width-100 {
  width: 100%;
}

.icon {
  cursor: pointer;
  transition: all 0.3s ease;
}

.icon:hover {
  transform: scale(1.2);
}
</style>
