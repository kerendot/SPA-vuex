const urlEmail = 'http://localhost:3003/data/email';
import axios from 'axios';

function getEmails() {
  return axios.get(urlEmail)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getEmail(email) {
  return axios.get(`${urlEmail}/${email._id}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function updateEmail(email) {
  return axios.put(`${urlEmail}/${email._id}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function archiveEmail(email) {
  return axios.delete(`${urlEmail}/${email._id}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function saveEmail(email) {
  return axios.post(urlEmail, email)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default {
  getEmails,
  archiveEmail,
  saveEmail,
  updateEmail
}