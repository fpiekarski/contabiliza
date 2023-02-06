<template>
  <div class="row col s12 " id="box_timeline" >
                <div class="timeline">

                    <div class="row col s12 linha-time">

                        <div class="col s2 container1  left1 inputtrue ">

                        </div>
                        <div class="col s2 container2 left  ">
                        </div>
                        <div class="col s2 container3 left  ">

                        </div>
                        <div class="col s2 container4 left  check ">

                        </div>
                        <div class="col s2 container5 left5   ">

                        </div>

                    </div>

                    <div class="row col s12 linha-time-conteudo">
                        <div class=" col s2  item ">
                                                      
                        </div>
                        <div class=" col s2  item ">
                             
                        </div>
                         <div class=" col s2  item ">
                             
                        </div>
                         <div class=" col s2  item ">
                             
                        </div>
                         <div class=" col s2  item ">
                             
                        </div>
                        


                    </div>
                </div>


            </div>
</template>

<script>
export default {};
</script>
<style>
.time {
  max-width: 250px;
  min-width: 148px !important;
}
#box_timeline{
    background-color: white;
    border-radius: 4px;
    height: 20%;
    min-height: 194px;
}
.timeline {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  height: 10px;
}

/* The actual timeline (the vertical ruler) */
.timeline::after {
    content: '';
    position: absolute;
    width: 6px;

    /* background-color: white; */
    top: 0;
    bottom: 0;
    left: 10%;
    margin-left: -3px;
  }

/* Container around content */
.container1 {
  
  padding: 6px 5px;
  position: relative;
  background-color: inherit;
  width: 20%;
  
}
.container2 {
  
  padding: 6px 5px;
  position: relative;
  background-color: inherit;
  width: 20%;
}
.container3 {
  
  padding: 6px 5px;
  position: relative;
  background-color: inherit;
  width: 20%;
}
.container4 {
  
  padding: 6px 5px;
  position: relative;
  background-color: inherit;
  width: 20%;
}
.container5 {
  
  padding: 6px 5px;
  position: relative;
  background-color: inherit;
  width: 20%;
}


/* The circles on the timeline */
.container1:after {
  content: '';
  position: absolute;
  width: 25%;
  height: 25px;
  margin-left: 150%;
  background-color: #4f58ce;
  border: 2px solid #4f58ce;
  top: 12px;
  border-radius: 50%;
  z-index:50;
  transform: translate(-450%,0);
}
.inputtrue:after {
   background-color: #48af59;
  border: 2px solid #48af59;
}
.container2:after {
  content: '';
  position: absolute;
  width: 25%;
  height: 25px;
  margin-left: 150%;
  background-color: #4f58ce;
  border: 2px solid #4f58ce;
  top: 12px;
  border-radius: 50%;
  z-index:50;
   transform: translate(-350%,0);
}

.container3::after {
  content: '';
  position: absolute;
  width: 25%;
  height: 25px;
  margin-left: 150%;
  background-color: #4f58ce;
  border: 2px solid #4f58ce;
  top: 12px;
  border-radius: 50%;
  z-index:50;
    transform: translate(-260%,0);
}

.container4::after {
  content: '';
  position: absolute;
  width: 25%;
  height: 25px;
  margin-left: 150%;
  background-color: #4f58ce;
  border: 2px solid #4f58ce;
  top: 12px;
  border-radius: 50%;
  z-index:50;
    transform: translate(-210%,0);
}

.container5::after {
  content: '';
  position: absolute;
  width: 25%;
  height: 25px;
  margin-left: 150%;
  background-color: #7a7a7a;
  border: 2px solid #060699;
  top: 12px;
  border-radius: 50%;
  z-index:50;
    transform: translate(-150%,0);
}


/* Place the container to the left */
.left {
  left: 0;
}
.container.verde::after{
  background-color: rgb(2, 7, 4);
  border-color:rgb(2, 7, 4);
  font-family: FontAwesome;
  color: rgb(238, 234, 5);
  content:  "\f00c";
  text-align: center;
  align-items: center;
  margin-left: 25%;
  margin-top: -13%;
  position: absolute;
  z-index: 1;
  transform: translate(50%,50%);
  font-size: 13px;
}


/* Place the container to the right */
.right {
  left: 50%;
  margin-left: 73%;
}
.left img{
  clip-path: url("#clipPolygon");
  
  background-clip: border-box;
  height: 200px;
}

/* Add arrows to the left container (pointing right) */
.left::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 150%;
  transform: translateX(45%);
  
  z-index: 1;
  right: 0px;
  border: medium solid white;
  border-width: 2px 60px 2px 2px;
  border-color: #4f58ce;
}
.left1::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 150%;
  transform: translateX(67%);
  z-index: 1;
  right: 0px;
  border: medium solid white;
  border-width: 2px 60px 2px 2px;
  border-color: #4f58ce;
}
.left5::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  transform: translateX(-5%);
  z-index: 1;
  right: 0px;
  border: medium solid white;
  border-width: 2px 60px 2px 2px;
  border-color:  #4f58ce;
}
/* Add arrows to the right container (pointing left) */
.right::before {
  
  height: 0;
  position: absolute;
  top: 50%;
  width: 100%;
  z-index: 1;
  left: 30px;
  border: white;
  border-width: 10px 10px 10px 0;
  border-color: transparent #0080ff transparent transparent;
}

/* Fix the circle for containers on the right side */
.right::after {
  left: -15px;
}

/* The actual content */
.content {

  background-color: white;
  position: relative;
  border-radius: 100%;
  
}

/* Media queries - Responsive timeline on screens less than 600px wide */
@media screen and (max-width: 600px) {
  /* Place the timelime to the left */
  .timeline::after {
  left: 31px;
  }
  
  /* Full-width containers */
  .container {
  width: 100%;
  padding-left: 0px;
  padding-right: 0px;
  }
  
  /* Make sure that all arrows are pointing leftwards */
  .container::before {
  left: 5px;
  
  border: medium solid white;
  border-width: 10px 10px 10px 10px;
  border-color: transparent white transparent transparent;
  }

  /* Make sure all circles are at the same spot */
  .left::after, .right::after {
  left: 15px;
  }
  
  /* Make all right containers behave like the left ones */
  .right {
  left: 0%;
  }
}


ct1:after::placeholder {

    color: #d1d1d1;

}
::-moz-placeholder {

    color: #d1d1d1;

}

.container2::after {

    content: '';
    position: absolute;
    width: 25%;
    height: 25px;
    margin-left: 150%;
    background-color: #3d428c;
    border: 2px solid #3d428c;
    top: 12px;
    border-radius: 50%;
    z-index: 50;
	transform: translate(-350%,0);
}
.container3::after {

    content: '';
    position: absolute;
    width: 25%;
    height: 25px;
    margin-left: 150%;
    background-color: #3d428c;
    border: 2px solid #3d428c;
    top: 12px;
    border-radius: 50%;
    z-index: 50;
	transform: translate(-350%,0);
}
.container4::after {

    content: '';
    position: absolute;
    width: 25%;
    height: 25px;
    margin-left: 150%;
    background-color: #3d428c;
    border: 2px solid #3d428c;
    top: 12px;
    border-radius: 50%;
    z-index: 50;
	transform: translate(-350%,0);
}
.container5::after {

    content: '';
    position: absolute;
    width: 25%;
    height: 25px;
    margin-left: 150%;
    background-color:#3d428c;
    border: 2px solid #3d428c;
    top: 12px;
    border-radius: 50%;
    z-index: 50;
	transform: translate(-350%,0);
}


.ct1::after{

    transform: translate(-150%,0)
}

.linha-time-conteudo{
	margin-top: 1em;
}

.containertrue::after {
  content: '';
  position: absolute;
  width: 25%;
  height: 25px;
  margin-left: 150%;
  background-color: #00d535;
  border: 2px solid #03959c;
  top: 12px;
  border-radius: 50%;
  z-index:50;
  transform: translate(-450%,0);
}

.containertrue {
  background-color: #00d535 !important;
  border: 2px solid #03959c !important;
  padding: 6px 5px;
  position: relative;
  background-color: inherit;
  width: 20%;
}


.testecontainer{
  
  padding: 6px 5px;
  position: relative;
  background-color: inherit;
  width: 20%;
}

.testecontainer:after {
  content: '';
  position: absolute;
  width: 25%;
  height: 25px;
  margin-left: 150%;
  background-color: #00ff00;
  border: 2px solid #060699;
  top: 12px;
  border-radius: 50%;
  z-index:50;
  transform: translate(-450%,0);
}


</style>