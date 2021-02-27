<template>
  <div class="container">
    <div class="row">
      <h3 class="text-center p-1">Registration List </h3>
      <form>
        <div class="row mb-3">
          <div class="col-md-6">
            <label>Applicant's Name</label>
            <input type="text" class="form-control" v-model="searchBy.name" @input="getApplications">
          </div>
          <div class="col-md-6">
            <label>Applicant's Email</label>
            <input type="text" class="form-control" v-model="searchBy.email" @input="getApplications">
          </div>
          <div class="col-md-4">
            <label>Division</label>
            <select class="form-control" v-model="searchBy.divisionId" @change.prevent="getDistricts()">
              <option value="">Select Division</option>
              <option :value="division.id" v-for="(division, divisionInd) in divisions" :key="divisionInd">{{ division.name }}</option>
            </select>
          </div>
          <div class="col-md-4">
            <label>District</label>
            <select class="form-control" v-model="searchBy.districtId" @change.prevent="getUpazilas()">
              <option value="">Select District</option>
              <option :value="district.id" v-for="(district, districtInd) in districts" :key="districtInd">{{ district.name }}</option>
            </select>
          </div>
          <div class="col-md-4">
            <label>Upazila/Thana</label>
            <select class="form-control" v-model="searchBy.upazilaId" @change="getApplications()">
              <option value="">Select Upazila</option>
              <option :value="upazila.id" v-for="(upazila, upazilaInd) in upazilas" :key="upazilaInd">{{ upazila.name }}</option>
            </select>
          </div>
        </div>
      </form>

      <div class="col-md-12">
        <table class="table table-sm table-bordered">
          <thead class="text-center">
            <tr>
              <th>Applicant's Name</th>
              <th>Email Address</th>
              <th>Division</th>
              <th>District </th>
              <th>Upazila / Thana</th>
              <th>Insert Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(application, ind) in applications" :key="ind">
              <td>{{ application.name }}</td>
              <td>{{ application.email }}</td>
              <td>{{ application.division.name }}</td>
              <td>{{ application.district.name }}</td>
              <td>{{ application.upazila.name }}</td>
              <td>{{ application.entry_date }}</td>
              <td>
                <router-link :to="{ name: 'EditRegistration', params: { id: application.id } }" class="btn btn-sm btn-warning">
                  Edit
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
       <nav aria-label="Page navigation">
          <ul class="pagination pagination-sm">
              <li class="page-item" v-for="page in totalPage" :key="page">
                  <a class="page-link" :class="page == current_page ? 'active' : ''" href="#" @click.prevent="getApplications(page)">{{ page }}</a>
              </li>
          </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    applications: [],
    searchBy: {
      name: '',
      email: '',
      divisionId: '',
      districtId: '',
      upazilaId: '',
      page: 0
    },
    divisions: [],
    districts: [],
    upazilas: [],

    // pagination
    current_page: 0,
    from: 0,
    last_page: 0,
    totalPage: 0
  }),

  async created() {
    await this.getApplications();
    await this.$store.dispatch('registration/getDivisions');
    this.divisions = await this.$store.getters['registration/divisions'];
  },
  methods: {
    getApplications: async function(page) {
      if(page != undefined)
        this.searchBy.page = page;
        
      await this.$store.dispatch('registration/getApplications', this.searchBy);
      let applications = await this.$store.getters['registration/applications'];
      this.applications = applications.data;
      this.totalPage = applications.last_page;
      this.current_page = applications.current_page;
      this.from = applications.from;
    },

    getDistricts: async function() {
      this.upazilas = [];
      this.searchBy.upazilaId = '';
      this.districts = [];
      this.searchBy.districtId = '';

      if(this.searchBy.divisionId == '' || this.searchBy.divisionId == null)
        return;

      await this.$store.dispatch('registration/getDistricts', {divisionId: this.searchBy.divisionId});
      this.districts = this.$store.getters['registration/districts'];
      await this.getApplications();
    },

    getUpazilas: async function() {
      this.upazilas = [];
      this.searchBy.upazilaId = '';

      if(this.searchBy.districtId == '' || this.searchBy.districtId == null)
        return;

      await this.$store.dispatch('registration/getUpazilas', {districtId: this.searchBy.districtId});
      this.upazilas = this.$store.getters['registration/upazilas'];
      await this.getApplications();
    }
  }
}
</script>
<style scoped>
  
</style>
