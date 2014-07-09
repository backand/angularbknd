backand.options.ajax = function(url, data, verb, successCallback, erroCallback, forToken) {
    alert(forToken)
    $.ajax({
        url: url,
        async: false,
        type: verb,
        beforeSend: function(xhr) {
            if (!forToken)
                xhr.setRequestHeader('Authorization', backand.security.authentication.token);
        },
        data: data,
        dataType: 'GET', // should be jsonp
        cache: false,
        error: function(xhr, textStatus, err) {
            console.log(xhr)
            if (xhr, textStatus, err){
                console.log(xhr)
                erroCallback(xhr, textStatus, err);
            }
        },
        success: function(data, textStatus, xhr) {
            alert("yes")
            if (successCallback) successCallback(data, textStatus, xhr);
        }
    });
}
