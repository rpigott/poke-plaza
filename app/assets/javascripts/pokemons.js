/* Place all the behaviors and hooks related to the matching controller here. */
/* All this logic will automatically be available in application.js. */
/* global $, PkSpr, Bloodhound, species_typeahead */

function addPokemon() {
    
}

$(document).ready(function() {
    $('tr.pokemon').click(function() {
        document.location = $(this).data("link");
    });
    
    $('.selectpicker').selectpicker({tickIcon: ""})
    
    $('#select-ball .selectpicker').on('change', function() {
        PkSpr.process_container(this);
    });
    PkSpr.process_container($('#select-ball .dropdown-menu'));
    
    $('#select-species .typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    }, {
        name: "Species",
        source: new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: species_typeahead,
            identifier: function(datum) {
                return datum.id
            }
        }),
        display: 'name'
    }).on('typeahead:selected', function(obj, datum, name) {
        // Fill related abilities in the ability selector
        $.ajax({
            url: '/species/' + datum.id + '/abilities',
            dataType: 'script'
        });
    }).on('keyup', function(e) {
        if(e.which == 13) {
            if ($('#select-species .tt-menu').css('display') != "none") {
                $("#select-species .tt-suggestion:first-child").trigger('click');
            }
        }
    });
});