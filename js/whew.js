$(function () {

	var file_lists = {};

	/**
	 * Call relevant PHP script to list directory.
	 * @param {*} key 
	 * @param {*} cb 
	 */
	var get_files = function (key, cb) {
		$.get('/list_' + key + '.php', function (res) {
			cb(res);
		});
	}

	/**
	 * Get the basename from the relative path (e.g. don't show the folder structure to the user.)
	 * @param {*} str 
	 */
	function base_name(str) {
		var base = new String(str).substring(str.lastIndexOf('/') + 1);
		if (base.lastIndexOf(".") != -1)
			base = base.substring(0, base.lastIndexOf("."));
		return base;
	}

	/**
	 * Fetch a page fragment. Plop into content area.
	 * @param {*} pageKey 
	 */
	var get_page = function (pageKey) {
		history.pushState({}, "Main", "?page=" + pageKey);

		var $loading = $("#loader").clone().show();
		$("#page_content").html('').append($loading);

		$.get('./fragments/' + pageKey + '.html?cacheBreak=' + Date.now(), function (res) {
			$("#page_content").html(res);

			// switch (pageKey) {
			// 	case 'meeting_notes':

			// 		get_files(pageKey, function (files) {
			// 			var $wrapper = $("#meeting_notes_list");
			// 			var $fragment = $(document.createDocumentFragment());

			// 			if (!Array.isArray(files)) {
			// 				$fragment.append("<h3>No Meeting Notes.</h3>");
			// 			} else {
			// 				var notesByYear = {};

			// 				for (var i = 0; i < files.length; i++) {
			// 					var fileName = files[i];

			// 					var yearExtractor = /.*meeting_notes\/(\d+)\/.*/;
			// 					var match = yearExtractor.exec(fileName);

			// 					var year = 'N/A';

			// 					if (match.length == 2) {
			// 						year = match[1];
			// 					}

			// 					if (!notesByYear[year]) {
			// 						notesByYear[year] = [];
			// 					}

			// 					notesByYear[year].push(fileName);
			// 				}

			// 				var $years = $("#years");
			// 				var $yearTemplate = $("#year_group_template");

			// 				// Sort by year, DESC.
			// 				Object.keys(notesByYear).sort(function (a, b) {
			// 					return b - a;
			// 				}).forEach(function (year, idx) {
			// 					// Use Bootstrap's accordion thing, a little annoying to configure the markup:
			// 					var $yearGroup = $yearTemplate.clone().show();
			// 					$yearGroup.removeAttr('id');
			// 					var headingId = 'heading_' + year;
			// 					var collapseId = 'collapse_' + year;

			// 					// Show first item:
			// 					if (idx == 0) {
			// 						$yearGroup.find('.collapse').addClass('show');

			// 						// Screen readers (ARIA):
			// 						$yearGroup.find('.collapsed').removeClass('collapsed').attr({
			// 							'aria-expanded': 'true',
			// 							'aria-controls': collapseId
			// 						});
			// 					}

			// 					// Uniqueness:
			// 					$yearGroup.find('#headingTwo').attr('id', headingId);
			// 					$yearGroup.find('#collapseTwo').attr({
			// 						id: collapseId,
			// 						'aria-labelledby': headingId
			// 					});

			// 					$yearGroup.find('a').attr({
			// 						href: '#' + collapseId
			// 					})

			// 					// Label:
			// 					$yearGroup.find('#year').text(year);

			// 					// Build content (links):
			// 					var $links = $yearGroup.find("#meeting_notes_list");
			// 					notesByYear[year].forEach(function (fileName) {
			// 						var ext = fileName.substr(fileName.lastIndexOf('.') + 1);
			// 						var $link = $('<li class="list-group-item"><a target="_blank" href="' + fileName + '">' + base_name(fileName) + '.' + ext + '</a></li>');
			// 						$links.append($link);
			// 					});

			// 					$years.append($yearGroup);
			// 				})

			// 				$('#years').collapse({
			// 					toggle: true
			// 				})

			// 			}

			// 			$wrapper.append($fragment);
			// 		});

			// 		break;
			// }
		});
	};

	/**
	 * Better do something.
	 */
	$("#top_links").on('click', 'span.nav-link', function () {
		var pageKey = $(this).attr('page-key');
		$("#top_links li").removeClass('active');
		$(this).parent('li').addClass('active');

		get_page(pageKey);
	});

	// If user is refresing, try to return to the previous page:
	var previousPageResults = location.search && /\?page=(.*)/ig.exec(location.search)
	if (previousPageResults.length == 2) {
		var prev_page = previousPageResults[1];
		$("#top_links span[page-key='" + prev_page + "']").click();

	} else {
		$("#top_links span[page-key='main']").click();
	}

	var currentYear = new Date().getFullYear();
	$("#current_year").text(currentYear);

});