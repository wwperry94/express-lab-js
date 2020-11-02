
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
                <h5 class="card-header">@${chirp[1].Name}</h5>
                <div class="card-body">
                <h5 class="card-title">"${chirp[1].Text}"</h5>
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onclick="deleteChirp(${chirp[0]})"
                style="
                display: flex;
                float: right;
                " 
                >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
                <svg data-toggle="modal" data-target="#editModal${chirp[0]}" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg" 
                >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
                </div>
              </div>
              <div class="modal fade" id="editModal${chirp[0]}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <textarea class="modal-body" id="editText${chirp[0]}">${chirp[1].Text}</textarea>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="editChirp(${chirp[0]}, '${chirp[1].Name}', $('#editText${chirp[0]}').val())" >Save changes</button>
                    </div>
                    </div>
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
};

let editChirp = (id, user, text) => {
    let chirp = {
        Name: user,
        Text: text,
    };
    $.ajax({
        url: `/api/chirps/${id}`,
        type: "PUT",
        data: JSON.stringify(chirp),
        contentType: "application/json",
        success: function () {
            console.log("jkdfgnjs")
            $('#chirp-container').empty();
            location.reload();
        },
    });
};

$('#btnsubmit').click(function () {
    submitChirp()
});