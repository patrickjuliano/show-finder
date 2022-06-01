$(document).ready(function() {
    $.get('http://api.tvmaze.com/shows', function(data, status) {
        $.each(data, function(_, v) {
            $('#showList').append('<li><a class="showLink" href="' + v._links.self.href + '">' + v.name + '</a></li>');
        });
        $('#showList').show();
    });

    $('#searchForm').submit(function(event) {
        event.preventDefault();
        if ($('#searchTerm').val().trim()) {
            $('#resultsHeader').show();
            $('.resultsTerm').text($('#searchTerm').val().trim());
            $('#show').hide();
            $('#error').hide();
            $('#homeLink').show();
            $('#showList').empty();
            $.get('http://api.tvmaze.com/search/shows?q='.concat($('#searchTerm').val().trim()), function(data, status) {
                $.each(data, function(_, v) {
                    $('#showList').append('<li><a class="showLink" href="' + v.show._links.self.href + '">' + v.show.name + '</a></li>');
                });
                data.length === 0 ? $('#noResults').show() : $('#noResults').hide();
                $('#showList').show();
            });
        } else {
            $('#error').show();
        }
    });

    $(document).on('click', '.showLink', function(event) {
        event.preventDefault();
        $('#resultsHeader').hide();
        $('#noResults').hide();
        $('#showList').hide();
        $('#show').empty();
        $.get($(this).attr('href'), function(show, status) {
            $('#show').append('<h1>' + show.name + '</h1>');

            const src = show.image && show.image.medium ? show.image.medium : 'public/img/no_image.jpeg';
            $('#show').append('<img src="' + src + '" />');

            $('#show').append('<dl id="properties"></dl>');

            $('#properties').append('<dt>Language</dt>');
            const language = show.language ? show.language : 'N/A';
            $('#properties').append('<dd>' + language + '</dd>');

            $('#properties').append('<dt>Genres</dt>');
            if (show.genres && show.genres.length > 0) {
                $('#properties').append('<dd><ul id="genres"></ul></dd>');
                $.each(show.genres, function(_, v) {
                    $('#genres').append('<li>' + v + '</li>');
                });
            } else {
                $('#properties').append('<dd>N/A</dd>');
            }

            $('#properties').append('<dt>Average Rating</dt>');
            const rating = show.rating && (show.rating.average || show.rating.average === 0) ? show.rating.average : 'N/A';
            $('#properties').append('<dd>' + rating + '</dd>');

            $('#properties').append('<dt>Network</dt>');
            const network = show.network && show.network.name ? show.network.name : 'N/A';
            $('#properties').append('<dd>' + network + '</dd>');

            $('#properties').append('<dt>Summary</dt>');
            const summary = show.summary ? show.summary.replace(/<\/?[a-z]+>/g, "") : 'N/A';
            $('#properties').append('<dd>' + summary + '</dd>');
        });
        $('#show').show();
        $('#error').hide();
        $('#homeLink').show();
    });
});