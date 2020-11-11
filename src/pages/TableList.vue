<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Manage Floor</h4>
              <p class="card-category">you can manage floor from here</p>
            </template>
            <l-table
              class="table-hover table-striped"
              :columns="table1.columns"
              :data="table1.data"
            >
              <template slot-scope="{ row }">
                <td>{{ row.id }}</td>
                <td>
                  <b>{{ row.name }}</b>
                </td>
                <td>{{ row.salary }}</td>
                <td>
                  <button
                    class="btn btn-icon btn-info mx-1"
                    @click="handleEdit(row)"
                  >
                    <i class="fa fa-edit"></i>
                  </button>
                  <button
                    class="btn btn-icon btn-danger"
                    @click="handleDelete(row)"
                  >
                    <i class="fa fa-trash"></i>
                  </button>
                </td>
              </template>
            </l-table>
          </card>
        </div>
        <div class="col-12"></div>
      </div>
    </div>
  </div>
</template>
<script>
import LTable from "src/components/Table.vue";
import Card from "src/components/Cards/Card.vue";
const tableColumns = ["Id", "Name", "Salary", "actions"];
const tableData = [
  {
    id: 1,
    name: "Dakota Rice",
    salary: "$36.738",
    country: "Niger",
    city: "Oud-Turnhout",
  },
  {
    id: 2,
    name: "Minerva Hooper",
    salary: "$23,789",
    country: "Curaçao",
    city: "Sinaai-Waas",
  },
  {
    id: 3,
    name: "Sage Rodriguez",
    salary: "$56,142",
    country: "Netherlands",
    city: "Baileux",
  },
  {
    id: 4,
    name: "Philip Chaney",
    salary: "$38,735",
    country: "Korea, South",
    city: "Overland Park",
  },
  {
    id: 5,
    name: "Doris Greene",
    salary: "$63,542",
    country: "Malawi",
    city: "Feldkirchen in Kärnten",
  },
  {
    id: 5,
    name: "Doris Greene",
    salary: "$63,542",
    country: "Malawi",
    city: "Feldkirchen in Kärnten",
  },
  {
    id: 5,
    name: "Doris Greene",
    salary: "$63,542",
    country: "Malawi",
    city: "Feldkirchen in Kärnten",
  },
  {
    id: 5,
    name: "Doris Greene",
    salary: "$63,542",
    country: "Malawi",
    city: "Feldkirchen in Kärnten",
  },
  {
    id: 5,
    name: "Doris Greene",
    salary: "$63,542",
    country: "Malawi",
    city: "Feldkirchen in Kärnten",
  },
];
export default {
  components: {
    LTable,
    Card,
  },
  data() {
    return {
      table1: {
        columns: [...tableColumns],
        data: [...tableData],
      },
      table2: {
        columns: [...tableColumns],
        data: [...tableData],
      },
    };
  },
  methods: {
    handleEdit(row) {
      console.log(`You want to edit row with id: ${row.id}`);
    },
    handleDelete(row) {
      console.log(`You want to delete row with id: ${row.id}`);
    },
  },
};
</script>
<style>
</style>
