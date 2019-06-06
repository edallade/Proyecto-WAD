/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package actionsupportpackage;

import com.opensymphony.xwork2.ActionSupport;

import com.opensymphony.xwork2.ActionSupport;
import java.io.File;
import java.io.FileWriter;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.jdom2.Attribute;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.input.SAXBuilder;
import org.jdom2.output.Format;
import org.jdom2.output.XMLOutputter;
/**
 *
 * @author alexis
 */
public class editaPreg extends ActionSupport {
    
    public editaPreg() {
    }
    
    public String execute() throws Exception {
         HttpServletRequest request = ServletActionContext.getRequest();
         String name = request.getParameter("txt");
        String texto = request.getParameter("txt2");
        System.out.println(texto+" texto de pregunta");
        String id = request.getParameter("idpreg");
         System.out.println(id+" id de pregunta");
        int cont=0;
        cont = contCaracteres(texto,"&");
        System.out.println(cont);
        String splitText [] = new String [cont+1];
       splitText= texto.split("&");
        System.out.println(splitText[0]);
        for(int i = 1 ;i<=cont;i++){
            for(int j =1 ; j<5 ; j++){
                System.out.println(request.getParameter("input"+i+"_"+j+" "));
            }
        }
               try {
            //Contruye un documento JDOM usando SAX, para procesar xml
            SAXBuilder builder = new SAXBuilder();
            //Para obtener la ruta absoluta del proyecto XML
            String rutaAbsoluta = request.getSession().getServletContext().getRealPath("/");
            rutaAbsoluta = rutaAbsoluta.replace("\\", "/");
            rutaAbsoluta = rutaAbsoluta.replaceAll("/build", "");
            rutaAbsoluta = rutaAbsoluta.concat("Data.xml");
            File BD = new File(rutaAbsoluta);

            //Para cargar el documento xml
            Document doc = builder.build(BD);//documentos para contruir base de datos
            //Se obtiene el elemento raiz del xml
            Element QuestionWriter = doc.getRootElement();

            //Lista de nodos almacenados, lo que esta contenido entre las etiquetas de raiz
            List lista = QuestionWriter.getChildren("pregunta");

            //Para recorrer el arbol de nodos
            for (int i = 0; i < lista.size(); i++) {//Por cada elemento 
                //Se procesa un elemento de la lista
                Element element = (Element) lista.get(i);//guarda los datos de la lista en un arreglo de elementos
                //encontrar el elemento con el id capturado
                Attribute idElement = element.getAttribute("idpreg");
                
                if (idElement.getValue().matches(id)) {//se ha encontrado usuario con id a modificar
                    //Obtiene los elementos que contiene el elemento actual
                    List lista2 = element.getChildren();//pasa los elementos a lista2
                    //Empieza la comparación
                    //Nombre
                    element.getChild("nombre").setText(name);
                    element.getChild("texto").setText(texto);
                    //eliminar grupos
                    List lista3 = element.getChildren("grupo");
                    for(int j = 0; j < lista3.size(); j++){
                        element.removeChildren("grupo");
                    }
                    //añadir nuevos grupos
                    for(int x = 1 ;x<=cont;x++){
                        Element grupo = new Element("grupo");
                        Element opciones = new Element("opciones");
                        grupo.setAttribute("idgroup",Integer.toString(x));
                        element.addContent(grupo);
                        grupo.addContent(opciones);
                        for(int j =1 ; j<5 ; j++){
                            Element opt = new Element ("op");
                            opt.setText(request.getParameter("input"+x+"_"+j+" "));
                            opciones.addContent(opt);
               // System.err.println(request.getParameter("input"+i+"_"+j+" "));
            }
        }
                 
                    
                    //Se crea serializador xml (para guardar en el xml)
                    XMLOutputter xmlo = new XMLOutputter();

                    //validar que si escriba bien el archivo, guardar los cambios al archivo
                    //                try (FileWriter fw = new FileWriter(rutaAbsoluta+"\\BD.xml")){
                    try (FileWriter fw = new FileWriter(rutaAbsoluta)) {
                        xmlo.setFormat(Format.getPrettyFormat());//Formato de salida al xml
                        xmlo.output(doc, fw);//se escribe en el archivo
                        fw.flush();
                    }
               
                }

            }
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return "success";
    }
        private int contCaracteres(String texto, String caracter) {
        int index,contador=0;
        index = texto.indexOf(caracter);
        while(index!=-1){
            contador++;
            index = texto.indexOf(caracter, index+1);
        }
        return contador;
    }
}
