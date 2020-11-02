
const submitChirp = () => {
    $.get('/api/chirps', info => {


        const username = $('#name').val();
        const message = $('#text').val();
        const data = {
            Name: username,
            Text: message,
        };
        console.log(data);
        $.ajaxSetup({
            headers: {
                Accept: 'application/json, text/plain, */*',
                "Content-Type": "application/json"
            }
        });
        $.ajax({
            type: "POST",
            url: "/api/chirps",
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
        });
    });
    location.reload();
};

let loadTimeline = () => {
    $.get("/api/chirps", data => {
        console.log(data)
        delete data.nextid
        let chirpArr = Object.entries(data);
        console.log(chirpArr)
        chirpArr = chirpArr.reverse();
        chirpArr.forEach(chirp => {
            $("#chirp-container").append(
                `<div class="card">
                <div class="card-body">
                <button class="btn btn-dark btn-sm" onclick="deleteChirp(${chirp[0]})">X</button>
                    <h4>${chirp[1].Name}</h4>
                    <p>"${chirp[1].Text}"</p>
                    </div>
                  </div>

                  
                  `
            );
        });
    });
};
loadTimeline();

let deleteChirp = (id) => {
    console.log("test");
    $.ajax({
        type: "DELETE",
        url: `/api/chirps/${id}`,
        success: function () { console.log('deleted!') }
    });
    $("#chirp-container").empty();
    loadTimeline();
}

let editChirp = (id) => {
    let chirpText = $("#textEdit").val();
    let user = $("#userEdit").val();
    let chirp = {
        Name: user,
        Text: chirpText,
    };
    $.ajax({
        url: `/api/chirps/${id}`,
        type: "PUT",
        success: function () {
            $('#chirp-container').empty();
            location.reload();
            loadTimeline();
        }
    })
}

$('#btnsubmit').click(function () {
    submitChirp()
});

