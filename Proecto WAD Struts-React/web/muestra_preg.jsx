/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class Muestra extends React.Component{
    constructor(props){
        super(props);
    }
        componentWillMount ()  {
       
  fetch('http://localhost:8080/Proyecto_WAD_Struts-React/Data.xml')
  .then(response => response.text())
  
  .then(str => (new  window.DOMParser()).parseFromString(str, "text/xml"))
  .then(data => {
      /*var Data =(data.getElementsByTagName("pregunta"));*/
      let preguntas = data.getElementByTagName("pregunta");
  });
  
}
    render(){
        return(
                <div id="uno">
                <p>hola 2</p>
                </div>
                );
        
    }
}
ReactDOM.render (<Muestra />,document.getElementById('muestra'));