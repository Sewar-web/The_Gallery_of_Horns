'use strict';

let arrayName=[];

let dataAll=[];
function Horner( imageUrl ,title , description ,keyword ,horns ) {
  this.imageUrl = imageUrl;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns=horns;
  dataAll.push( this );

}
Horner.prototype.toHorner =function()
{

  let template = $( '#hornerTemplate' ).html();
  let dataSet = Mustache.render( template,this );
  $( '#photo-template' ).append( dataSet );

};

function getData( url )
{
  $.ajax( url )
    .then( hornerData => {
      console.log( hornerData );
      hornerData.forEach( val => {
        let newHorner = new Horner( val.image_url,val.title ,val.description , val.keyword , val.horns );
        // newHorner.renderImage();
        newHorner.toHorner();
        if( !arrayName.includes( val.keyword ) ){
          arrayName.push( val.keyword );}
      } );

      arrayName.forEach( element => {
        $( '#select' ).append(
          `  <option value="${element}">${element}</option>`
        );
      } );

    } );

}
console.log( arrayName );

///////////////////page1////////////////////////
getData( '../data/page-1.json' );

$( '#page1' ).on( 'click' ,callPage1 );
function callPage1()
{
  arrayName=[];
  dataAll=[];
  $( '#select' ).empty();
  $( 'section' ).empty();
  getData( '../data/page-1.json' );
  console.log( 'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr' );
}

/////////////////////page2/////////////////////////

$( '#page2' ).on( 'click' ,callPage2 );
function callPage2()
{
  arrayName=[];
  dataAll=[];
  $( '#select' ).empty();
  $( 'section' ).empty();
  getData( '../data/page-2.json' );
  console.log( 'aaaaaaaaaaaaaaaaaaaaaaaaaaa' );

}

// let arrKeyword=[];
// arrKeyword.push( this.keyword );


//


// let dataAll=[];
// function Horner( hornerinfo ) {
//   this.image_url = hornerinfo.image_url;
//   this.title = hornerinfo.title;
//   this.description = hornerinfo.description;
//   this.keyword = hornerinfo.keyword;
//   this.horns=hornerinfo.horns;
//   dataAll.push( this );

// }




///////////fliter///////////////


////////////////////////functions sort////////////////////

$( '#sort' ).on( 'click' , callBackHonrs );
function callBackHonrs( event )
{
  let value=event.target.value;
  dataAll.sort( ( a, b )=>{
    if( a[value] < b[value] ) return -1;
    else if( a[value] > b[value] ) return 1;
    else return 0;
  } );
  // $( '#select' ).empty();
  dataAll.forEach( item => item.toHorner );

  console.log( 'hhhhhhhhhhhhhhhhhh' );
  console.log( dataAll );
  console.log( value );
}

$( 'select' ).on( 'change', function () {
  let itemSelect = this.value;
  console.log( 'f', itemSelect );
  $( '.img' ).hide();
  $( `.${itemSelect}` ).show();

} );




// Horner.prototype.renderImage = function () {
//   let hornsClone = $( '#photo-template' ).clone();
//   let select = $( '<option></option>' ).text( this.keyword );
//   $( 'select' ).append( select );

//   hornsClone.find( 'h2' ).text( this.title );
//   hornsClone.find( 'img' ).attr( 'src', this.image_url );
//   hornsClone.find( 'p' ).text( this.description );
//   hornsClone.attr( 'class', this.keyword );
//   $( 'main' ).append( hornsClone );
// };

// $.ajax( '../data/page-1.json' )
//   .then( hornerData => {
//     console.log( hornerData );
//     hornerData.forEach( val => {
//       let newHorner = new Horner( val );
//       // newHorner.renderImage();
//       newHorner.toHorner();
//     } );

//   } );

