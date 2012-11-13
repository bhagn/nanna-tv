define(["dojo/_base/declare", "dojo/_base/xhr", "dojo/parser", "dojo/dom", "dojo/dom-construct", "dojo/ready", "dojo/on", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/layout/_LayoutWidget", "dijit/_Container", "dojo/text!./templates/Application.html", "custom/DiddoRestUI", "custom/Team", 
        "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/form/Button", "dijit/form/Form", "dijit/form/TextBox", "dijit/form/ValidationTextBox", "dijit/form/Select", "dijit/form/CheckBox"],
        function(declare, xhr, parser, dom, domConstruct, ready, on, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _LayoutWidget, _Container, template, RestUI, Team) {
    return declare("Application", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _Container], {
        series: null,
        
        constructor: function() {
        },
        
        postCreate: function() {
        },
    });
}
);