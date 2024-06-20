const firebaseConfig = {
    apiKey: "AIzaSyBPnehbfQVDUCnnG3EI_ex_lGsDLiWKKWM",
    authDomain: "login-with-firebase-data-65187.firebaseapp.com",
    databaseURL: "https://login-with-firebase-data-65187-default-rtdb.firebaseio.com",
    projectId: "login-with-firebase-data-65187",
    storageBucket: "login-with-firebase-data-65187.appspot.com",
    messagingSenderId: "788692022749",
    appId: "1:788692022749:web:482bb810cae17e00cf3234"
  };
  
  // initialize firebase
  firebase.initializeApp(firebaseConfig);
  
  // reference your database
  var contactFormDB = firebase.database().ref("contactForm");
  
  document.getElementById("contactForm").addEventListener("submit", submitForm);
  
  function submitForm(e) {
    e.preventDefault();
  
    var name = getElementVal("name");
    var emailid = getElementVal("emailid");
    var msgContent = getElementVal("msgContent");
  
    saveMessages(name, emailid, msgContent);
  
    //   enable alert
    document.querySelector(".alert").style.display = "block";
  
    //   remove the alert
    setTimeout(() => {
      document.querySelector(".alert").style.display = "none";
    }, 3000);
  
    //   reset the form
    document.getElementById("contactForm").reset();
  }
  
  const saveMessages = (name, emailid, msgContent) => {
    var newContactForm = contactFormDB.push();
  
    newContactForm.set({
      name: name,
      emailid: emailid,
      msgContent: msgContent,
    });
  };
  
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };