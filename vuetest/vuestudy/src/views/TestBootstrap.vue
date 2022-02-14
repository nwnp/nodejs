<template>
  <div>
    <h1>Bootstrap Test</h1>
    <b-row>
      <b-col
        ><h3>Left</h3>
        <h4>checkbox</h4>
        <b-form-checkbox
          id="checkbox-3"
          name="checkbox"
          value="accepted"
          unchecked-value="not_accepted"
        >
          left - checkbox test
        </b-form-checkbox>
        <b-form-checkbox
          name="checkbox"
          value="accepted"
          unchecked-value="not_accepted"
        >
          left - checkbox test2
        </b-form-checkbox>
      </b-col>
      <b-col style="text-align: left">
        <h3>Center</h3>
        <div>
          <h4>button</h4>
          <b-button>Button</b-button>
          <b-button variant="danger">Button</b-button>
          <b-button variant="success">Button</b-button>
          <b-button variant="outline-primary">Button</b-button>
        </div>
        <div>
          <h4>checkbox</h4>
          <b-form-checkbox
            id="checkbox-1"
            name="checkbox-1"
            value="accepted"
            unchecked-value="not_accepted"
          >
            I accept the terms and use
          </b-form-checkbox>
          <b-form-checkbox
            id="checkbox-2"
            name="checkbox-1"
            value="accepted"
            unchecked-value="not_accepted"
          >
            TEST
          </b-form-checkbox>
        </div>
        <div>
          <h4>radio</h4>
          <b-form-group>
            <b-form-radio name="some-radios" value="A">Option A</b-form-radio>
            <b-form-radio name="some-radios" value="B">Option B</b-form-radio>
          </b-form-group>
        </div>
        <div>
          <h4>select</h4>
          <b-form-select v-model="selected" :options="options"></b-form-select>
        </div>
        <div>
          <h4>textarea</h4>
          <b-form-textarea
            id="textarea"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </div>
        <div>
          <h4>input group</h4>
          <b-input-groupt prepend="Username" class="mt-3">
            <b-form-input></b-form-input>
            <b-input-group-append>
              <b-button variant="outline-success">Button</b-button>
              <b-button variant="info">Button</b-button>
            </b-input-group-append>
          </b-input-groupt>
        </div>
        <div>
          <h4>table</h4>
          <b-table striped hover :items="items"></b-table>
        </div>
      </b-col>
      <b-col>
        <h3>Right</h3>
        <b-button>Button</b-button>
        <b-button variant="danger">Button</b-button>
        <b-button variant="success">Button</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      options: [
        { value: null, text: "Please select an option" },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Selected Option" },
        { value: { C: "3PO" }, text: "this is an option with object value" },
        { value: "d", text: "This on is disabled", disabled: true },
      ],
      items: [
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 38, first_name: "Jami", last_name: "Carney" },
      ],
    };
  },
};
</script>

<style scoped>
div h4 {
  margin-top: 20px;
}
</style>
