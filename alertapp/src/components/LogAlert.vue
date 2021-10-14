<template>
<div class="container-fluid d-flex justify-content-center align-items-center outer-box">
  <form class="inner-box">
    <div class="form-group">
      <p class="page-label">Email Alert</p>
    </div>
    <div class="form-group input-div">
      <label for="alertInput">Alert Message</label>
      <input type="text" class="form-control" id="alertInput" v-model="alertMessage"  placeholder="Enter alert message">
    </div>
    <div class="input-div">
      <div class="custom-control custom-radio custom-control-inline">
        <label for="radioInline" class="rdlabel">Frequency</label>
        <input type="radio" name="radioInline" class="custom-control-input" id="rdHoruly" value="Hourly" v-model="alertFrequency">
        <label class="custom-control-label rdlabel" for="rdHoruly">Hourly</label>
        <input type="radio" name="radioInline" class="custom-control-input" id="rdDaily" value="Daily" v-model="alertFrequency">
        <label class="custom-control-label" for="rdDaily">Daily</label>
    </div>
    </div>
    <div class="form-group input-div">
      <label for="emailRecipientsInput">Email Recipients</label>
      <div class="input-group email-div">
      <input type="email" required class="form-control" id="emailRecipientsInput" placeholder="Enter email" v-model="emailRecipient">
      <button style="display:flex" class="btn btn-secondary" type="submit" v-on:click.prevent ="btnDeleteAdd()" >Add Email</button>
      </div>
    </div>
    <div class="input-div">
      <table class="table">
        <tr v-for="item in emailData" :key="item.Id">
          <td>{{item.emailRecipient}}</td>
          <td>
            <a href="#" class="close"  v-on:click="btnDeleteClick(item.Id)">
              <span >&times;</span>
            </a>
          </td>
                  </tr>
      </table>
    </div>
    <div class="input-div btn-div">
      <button type="submit" class="btn btn-secondary btn-alert" v-on:click.prevent="testAlertDetails()">Test Alert</button>
      <button type="submit" class="btn btn-secondary" v-on:click.prevent="saveAlertDetails()">Save</button>
    </div>
  </form>
</div> 
</template>

<script>
import axios from 'axios';
export default {
    name: 'LogAlert',
   data: function() {
      return {
                emailRecipient: this.emailRecipient,
                emailData: [],
                Id: 1,
                alertFrequency: null,
                alertMessage: null
              };
  },
  methods: 
  {
      testAlertDetails : function () 
      {
          axios.post("http://localhost:3000/testAlertDetails/", this.buildRequestPayload()).then(response => {
            alert(response.data);
        }).catch(error => alert('Error! ' + error.message))
      },
      saveAlertDetails : function () 
      {
          axios.post("http://localhost:3000/saveAlertDetails/",  this.buildRequestPayload()).then(response => {
            alert(response.data);
        }).catch(error => alert('Error! ' + error.message))
      },
      btnDeleteAdd: function () 
      {
        if(this.emailRecipient.length >0) 
        {
          this.emailData.push({
              Id: this.Id++
              ,emailRecipient: this.emailRecipient
          })
        }
      },
      btnDeleteClick: function (id) 
      {
        this.emailData = (this.emailData).filter(function (val) 
        {
          return val.Id != id
        });
      },

      buildRequestPayload: function()
      {
        var payload = 
        {
            EmailReceipients : this.emailData,
            AlertMessage : this.alertMessage,
            Frequency : this.alertFrequency
        }
        return payload;
      }
  }
}
</script>

<style scoped>
.outer-box
{
  overflow: hidden;
  height: 100vh;
}

.close
{
    color: gray;
    text-decoration: none;
}
.email-div
{
  width: 80%;
}
td
{
  width: 30%;
}

.btn-div
{
  float: right;
  padding-right: 150px;
}

.btn-alert
{
  margin-right: 20px;
}

.form-control
{
  width: 80%;
}

.input-div{
    padding-left: 70px;
    padding-top: 30px;
}
.inner-box
{
  overflow: hidden;
  width: 50vw;
  height: 80vh;
  border: 2px solid black;
  padding-top: 40px;
  padding-left: 40px;
}

.page-label
{
  font-weight: 500;
}

.rdlabel
{
  padding-right: 30px;
}

label
{
  font-size: 12px;
}




</style>
