function sendEmail() {
  const bodyMessage = `Full Name : ${userName.value} <br> 
    Email : ${email.value} <br> Phone Number : ${phone.value} <br>
    Subject : ${subject.value} <br> Message : ${message.value} <br>`;
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "yousefmohamedatta58@gmail.com",
    Password: "8793D75D46B6134EB9C53CE32E8ED6EBDC49",
    To: "yousefmohamedatta58@gmail.com",
    From: email.value,
    Subject: subject.value,
    Body: bodyMessage,
  }).then((message) => {
    if (message == "Ok") {
      Swal.fire({
        title: "Success!",
        text: "Message s!",
        icon: "success",
      });
    }
  });
}
