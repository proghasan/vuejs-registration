<template>
  <div class="container">
    <p class="text-center">
      <router-link to="/home" class="btn btn-sm btn-success m-2">Home</router-link>
    </p>
    <h1 class="text-center">Update Registration Form</h1>
      <div class="alert alert-danger" role="alert" v-for="(message, messageInd) in errorMessages" :key="messageInd">
        {{ message }}
      </div>

      <div class="alert alert-success" role="alert" v-if="successMessage != null">
        {{ successMessage }}
      </div>

    <form method="post" enctype="multipart/form-data" @submit.prevent="updateRegistration()">
      <div class="mb-3">
        <label class="form-label">Applicant's Name</label>
        <input type="text" class="form-control" v-model="application.name" />
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" class="form-control" v-model="application.email" />
      </div>
      <h4>Mailing Address</h4>
      <div class="mb-3">
        <table class="table table-bordered table-sm">
          <thead class="text-center">
            <tr>
              <th>Division</th>
              <th>District</th>
              <th>Upazilz/Thana</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select class="form-control" v-model="application.division_id" @change.prevent="getDistricts()">
                  <option value="">Select Division</option>
                  <option :value="division.id" v-for="(division, divisionInd) in divisions" :key="divisionInd">{{ division.name }}</option>
                </select>
              </td>
              <td>
                <select class="form-control" v-model="application.district_id" @change.prevent="getUpazilas()">
                  <option value="">Select District</option>
                  <option :value="district.id" v-for="(district, districtInd) in districts" :key="districtInd">{{ district.name }}</option>
                </select>
              </td>
              <td>
                <select class="form-control" v-model="application.upazila_id">
                  <option value="">Select Upazila</option>
                  <option :value="upazila.id" v-for="(upazila, upazilaInd) in upazilas" :key="upazilaInd">{{ upazila.name }}</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mb-3">
        <h4>Address Details</h4>
        <textarea class="form-control" v-model="application.address_details" placeholder="Enter your address details"></textarea>
      </div>
      <div class="row mb-3">
        <div class="col-md-4">
          <label class="form-label">Language Proficiency</label>
        </div>
        <div class="col-md-8">
          <input type="checkbox" v-model="application.languages" value="Bangla" /> Bangla
          <input type="checkbox" v-model="application.languages" value="English" /> English
          <input type="checkbox" v-model="application.languages" value="French" /> French
        </div>
      </div>
      <div class="mb-3">
        <h4>Education Qualification</h4>
        <table class="table table-bordered table-sm">
            <thead class="text-center">
                <tr>
                    <th>Exam Name</th>
                    <th>University</th>
                    <th>Board</th>
                    <th>Result</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(education, educationInd) in application.educations" :key="educationInd">
                    <td>
                        <select class="form-control" v-model="education.exam_name">
                          <option value="">Select Exam Name</option>
                          <option :value="exam.name" v-for="(exam, examInd) in exams" :key="examInd">{{exam.name}}</option>
                        </select>
                    </td>
                    <td>
                        <select class="form-control" v-model="education.university_name">
                          <option value="">Select University Name</option>
                          <option :value="university.name" v-for="(university, universityInd) in universities" :key="universityInd">{{university.name}}</option>
                        </select>
                    </td>
                    <td>
                        <select class="form-control" v-model="education.board_name">
                          <option value="">Select Board Name</option>
                          <option :value="board.name" v-for="(board, boardInd) in boards" :key="boardInd">{{board.name}}</option>
                        </select>
                    </td>
                    <td>
                      <input type="text" class="form-control" v-model="education.result">
                    </td>
                    <td>
                      <button v-if="(application.educations.length -1) == educationInd" style="margin-right: 2px" class="btn btn-sm btn-primary" @click.prevent="generateEducation()">+ </button>
                      <button class="btn btn-sm btn-danger" @click.prevent="removeEducation(education,educationInd)">X</button>
                    </td>
                </tr>
            </tbody>
        </table>
      </div>
      <div class="mb-3">
        <label>Photo</label>
        <input type="file" class="form-control" name="photo" id="photo" @change.prevent="photoUpload">
      </div>
      <div class="mb-3">
        <label>CV</label>
        <input type="file" class="form-control" name="cv" id="cv" @change.prevent="cvUpload">
      </div>
      <div class="mb-3">
        <label class="form-label" style="margin-right: 22px">Training</label> 
        <input type="radio" v-model="application.training" value="Yes" @change="generateTraining()" /> Yes
        <input type="radio" v-model="application.training" value="No" /> No
      </div>
      <div class="mb-3" v-if="application.training == 'Yes'">
        <table class="table table-bordered table-sm">
          <thead class="text-center">
            <tr>
              <th>Training Name</th>
              <th>Training Details</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(training, ind) in application.trainings" :key="ind">
              <td>
                <input type="text" v-model="training.name" class="form-control" placeholder="Enter training name" />
              </td>
              <td>
                <input type="text" v-model="training.description" class="form-control" placeholder="Enter training description" />
              </td>
              <td>
                  <button v-if="(application.trainings.length -1) == ind" style="margin-right: 2px" class="btn btn-sm btn-primary" @click.prevent="generateTraining()">+ </button>
                  <button class="btn btn-sm btn-danger" @click.prevent="removeTraining(training,ind)">X</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button type="submit" class="btn btn-primary" :disabled="isLoading">Update</button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
      successMessage: null,
      errorMessages: [],
      application: {
        id: 0,
        name: '',
        email: "",
        division_id: '',
        district_id: '',
        upazila_id: '',
        address_details: "",
        photo: null,
        cv: null,
        training: "No",
        trainings: [],
        educations: [],
        languages: null,
      },
      boards: [
        { name: "Dhaka" }, 
        { name: "Rajshai" }, 
        { name: "Faridpur" }
      ],
      exams: [
        { name: "JSC" },
        { name: "SSC" },
        { name: "HSC" },
        { name: "Diploma" },
        { name: "CSE" },
        { name: "Master's" },
      ],
      universities: [
        {name: "S.M.I Academy Santhar Bogra"},
        {name: "Prime University"},
        {name: "Dhaka University"},
      ],
      divisions: [],
      districts: [],
      upazilas: [],
      selectedPhoto: null,
      selectedCv: null
    };
  },
  async created() {
    if(this.$route.params.id != undefined){
     await this.getApplication();
    }else{
      this.generateEducation();
      this.generateTraining();
    }

    await this.$store.dispatch('registration/getDivisions');
    this.divisions = await this.$store.getters['registration/divisions'];

  },
  methods: {
    getDistricts: async function() {
      this.upazilas = [];
      this.application.upazila_id = '';
      this.districts = [];
      this.application.district_id = '';

      if(this.application.division_id == '' || this.application.division_id == null)
        return;

      await this.$store.dispatch('registration/getDistricts', {divisionId: this.application.division_id});
      this.districts = this.$store.getters['registration/districts'];
    },

    getUpazilas: async function() {
      this.upazilas = [];
      this.application.upazila_id = '';

      if(this.application.district_id == '' || this.application.district_id == null)
        return;

      await this.$store.dispatch('registration/getUpazilas', {districtId: this.application.district_id});
      this.upazilas = this.$store.getters['registration/upazilas'];
    },

    generateEducation: function() {
      let education = {
        id: 0,
        exam_name: '',
        university_name: '',
        board_name: '',
        result: ''
      }
      this.application.educations.push(education);
    },
    
    removeEducation(education,educationInd) {
        if(education.id == 0){
          this.application.educations.splice(educationInd, 1);
        }else{
          let conf = confirm("Are you sure ?");
          if(conf){
            this.$store.dispatch('registration/deleteEducation', {educationId: education.id}).then(res => {
              if(res)
                this.application.educations.splice(educationInd, 1);
            });
          }
        }
    },

    generateTraining: function () {
      if(this.application.training == 'No') return;
      let training = {
        id: 0,
        name: "",
        description: ""
      };
      this.application.trainings.push(training);
    },

    removeTraining: function(training, ind) {
        if(training.id == 0){
          this.application.trainings.splice(ind, 1);
        }else{
          let conf = confirm("Are you sure ?");
          if(conf){
            this.$store.dispatch('registration/deleteTraining', {trainingId: training.id}).then(res => {
              if(res)
               this.application.trainings.splice(ind, 1);
            });
          }
        }
    },

    photoUpload: function(e) {
      this.application.photo = e.target.files[0];
    },

    cvUpload: function(e) {
      this.application.cv = e.target.files[0];
    },

    updateRegistration: function () {
      this.errorMessages = [];
      this.successMessage = null;

      this.isLoading = true;
      this.errorMessages = [];
      this.successMessage = null;
      
      if(this.application.name == '' || this.application.name == null) {
        this.errorMessages.push("Enter applicant's name");
      }

      if(this.application.email == '' || this.application.email == null) {
        this.errorMessages.push("Enter applicant's email");
      }

      if(this.application.division_id == '' || this.application.division_id == null || this.application.division_id ==0) {
        this.errorMessages.push("Select division");
      }

      if(this.application.district_id == '' || this.application.district_id == null || this.application.district_id ==0) {
        this.errorMessages.push("Select district");
      }

      if(this.application.upazila_id == '' || this.application.upazila_id == null || this.application.upazila_id ==0) {
        this.errorMessages.push("Select upazila");
      }

      if(this.application.address_details == '' || this.application.address_details == null) {
        this.errorMessages.push("Enter address");
      }
      
      if(this.application.languages == '' || this.application.languages == null ||  this.application.languages.length == 0) {
        this.errorMessages.push("Select languages");
      }

      this.application.educations.forEach((education, key) => {
        if(education.exam_name == '' || education.university_name == '' || education.board_name == '' || education.result == ''){
          this.errorMessages.push(`Enter your all eduction information in ${key} number column`);
          return
        }
      })

      if(this.application.training == 'Yes'){
        this.application.trainings.forEach((training, key) => {
        if(training.name == '' || training.description == ''){
          this.errorMessages.push(`Enter your all training information in ${key} number column`);
          return
        }
      })
      }

      if(this.errorMessages.length > 0) {
        this.isLoading = false;
        return
      };

      let fd = new FormData();
      Object.keys(this.application).map((key,value) =>{
        if(key == 'trainings' || key == 'educations' || key == 'languages') {
            fd.append(key, JSON.stringify(this.application[key]));  
        }else{
          fd.append(key, this.application[key]);
        }
      });

      this.$store.dispatch('registration/update', fd).then(res => {
        this.successMessage = res;
        this.getApplication();
        this.isLoading = false;
      }).catch(errors =>{
        this.errorMessages = errors;
        this.isLoading = false;
      })
    },

    getApplication: async function() {
      await this.$store.dispatch('registration/getApplication', {registrationId: this.$route.params.id});
      const application = await this.$store.getters['registration/application']; 
      let districtId = application.district_id;
      let upazilaId = application.upazila_id;
      let languages = JSON.parse(application.languages);
      this.application = application;
      await this.getDistricts();
      this.application.district_id = districtId;
      await this.getUpazilas();
      this.application.upazila_id = upazilaId;
      this.application.languages = languages == null ?  [] : languages;
      this.application.photo = '';
      this.application.cv = '';
    }
  },
};
</script>