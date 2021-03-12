const models = require("../models");
// var express = require("express");
// var router = express.Router();
//const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

//grab topic model and find it

function topicDoesExist(req, res, next) {

  let topicArray = []

  fetch(`/topics`)
    .then((response) => response.json())
    .then((data) => {
      topicArray.push(data)
    })
    .catch((error) => {
      console.log(error);
    });


  // const getTopics = () => {
  //   fetch(`/topics`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       topicArray.push(data)
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  let topicName

  topicName = topicArray.find((topic) => topic.topic_name)


  if(!topicName) {
    res.status(404).send( {message: "this topic does not exist"});
  } else {
    req.topic_name = topics.id
		next();
  }

  }


  module.exports = topicDoesExist;