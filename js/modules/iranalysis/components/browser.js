define(['knockout', 'text!./browser.html', 'appConfig', 'webapi/MomentAPI', 'faceted-datatable'
], function (ko, template, config, momentApi) {
	
	function renderLink(s, p, d) {
		return '<span class="linkish">' + d.name + '</span>';
	}
	
	function IRAnalysisBrowserModel(params) {
		var self = this;

		self.analysisList = params.analysisList;
		
		self.options = {
			Facets: [
				{
					'caption': 'Last Modified',
					'binding': function (o) {
						var daysSinceModification = (new Date().getTime() - new Date(o.modifiedDate || o.createdDate).getTime()) / 1000 / 60 / 60 / 24;
						if (daysSinceModification < 7) {
							return 'This Week';
						} else if (daysSinceModification < 14) {
							return 'Last Week';
						} else {
							return '2+ Weeks Ago';
						}
					}
				},
				{
					'caption': 'Author',
					'binding': function (o) {
						return o.createdBy;
					}
				}
			]
		};


		self.rowClick = function (d) {
			self.selected(d.id);
		}

		self.columns = [
			{
				title: 'Id',
				data: 'id'
			},
			{
				title: 'Name',
				render: renderLink
			},
			{
				title: 'Created',
				type: 'date',
				render: function (s, p, d) {
					return momentApi.formatDateTimeUTC(d.createdDate);
				}
			},
			{
				title: 'Updated',
				type: 'date',
				render: function (s, p, d) {
					return momentApi.formatDateTimeUTC(d.modifiedDate);
				}
			},
			{
				title: 'Author',
				data: 'createdBy'
			}
		];
		
	}

	var component = {
		viewModel: IRAnalysisBrowserModel,
		template: template
	};

	return component;
});