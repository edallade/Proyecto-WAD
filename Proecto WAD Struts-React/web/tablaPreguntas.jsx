 class MyComponent extends React.Component{
    constructor(props){
        super(props);
        this.input = React.createRef();
         this.state ={
          items : [],
          isLoaded : false
    }
}
    
    componentDidMount ()  {
       
  fetch('http://localhost:8080/LOGINSTRUTS2HIBERNATE_GOOD/Ejercicios.xml')
  .then(response => response.text())
  
  .then(str => (new  window.DOMParser()).parseFromString(str, "text/xml"))
  .then(data => console.log(data.getElementsByTagName("test")));
  
}
  
  render(){
      return(
              
        <div id="texto">
        <p id="demo"></p>
        <table id="tablad" border="1"></table>
        </div>
        
       
        );
    }
}
 ReactDOM.render(<MyComponent />,document.getElementById('app'));
 
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    myFunction(this);
    }
};
xhttp.open("GET", "Ejercicios.xml", true);
xhttp.send();

function myFunction(xml) {
    var xmlDoc = xml.responseXML;
    var tests = xmlDoc.getElementsByTagName("test");
    var tabla = "<tr><th>ID</th><th>Nombre</th><th>Ver Pregunta</th><th>Modificar Pregunta</th><th>Eliminar Pregunta</th></tr>";
    for(var i = 0;i<tests.length;i++){
        tabla += "<tr><td>";
        tabla += tests[i].getAttribute("id");
        tabla += "</td><td>";
        tabla += tests[i].getElementsByTagName("testName")[0].textContent;
        tabla += "</td><td>";
        tabla += "<button>Ver pregunta</button>";
        tabla += "</td><td>";
        tabla += "<button>Modificar pregunta pregunta</button>";
        tabla += "</td><td>";
        tabla += "<button>Eliminar pregunta</button>";
        tabla += "</td></tr>";
    }
    document.getElementById("demo").innerHTML =
    xmlDoc.getElementsByTagName("missingWord")[0].childNodes[0].nodeValue;
    document.getElementById("tablad").innerHTML = tabla;
}