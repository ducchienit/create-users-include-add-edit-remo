let Users = [];
$(document).ready(function(){
    $("form[name='form-user']").submit(function(form){
        form.preventDefault();
        let fullName = $('#fullName').val();
        let dateBirth = $('#dateBirth').val();
        let gender = $('#gender').val();
        let phoneNumber = $('#phoneNumber').val();
        let Email = $('#Email').val();
        let checkEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@\w+\.com$/i;
        let checkPhoneNumber = /^(0|\84|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
        let d = new Date(dateBirth);
        let day = d.getDate();
        let month = d.getMonth();
        month++;
        let year = d.getFullYear();
        let mydate = new Date(year+18, month-1, day);
        let dayy = new Date().getDate();
        let monthh = new Date().getMonth();
        let yearr = new Date().getFullYear();
        let dateover = new Date(yearr-101, monthh, dayy);
        console.log(new Date(year, month-1, day));
        console.log(dateover);
        if(day<10){
            day = "0" + day;
        }
        if(month<10){
            month = "0" + month;
        }
        if(fullName === ""){
            $('#fullName').addClass('is-invalid').click(removeError).next().text('Please enter your fullname');
            return;
        }
        else if(fullName.length <= 4){
            $('#fullName').addClass('is-invalid').click(removeError).next().text('Your fullname must be at least 5 characters long');
            return;
        }
        else if(check(fullName) === true){
            $('#fullName').addClass('is-invalid').click(removeError).next().text('Invalid fullname, please enter again');
            return;
        }
        if(dateBirth === ""){
            $('#dateBirth').addClass('is-invalid').click(removeError).next().text('Please enter your date of birth');
            return;
        }
        else if (new Date() < mydate){
            $('#dateBirth').addClass('is-invalid').click(removeError).next().text('Sorry, You must be at least 18 years of age');
            return;
        }
        else if(new Date(year, month-1, day) <= dateover){
            $('#dateBirth').addClass('is-invalid').click(removeError).next().text('la` ma a` ma` hon 100 tuoi');
            return;
        }
        if(gender === ""){
            $('#gender').addClass('is-invalid').click(removeError).next().text('Please choose your gender');
            return;
        }
        if(phoneNumber === ""){
            $('#phoneNumber').addClass('is-invalid').click(removeError).next().text('Please enter your phone Number');
            return;
        }
        else if(checkPhoneNumber.test(phoneNumber) === false){
            $('#phoneNumber').addClass('is-invalid').click(removeError).next().text('Invalid Phone Number, please enter again');
            return;
        }
        if(Email === ""){
            $('#Email').addClass('is-invalid').click(removeError).next().text('Please enter your E-Mail');
            return;
        }
        else if(checkEmail.test(Email) === false){
            $('#Email').addClass('is-invalid').click(removeError).next().text('Invalid E-Mail, please enter again');
            return;
        }
        if(currentIndex != -1){
            console.log('update');
            // let u = Users[currentIndex];
            var namestart = Users[currentIndex].fullname;
            var datestart = Users[currentIndex].date;
            Users[currentIndex].fullname = null;
            Users[currentIndex].date = null;
            if(checkoke(upperCase(fullName), dateBirth) === true){
                Users[currentIndex].fullname = namestart;
                Users[currentIndex].date = datestart;
                // currentIndex = -1;
            }
            
        }
        if(checkoke(upperCase(fullName), dateBirth) === true){
            $('.mess').css("display", "");
            setTimeout(function(){
                $('.mess').css("display", "none");
            }, 2500)
            return;
        }
        var user = {
            "fullname": upperCase(fullName),
            "date": dateBirth,
            "dateofbirth": day+"/"+month+"/"+year,
            "gender": gender,
            "phone": phoneNumber,
            "email": Email
        };
        if(currentIndex == -1){
            addUsers(user);
        }
        else{
            Users[currentIndex] = user;
            currentIndex = -1;
            $('.button').html(`<button type="submit" class="btn btn-secondary text-white">Add User
                <span>
                    <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-person-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M11 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM1.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM6 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm4.5 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                    <path fill-rule="evenodd" d="M13 7.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0v-2z"/>
                    </svg>
                </span>
            </button>`);
            $('#fullName').val("");
            $('#dateBirth').val("");
            $('#gender').val("");
            $('#phoneNumber').val("");
            $('#Email').val("");
            listUsers();
        }
        $('#fullName').val("");
        $('#dateBirth').val("");
        $('#gender').val("");
        $('#phoneNumber').val("");
        $('#Email').val("");
    });
});
function listUsers(){
    let html = "";
    if(Users.length == 0){
        $('#listUsers').html(" ");
    }
    for(let i=0; i < Users.length; i++){
        var user = Users[i];
        html += `<tr>
            <th name="stt" scope="row">${i+1}</th>
            <td name="fullname">${user.fullname}</td>
            <td style="display: none">${user.date}</td>
            <td>${user.dateofbirth}</td>
            <td>${user.gender}</td>
            <td>${user.phone}</td>
            <td>${user.email}</td>
            <td>
              <button type="button" name="edit" id="edit" class="btn btn-success btn-sm" onclick="edit(${i})">Edit
                  <span>
                      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
                          <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
                      </svg>
                  </span>
              </button>
              <button type="button" id="delete" class="btn btn-danger btn-sm" onclick="remove(${i})">Delete
                  <span>
                      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                      </svg>
                  </span>
              </button>
            </td>
          </tr>`;
        $('#listUsers').html(html);
    }
}
function addUsers(user){
    let html = "";
    Users.push(user);
    html += `<tr>
            <th name="stt" scope="row">${Users.length}</th>
            <td name="fullname">${user.fullname}</td>
            <td style="display: none">${user.date}</td>
            <td>${user.dateofbirth}</td>
            <td>${user.gender}</td>
            <td>${user.phone}</td>
            <td>${user.email}</td>
            <td>
              <button type="button" name="edit" id="edit" class="btn btn-success btn-sm" onclick="edit(${Users.length-1})">Edit
                  <span>
                      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
                          <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
                      </svg>
                  </span>
              </button>
              <button type="button" id="delete" class="btn btn-danger btn-sm" onclick="remove(${Users.length-1})">Delete
                  <span>
                      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                      </svg>
                  </span>
              </button>
            </td>
          </tr>`;
    $('#listUsers').append(html);
}
$(document).on("keyup","input[name='search']", function(){
    let value = $(this).val().toLowerCase();
    let listName = $(this).parent().next().children('tbody').find("tr");
    listName.filter(function(){
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
});
$(document).on("click","button[id='cancel']", function(){
    $('.button').html(`<button type="submit" class="btn btn-secondary text-white">Add User
                <span>
                    <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-person-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M11 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM1.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM6 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm4.5 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                    <path fill-rule="evenodd" d="M13 7.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0v-2z"/>
                    </svg>
                </span>
            </button>`);
    $('#fullName').val("");
    $('#dateBirth').val("");
    $('#gender').val("");
    $('#phoneNumber').val("");
    $('#Email').val("");
    $('.is-invalid').removeClass('is-invalid').next().text("");
    currentIndex = -1;
});
var currentIndex = -1;
function edit(index){
    $('.mess').css("display", "none");
    $('.is-invalid').removeClass('is-invalid').next().text("");
    currentIndex = index;
    let user = Users[index];
    console.log(user.fullname);
    $('#fullName').val(user.fullname);
    $('#dateBirth').val(user.date);
    $('#gender').val(user.gender);
    $('#phoneNumber').val(user.phone);
    $('#Email').val(user.email);
    $('.button').html(`<button type="submit" class="btn btn-secondary text-white">Update User
    <span>
        <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-person-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M11 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM1.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM6 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm4.5 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
            <path fill-rule="evenodd" d="M13 7.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0v-2z"/>
        </svg>
    </span>
</button>
<button type="button" id="cancel" class="btn btn-danger text-white">Cancel
    <span>
        <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-x-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
            <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
        </svg>
    </span>
</button>`);
}
function remove(index){
    console.log(Users[index]);
    Users.splice(index, 1);
    if(index === currentIndex){
        $('.button').html(`<button type="submit" class="btn btn-secondary text-white">Add User
                <span>
                    <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-person-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M11 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM1.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM6 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm4.5 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                    <path fill-rule="evenodd" d="M13 7.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0v-2z"/>
                    </svg>
                </span>
            </button>`);
        $('#fullName').val("");
        $('#dateBirth').val("");
        $('#gender').val("");
        $('#phoneNumber').val("");
        $('#Email').val("");
        $('.is-invalid').removeClass('is-invalid').next().text("");
        $('.mess').css("display", "none");
        currentIndex = -1;
    }
    listUsers();
    console.log(currentIndex,index);
    if(currentIndex > index){
        currentIndex--;
    }
    
}
function removeError() {
    $(this).removeClass('is-invalid').next().text("");
};
function upperCase(fullname) {
    let splitStr = fullname.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
}
function check(string){
    let specialChars = "0123456789<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
    for(i = 0; i < specialChars.length;i++){
        if(string.indexOf(specialChars[i]) > -1){
            return true;
        }
    }
    return false;
}
function checkoke(fullname, date){
    for(var i = 0; i< Users.length; i++){
        let user = Users[i];
        if(fullname === user.fullname && date === user.date){
            return true;
        }
    }
    return false;
}