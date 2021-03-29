'use strict';

$.ajax( '../data/page-1.json' )
  .then( hornerData => {
    console.log( hornerData );
    hornerData.forEach( val => {
      let newHorner = new Horner( val );
      newHorner.renderImage();
    } );
    $( '#photo-template' ).first().remove();
  } );


function Horner( hornerinfo ) {
  this.image_url = hornerinfo.image_url;
  this.title = hornerinfo.title;
  this.description = hornerinfo.description;
  this.keyword = hornerinfo.keyword;
  this.horns = hornerinfo.horns;
}

Horner.prototype.renderImage = function () {
  let hornsClone = $( '#photo-template' ).clone();
  let select = $( '<option></option>' ).text( this.keyword );
  $( 'select' ).append( select );

  hornsClone.find( 'h2' ).text( this.title );
  hornsClone.find( 'img' ).attr( 'src', this.image_url );
  hornsClone.find( 'p' ).text( this.description );
  hornsClone.attr( 'class', this.keyword );
  $( 'main' ).append( hornsClone );
};

$( 'select' ).on( 'change', function () {
  let itemSelect = this.value;
  console.log( 'f', itemSelect );
  $( 'section' ).hide();
  $( `.${itemSelect}` ).show();
} );
